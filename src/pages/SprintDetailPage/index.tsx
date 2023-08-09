import HeaderBar from '@/components/HeaderBar';
import SideBar from '@/components/SideBar';
import SideDetailBar from '@/components/SideDetailBar';
import {
  ComponentWrapper,
  ContentsText,
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
import { useEffect, useState } from 'react';
import defaultImage from '@/images/defaultAvatar.png';
import { useMutation, useQuery } from 'react-query';
import { ChildType, TableData } from '@components/Sprint/type.ts';
import fetcher from '@utils/fetcher.ts';
import { useRecoilState, useRecoilValue } from 'recoil';
import { SelectedSprintId, SelectedSprintState } from '@states/SprintState.ts';
import axios, { AxiosError } from 'axios';

const SprintDetailPage = () => {
  const navigate = useNavigate();
  const sprintId = useRecoilValue(SelectedSprintId);
  const [taskId, setTaskId] = useState(0);
  const [selectedSprint, setSelectedSprint] = useRecoilState(SelectedSprintState);
  const data = useQuery<TableData>(['sprint'], () =>
    fetcher({
      queryKey: `http://localhost:8080/sprints/${sprintId}`,
    })
  );
  useEffect(() => {
    if (data.data) {
      console.log(data.data);

      setSelectedSprint(data.data);
    }
  }, [data.data]);

  const changeWorkStatusMutation = useMutation<string, AxiosError, { workStatus: string; taskId: number }>(
    'workStatus',
    data =>
      axios
        .patch(
          `http://localhost:8080/tasks/${data.taskId}/work-status`,
          { workStatus: data.workStatus },
          {
            withCredentials: true,
          }
        )
        .then(response => response.data),
    {
      onMutate() {},
      onSuccess(data) {
        console.log(data);
      },
      onError(error) {
        console.log(error);
        alert('작업상태 변경에 실패하였습니다.');
      },
    }
  );

  const handleChange = (value: string, taskId: number) => {
    setTaskId(taskId);
    changeWorkStatusMutation.mutate({ workStatus: value, taskId: taskId }); // taskId를 mutate 함수에 전달
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
              {selectedSprint.children.map((task: ChildType) => (
                <TaskDiv key={task.taskId}>
                  <TitleDiv>{task.taskTitle}</TitleDiv>
                  <WorkerNStatus>
                    <PreviewAvatarDiv>
                      <Image
                        src={task.workerThumbnailImg !== null ? task.workerThumbnailImg : defaultImage}
                        style={{ borderRadius: '100%' }}
                        preview={false}
                        width={'2vw'}
                        height={'2vw'}
                      />
                    </PreviewAvatarDiv>
                    <WorkerName> {task.workerName !== null ? task.workerName : '미할당'} </WorkerName>
                    <Select
                      defaultValue={task.workStatus}
                      style={{ width: '7vw' }}
                      onChange={value => handleChange(value, task.taskId)}
                      onClick={() => {
                        setTaskId(task.taskId);
                        console.log(task.taskId);
                      }}
                      options={[
                        { value: 'NOT_ASSIGNED', label: '할 일' },
                        { value: 'WORKING', label: '진행 중' },
                        { value: 'COMPLETE', label: '완료' },
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
