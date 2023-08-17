import HeaderBar from '@/components/HeaderBar';
import SideBar from '@/components/SideBar';
import SideDetailBar from '@/components/SideDetailBar';
import {
  ButtonDiv,
  ComponentWrapper,
  ContentsText,
  HeaderText,
  PreviewAvatarDiv,
  ProfileImg,
  TaskDiv,
  TaskText,
  TitleDiv,
  TitleNEdit,
  WorkerName,
  WorkerNStatus,
  Wrapper,
} from '@/pages/SprintDetailPage/styles.tsx';
import { Button, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import defaultImage from '@/images/defaultAvatar.png';
import { QueryClient, useMutation, useQueries } from 'react-query';
import { ChildType, TableData } from '@/types/SprintType.ts';
import fetcher from '@/utils/fetcher.ts';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  ChangeWorkerType,
  DeleteSprintValue,
  ProjectMember,
  SelectedSprintId,
  SelectedSprintState,
  WorkStatusType,
} from '@/states/SprintState.ts';
import { AxiosError } from 'axios';
import DeleteSprintModal from '@/components/DeleteSprintModal';
import { useParams } from 'react-router';
import { changeWorker, changeWorkStatus } from '@/Api/Sprint/Sprint.ts';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '@/Api';

const SprintDetailPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const sprintId = useRecoilValue(SelectedSprintId);
  const projectId = useParams().projectId;
  const [selectedSprint, setSelectedSprint] = useRecoilState(SelectedSprintState);
  const [memberList, setMemberList] = useState<
    Array<{ label: string; options: Array<{ label: string; value: number }> }>
  >([]);
  const queryClient = new QueryClient();
  const WorkStatusOption = [
    { value: 'NOT_ASSIGNED', label: '할 일' },
    { value: 'WORKING', label: '진행 중' },
    { value: 'COMPLETE', label: '완료' },
  ];

  const [, setIsDeleteSprint] = useRecoilState(DeleteSprintValue);
  const res = useQueries([
    {
      queryKey: ['sprint', sprintId],
      queryFn: () =>
        fetcher({
          queryKey: `${BACKEND_URL}/sprints/${sprintId}`,
        }),
      onSuccess: (data: TableData) => {
        setSelectedSprint(data);
      },
    },
    {
      queryKey: ['member', projectId],
      queryFn: () =>
        fetcher({
          queryKey: `${BACKEND_URL}/projects/${projectId}/members`,
        }),
    },
  ]);

  useEffect(() => {
    if (res[0].data && res[1].data) {
      setSelectedSprint(res[0].data);
      createMemberList(res[1].data);
      setIsLoading(false);
    }
  }, [res, setSelectedSprint]);

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
        queryClient.invalidateQueries('sprintList');
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
          queryClient.invalidateQueries('sprintList');
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

  const workStatusChange = (value: string, taskId: number) => {
    changeWorkStatusMutation.mutate({ workStatus: value, taskId: taskId });
  };

  const workerChange = (value: number, taskId: number) => {
    changeWorkerMutation.mutate({ memberId: value, taskId: taskId });
  };

  return (
    <>
      <DeleteSprintModal />
      <HeaderBar />
      <SideBar />
      <SideDetailBar />
      <Wrapper>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ComponentWrapper>
            <TitleNEdit>
              <HeaderText>{selectedSprint.sprintTitle}</HeaderText>
              <ButtonDiv>
                <Button danger onClick={() => setIsDeleteSprint(true)}>
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
                        <ProfileImg src={task.workerThumbnailImg !== null ? task.workerThumbnailImg : defaultImage} />
                      </PreviewAvatarDiv>
                      <WorkerName>
                        {' '}
                        <Select
                          defaultValue={task.workerName === null ? '미할당' : task.workerName}
                          onChange={value => workerChange(Number(value), task.taskId)}
                          style={{ width: '8vw' }}
                          options={memberList}
                        />{' '}
                      </WorkerName>
                      <Select
                        defaultValue={task.workStatus}
                        style={{ width: '7vw' }}
                        onChange={value => workStatusChange(value, task.taskId)}
                        options={WorkStatusOption}
                      />
                    </WorkerNStatus>
                  </TaskDiv>
                ))}
              </div>
            )}
          </ComponentWrapper>
        )}
      </Wrapper>
    </>
  );
};

export default SprintDetailPage;
