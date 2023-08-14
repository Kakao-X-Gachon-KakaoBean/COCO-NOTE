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
import { QueryClient, useMutation, useQuery } from 'react-query';
import { ChildType, TableData } from '@components/Sprint/type.ts';
import fetcher from '@utils/fetcher.ts';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  ChangeWorkerType,
  DeleteSprintValue,
  ProjectMember,
  SelectedSprintId,
  SelectedSprintState,
  WorkStatusType,
} from '@states/SprintState.ts';
import axios, { AxiosError } from 'axios';
import DeleteSprintModal from '@/components/DeleteSprintModal';
import { useParams } from 'react-router';

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
  const sprintData = useQuery<TableData>(
    ['sprint'],
    () =>
      fetcher({
        queryKey: `http://localhost:8080/sprints/${sprintId}`,
      }),
    {
      onSuccess: data => {
        setSelectedSprint(data);
      },
    }
  );

  const memberData = useQuery<ProjectMember[]>(['member'], () =>
    fetcher({
      queryKey: `http://localhost:8080/projects/${projectId}/members`,
    })
  );

  useEffect(() => {
    if (sprintData.data && memberData.data) {
      setSelectedSprint(sprintData.data);
      createMemberList(memberData.data);
      setIsLoading(false);
    }
  }, [sprintData.data, memberData.data, sprintData, memberData, setSelectedSprint]);

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

  const changeWorkStatusMutation = useMutation<string, AxiosError, WorkStatusType>(
    'workStatus',
    data =>
      axios
        .patch(
          `http://localhost:8080/tasks/${data.taskId}/work-status`,
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
        sprintData.refetch();
        memberData.refetch();
        queryClient.invalidateQueries('sprintList');
        queryClient.invalidateQueries('task');
        console.log(data);
      },
      onError(error) {
        console.log(error);
        alert('작업상태 변경에 실패하였습니다.');
      },
    }
  );

  const changeWorkerMutation = useMutation<string, AxiosError, ChangeWorkerType>(
    'taskWorker',
    data =>
      axios
        .patch(`http://localhost:8080/tasks/${data.taskId}/assignment/${data.memberId}`, data, {
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
        sprintData.refetch();
        memberData.refetch();
        queryClient.invalidateQueries('sprintList');
        queryClient.invalidateQueries('task');
        console.log(data);
      },
      onError(error) {
        console.log(error);
        alert('작업자 할당에 실패하였습니다.');
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
