import HeaderBar from '@/components/HeaderBar';
import SideBar from '@/components/SideBar';
import SideDetailBar from '@/components/SideDetailBar';
import { useRecoilState, useRecoilValue } from 'recoil';
import { SelectedSprintState, SprintValueState } from '@/states/SprintState.ts';
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
  const [sprintList, setSprintList] = useRecoilState(SprintValueState);

  const handleChange = (value: string, taskId: React.Key) => {
    // 해당 작업이 속한 스프린트를 찾아서 값을 업데이트
    const updatedSprintList = sprintList.map(sprint => {
      if (sprint.sprintId === selectedSprint.sprintId) {
        // 선택된 스프린트일 경우, 작업 중에서 taskId와 일치하는 작업을 찾아 값을 업데이트
        const updatedChildren = sprint.children?.map(task =>
          task.taskId === taskId ? { ...task, workStatus: value } : task
        );
        return { ...sprint, children: updatedChildren };
      } else {
        return sprint;
      }
    });

    console.log(updatedSprintList);

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
                      onChange={value => handleChange(value, task.taskId)}
                      options={[
                        { value: '할 일', label: '할 일' },
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
