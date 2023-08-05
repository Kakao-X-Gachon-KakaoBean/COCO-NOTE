import HeaderBar from '@/components/HeaderBar';
import SideBar from '@/components/SideBar';
import SideDetailBar from '@/components/SideDetailBar';
import { useRecoilValue } from 'recoil';
import { SelectedTaskState } from '@/states/SprintState.ts';
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

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
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
                { value: '해야할일', label: '해야할일' },
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
