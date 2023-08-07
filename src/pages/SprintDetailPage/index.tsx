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
  PreviewAvatarDiv,
  TaskDiv,
  TaskText,
  TitleDiv,
  TitleNEdit,
  WorkerName,
  WorkerNStatus,
  Wrapper,
} from '@/pages/SprintDetailPage/styles.tsx';
import { Button, Image, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import defaultImage from '@/images/defaultAvatar.png';

const SprintDetailPage = () => {
  const navigate = useNavigate();
  const selectedSprint = useRecoilValue(SelectedSprintState);
  const [sprintList, setSprintList] = useRecoilState(SprintValueState);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  console.log(selectedSprint.children[0].worker.workerThumbnailImg === '');
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
                    <PreviewAvatarDiv>
                      <Image
                        src={task.worker.workerThumbnailImg !== '' ? task.worker.workerThumbnailImg : defaultImage}
                        style={{ borderRadius: '100%' }}
                        preview={false}
                        width={'2vw'}
                        height={'2vw'}
                      />
                    </PreviewAvatarDiv>
                    <WorkerName> {task.worker.workerName} </WorkerName>
                    <Select
                      defaultValue={task.workStatus}
                      style={{ width: '7vw' }}
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
