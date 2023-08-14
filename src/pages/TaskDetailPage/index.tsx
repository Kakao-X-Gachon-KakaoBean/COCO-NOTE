import HeaderBar from '@/components/HeaderBar';
import SideBar from '@/components/SideBar';
import SideDetailBar from '@/components/SideDetailBar';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  ChangeWorkerType,
  DeleteTaskValue,
  ProjectMember,
  SelectedTaskId,
  SelectedTaskState,
  WorkStatusType,
} from '@/states/SprintState.ts';
import {
  ButtonDiv,
  ComponentWrapper,
  ContentsText,
  HeaderText,
  ProfileImg,
  TitleNEdit,
  WorkerName,
  WorkerNStatus,
  Wrapper,
} from '@/pages/TaskDetailPage/styles.tsx';
import { Button, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import defaultImage from '@/images/defaultAvatar.png';
import { QueryClient, useMutation, useQueries } from 'react-query';
import fetcher from '@utils/fetcher.ts';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import DeleteTaskModal from '@components/DeleteTaskModal';
import { changeWorker, changeWorkStatus } from '@/Api/Sprint/Sprint.ts';
import { toast } from 'react-toastify';

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
  const WorkStatusOption = [
    { value: 'NOT_ASSIGNED', label: '할 일' },
    { value: 'WORKING', label: '진행 중' },
    { value: 'COMPLETE', label: '완료' },
  ];
  const res = useQueries([
    {
      queryKey: ['task'],
      queryFn: () =>
        fetcher({
          queryKey: `http://localhost:8080/tasks/${taskId}`,
        }),
    },
    {
      queryKey: ['member'],
      queryFn: () =>
        fetcher({
          queryKey: `http://localhost:8080/projects/${selectedTask.sprintId}/members`,
        }),
    },
  ]);

  useEffect(() => {
    if (res[0].isSuccess && res[1].isSuccess) {
      setSelectedTask(res[0].data);
      createMemberList(res[1].data);
      setIsLoading(false);
    }
  }, [res, setSelectedTask]);

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

  const changeWorkStatusMutation = useMutation<
    '작업 상태 변경 완료' | '작업 상태 변경 실패',
    AxiosError,
    WorkStatusType
  >('workStatus', data => changeWorkStatus(data), {
    onMutate() {},
    onSuccess(data) {
      if (data === '작업 상태 변경 완료') {
        res[0].refetch();
        res[1].refetch();
        queryClient.invalidateQueries('task');
        toast.success('작업 상태를 변경하였습니다.');
      } else {
        toast.warning('작업 상태를 변경하지 못했습니다.');
      }
    },
    onError(error) {
      console.log(error);
      toast.error('작업상태 변경에 실패하였습니다.');
    },
  });

  const changeWorkerMutation = useMutation<'작업자 할당 완료' | '작업자 할당 실패', AxiosError, ChangeWorkerType>(
    'taskWorker',
    data => changeWorker(data),
    {
      onMutate() {},
      onSuccess(data) {
        if (data === '작업자 할당 완료') {
          res[0].refetch();
          res[1].refetch();
          queryClient.invalidateQueries('task');
          toast.success('작업자를 할당하였습니다.');
        } else {
          toast.success('작업자 할당에 실패하였습니다.');
        }
      },
      onError(error) {
        console.log(error);
        toast.error('서버와 연결 되어있지 않습니다.');
      },
    }
  );

  const workStatusChange = (value: string) => {
    changeWorkStatusMutation.mutate({ workStatus: value, taskId: taskId });
  };

  const workerChange = (value: number) => {
    changeWorkerMutation.mutate({ memberId: value, taskId: taskId });
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
              <ProfileImg
                src={selectedTask.workerThumbnailImg !== null ? selectedTask.workerThumbnailImg : defaultImage}
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
                options={WorkStatusOption}
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
