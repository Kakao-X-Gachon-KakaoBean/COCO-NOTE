import { Input, Modal } from 'antd';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { AddTaskValue, SelectedSprintState, SprintValueState } from '@states/SprintState.ts';

const CreateTaskModal = () => {
  const [sprintList, setSprintList] = useRecoilState(SprintValueState);
  const [isAddTask, setIsAddTask] = useRecoilState(AddTaskValue);
  const selectedSprint = useRecoilValue(SelectedSprintState);
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const { TextArea } = Input;

  const handleOk = () => {
    if (title && contents) {
      addTask();
      setIsAddTask(false);
      setTitle('');
      setContents('');
      toast.success('하위 작업이 생성 되었습니다.'); // toast.success로 성공 메시지 표시
    } else {
      toast.error('하위 작업의 이름과 설명을 정확히 입력해주세요'); // toast.error로 실패 메시지 표시
    }
  };

  const handleCancel = () => {
    setTitle('');
    setContents('');
    setIsAddTask(false);
  };

  const addTask = () => {
    const selectedSprintWithChildren = selectedSprint.children
      ? { ...selectedSprint, children: [...selectedSprint.children] }
      : { ...selectedSprint, children: [] };

    const newTask = {
      taskId: selectedSprintWithChildren.children ? selectedSprintWithChildren.children.length + 1 : 1,
      sprintTitle: title,
      taskDesc: contents,
      taskWorkStatus: '',
      worker: { workerId: 0, workerName: '', workerThumbnailImg: '' },
    };

    selectedSprintWithChildren.children.push(newTask);

    const updatedSprintList = sprintList.map(sprint =>
      sprint.key === selectedSprint.key ? selectedSprintWithChildren : sprint
    );

    // sprintList를 업데이트
    setSprintList(updatedSprintList);
  };

  return (
    <Modal title="새 하위 작업 생성" open={isAddTask} onOk={handleOk} onCancel={handleCancel}>
      <TextArea
        value={title}
        autoSize={{ minRows: 1, maxRows: 10 }}
        onChange={e => setTitle(e.target.value)}
        placeholder="하위 작업 명"
        style={{ marginBottom: '2rem', marginTop: '3rem' }}
      />
      <TextArea
        value={contents}
        autoSize={{ minRows: 3, maxRows: 10 }}
        onChange={e => setContents(e.target.value)}
        placeholder="하위 작업 설명"
        style={{ marginBottom: '2rem' }}
      />
    </Modal>
  );
};
export default CreateTaskModal;
