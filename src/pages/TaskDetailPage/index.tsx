import HeaderBar from '@/components/HeaderBar';
import SideBar from '@/components/SideBar';
import SideDetailBar from '@/components/SideDetailBar';
import { useRecoilState, useRecoilValue } from 'recoil';
import { SelectedTaskState, SprintValueState } from '@/states/SprintState.ts';
import {
  ComponentWrapper,
  ContentsText,
  HeaderText,
  TitleNEdit,
  WorkerNStatus,
  Wrapper,
} from '@/pages/TaskDetailPage/styles.tsx';
import { Button, Select } from 'antd';
import { useNavigate } from 'react-router-dom';

const TaskDetailPage = () => {
  const navigate = useNavigate();
  const selectedTask = useRecoilValue(SelectedTaskState);
  const [sprintList, setSprintList] = useRecoilState(SprintValueState);

  const handleChange = (value: string) => {
    // 해당 작업이 속한 스프린트를 찾아서 값을 업데이트
    const updatedSprintList = sprintList.map(sprint => {
      const updatedChildren = sprint.children?.map(task =>
        task.taskId === selectedTask.taskId ? { ...task, workStatus: value } : task
      );
      return { ...sprint, children: updatedChildren };
    });

    setSprintList(updatedSprintList);
  };

  return (
    <>
      <HeaderBar />
      <SideBar />
      <SideDetailBar />
      <Wrapper>
        <ComponentWrapper>
          <TitleNEdit>
            <HeaderText>{selectedTask.sprintTitle}</HeaderText>
            <Button
              onClick={() => {
                navigate('edit');
              }}
            >
              수정하기
            </Button>
          </TitleNEdit>
          <WorkerNStatus>
            {' '}
            담당자 : {selectedTask.worker.workerName}{' '}
            <Select
              defaultValue={selectedTask.workStatus}
              style={{ width: '7vw' }}
              onChange={handleChange}
              options={[
                { value: '할 일', label: '할 일' },
                { value: '진행 중', label: '진행 중' },
                { value: '완료', label: '완료' },
              ]}
            />
          </WorkerNStatus>
          <ContentsText>{selectedTask.taskDesc}</ContentsText>
        </ComponentWrapper>
      </Wrapper>
    </>
  );
};

export default TaskDetailPage;
