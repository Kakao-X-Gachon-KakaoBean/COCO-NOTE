import { Input, Modal } from 'antd';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { AddTaskValue, SelectedSprintId } from '@states/SprintState.ts';
import { useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { createTask } from '@api/Sprint/Sprint.ts';
import { CreateTaskDataType } from '@type/SprintType.ts';

const CreateTaskModal = () => {
  const [isAddTask, setIsAddTask] = useRecoilState(AddTaskValue);
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const id = useRecoilValue(SelectedSprintId);
  const { TextArea } = Input;
  const queryClient = useQueryClient();

  const CreateTaskMutation = useMutation<'하위작업 생성 완료' | '하위작업 생성 실패', AxiosError, CreateTaskDataType>(
    'createTask',
    createTask,
    {
      onMutate() {},
      onSuccess(data) {
        if (data === '하위작업 생성 완료') {
          setIsAddTask(false);
          queryClient.invalidateQueries('sprintList');
          setTitle('');
          setContents('');
          toast.success('하위작업이 생성 되었습니다.');
        } else {
          toast.warning('하위작업 생성에 실패했습니다.');
        }
      },
      onError(error) {
        console.log(error);
        toast.error('서버와 연결 되어있지 않습니다.');
      },
    }
  );

  const onSubmitTask = useCallback(
    (e: any) => {
      e.preventDefault();
      CreateTaskMutation.mutate({
        taskTitle: title,
        taskDesc: contents,
        sprintId: Number(id),
      });
    },
    [title, contents, id, CreateTaskMutation]
  );

  const handleCancel = () => {
    setTitle('');
    setContents('');
    setIsAddTask(false);
  };

  return (
    <Modal title="새 하위 작업 생성" open={isAddTask} onOk={onSubmitTask} onCancel={handleCancel}>
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
