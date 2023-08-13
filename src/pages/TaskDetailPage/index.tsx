import HeaderBar from '@/components/HeaderBar';
import SideBar from '@/components/SideBar';
import SideDetailBar from '@/components/SideDetailBar';
import { useRecoilState, useRecoilValue } from 'recoil';
import { DeleteTaskValue, ProjectMember, SelectedTaskId, SelectedTaskState } from '@/states/SprintState.ts';
import {
  ButtonDiv,
  ComponentWrapper,
  ContentsText,
  HeaderText,
  TitleNEdit,
  WorkerName,
  WorkerNStatus,
  Wrapper,
} from '@/pages/TaskDetailPage/styles.tsx';
import { Button, Image, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import defaultImage from '@/images/defaultAvatar.png';
import { QueryClient, useMutation, useQuery } from 'react-query';
import { ChildType } from '@components/Sprint/type.ts';
import fetcher from '@utils/fetcher.ts';
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import DeleteTaskModal from '@components/DeleteTaskModal';

const TaskDetailPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [selectedTask, setSelectedTask] = useRecoilState(SelectedTaskState);
  const taskId = useRecoilValue(SelectedTaskId);
  const [, setIsDeleteTask] = useRecoilState(DeleteTaskValue);
  const [memberList, setMemberList] = useState<
    Array<{ label: string; options: Array<{ label: string; value: number }> }>
  >([]);
  const queryClient = new QueryClient();
  const taskData = useQuery<ChildType>(['task'], () =>
    fetcher({
      queryKey: `http://localhost:8080/tasks/${taskId}`,
    })
  );
  const memberData = useQuery<ProjectMember[]>(['member'], () =>
    fetcher({
      queryKey: `http://localhost:8080/projects/${selectedTask.sprintId}/members`,
    })
  );

  useEffect(() => {
    if (taskData.data && memberData.data) {
      setSelectedTask(taskData.data);
      createMemberList(memberData.data);
      setIsLoading(false);
    }
  }, [taskData.data, memberData.data, setSelectedTask]);

  const createMemberList = (memberData: ProjectMember[]) => {
    const roles: Record<string, string> = {
      ADMIN: 'Master',
      MEMBER: 'Member',
      VIEWER: 'Viewer',
      INVITED_PERSON: 'Invited Person',
    };

    const categorizedData = memberData.reduce((result, member) => {
      const roleLabel = roles[member.projectMemberRole];

      const existingCategory = result.find(category => category.label === roleLabel);

      if (!existingCategory) {
        result.push({
          label: roleLabel,
          options: [{ label: member.projectMemberName, value: member.projectMemberId }],
        });
      } else {
        existingCategory.options.push({ label: member.projectMemberName, value: member.projectMemberId });
      }

      return result;
    }, [] as Array<{ label: string; options: Array<{ label: string; value: number }> }>);

    setMemberList(categorizedData);
  };

  const changeWorkStatusMutation = useMutation<string, AxiosError, { workStatus: string }>(
    'workStatus',
    data =>
      axios
        .patch(
          `http://localhost:8080/tasks/${taskId}/work-status`,
          { workStatus: data.workStatus },
          {
            withCredentials: true,
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          }
        )
        .then(response => response.data),
    {
      onMutate() {},
      onSuccess(data) {
        taskData.refetch();
        memberData.refetch();
        queryClient.invalidateQueries('task');
        console.log(data);
      },
      onError(error) {
        console.log(error);
        alert('작업상태 변경에 실패하였습니다.');
      },
    }
  );
  const changeWorkerMutation = useMutation<string, AxiosError, { memberId: number }>(
    'taskWorker',
    data =>
      axios
        .patch(`http://localhost:8080/tasks/${taskId}/assignment/${data.memberId}`, data, {
          withCredentials: true,
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        })
        .then(response => response.data),
    {
      onMutate() {},
      onSuccess(data) {
        taskData.refetch();
        memberData.refetch();
        queryClient.invalidateQueries('task');
        console.log(data);
      },
      onError(error) {
        console.log(error);
        alert('작업자 할당에 실패하였습니다.');
      },
    }
  );

  const workStatusChange = (value: string) => {
    changeWorkStatusMutation.mutate({ workStatus: value });
  };

  const workerChange = (value: number) => {
    changeWorkerMutation.mutate({ memberId: value });
  };
  return (
    <>
      <DeleteTaskModal />
      <HeaderBar />
      <SideBar />
      <SideDetailBar />
      <Wrapper>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ComponentWrapper>
            <TitleNEdit>
              <HeaderText>{selectedTask.taskTitle}</HeaderText>
              <ButtonDiv>
                <Button danger onClick={() => setIsDeleteTask(true)}>
                  삭제
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    navigate('edit');
                  }}
                >
                  수정하기
                </Button>
              </ButtonDiv>
            </TitleNEdit>
            <WorkerNStatus>
              <Image
                src={selectedTask.workerThumbnailImg !== null ? selectedTask.workerThumbnailImg : defaultImage}
                style={{ borderRadius: '100%' }}
                preview={false}
                width={'2vw'}
                height={'2vw'}
              />
              <WorkerName>
                {' '}
                <Select
                  defaultValue={selectedTask.workerName === null ? '미할당' : selectedTask.workerName}
                  onChange={value => workerChange(Number(value))}
                  style={{ width: '8vw' }}
                  options={memberList}
                />{' '}
              </WorkerName>
              <Select
                defaultValue={selectedTask.workStatus}
                style={{ width: '7vw' }}
                onChange={value => workStatusChange(value)}
                options={[
                  { value: 'NOT_ASSIGNED', label: '할 일' },
                  { value: 'WORKING', label: '진행 중' },
                  { value: 'COMPLETE', label: '완료' },
                ]}
              />
            </WorkerNStatus>
            <ContentsText>{selectedTask.taskDesc}</ContentsText>
          </ComponentWrapper>
        )}
      </Wrapper>
    </>
  );
};

export default TaskDetailPage;
