import HeaderBar from '@/components/HeaderBar';
import SideBar from '@/components/SideBar';
import SideDetailBar from '@/components/SideDetailBar';
import { useRecoilValue } from 'recoil';
import { SelectedSprintState } from '@/states/SprintState.ts';
import {
  ComponentWrapper,
  ContentsText,
  DescDiv,
  HeaderText,
  TaskDiv,
  TaskText,
  TitleDiv,
  TitleNEdit,
  WorkerNStatus,
  Wrapper,
} from '@/pages/SprintDetailPage/styles.tsx';
import { Button, Select } from 'antd';
import { useNavigate } from 'react-router-dom';

const SprintDetailPage = () => {
  const navigate = useNavigate();
  const selectedSprint = useRecoilValue(SelectedSprintState);

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
            <HeaderText>{selectedSprint.sprintTitle}</HeaderText>
            <Button
              onClick={() => {
                navigate('edit');
              }}
            >
              수정하기
            </Button>
          </TitleNEdit>
          <ContentsText>{selectedSprint.sprintDesc}</ContentsText>
          <ContentsText>
            {selectedSprint.startDate} ~ {selectedSprint.dueDate}
          </ContentsText>
          <TaskText>하위작업</TaskText>
          {selectedSprint.children && (
            <div>
              {selectedSprint.children.map(task => (
                <TaskDiv key={task.taskId}>
                  <TitleDiv>{task.sprintTitle}</TitleDiv>
                  <DescDiv>{task.taskDesc}</DescDiv>
                  <WorkerNStatus>
                    {task.worker.workerName}
                    <Select
                      defaultValue={task.workStatus}
                      style={{ width: '7vw', marginLeft: '2vw' }}
                      onChange={handleChange}
                      options={[
                        { value: '해야할일', label: '해야할일' },
                        { value: '진행 중', label: '진행 중' },
                        { value: '완료', label: '완료' },
                      ]}
                    />
                  </WorkerNStatus>
                </TaskDiv>
              ))}
            </div>
          )}
        </ComponentWrapper>
      </Wrapper>
    </>
  );
};

export default SprintDetailPage;
