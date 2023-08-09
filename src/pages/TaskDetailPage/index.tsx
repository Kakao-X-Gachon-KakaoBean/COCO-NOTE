import HeaderBar from '@/components/HeaderBar';
import SideBar from '@/components/SideBar';
import SideDetailBar from '@/components/SideDetailBar';
import { useRecoilState, useRecoilValue } from 'recoil';
import { SelectedTaskId, SelectedTaskState } from '@/states/SprintState.ts';
import {
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
import { useMutation, useQuery } from 'react-query';
import { ChildType } from '@components/Sprint/type.ts';
import fetcher from '@utils/fetcher.ts';
import { useEffect } from 'react';
import axios, { AxiosError } from 'axios';

const TaskDetailPage = () => {
  const navigate = useNavigate();
  const [selectedTask, setSelectedTask] = useRecoilState(SelectedTaskState);
  const taskId = useRecoilValue(SelectedTaskId);
  const data = useQuery<ChildType>(['task'], () =>
    fetcher({
      queryKey: `http://localhost:8080/tasks/${taskId}`,
    })
  );
  useEffect(() => {
    if (data.data) {
      console.log(data.data);

      setSelectedTask(data.data);
    }
  }, [data.data]);

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
        console.log(data);
      },
      onError(error) {
        console.log(error);
        alert('작업상태 변경에 실패하였습니다.');
      },
    }
  );

  const handleChange = (value: string) => {
    changeWorkStatusMutation.mutate({ workStatus: value }); // taskId를 mutate 함수에 전달
  };
  return (
    <>
      <HeaderBar />
      <SideBar />
      <SideDetailBar />
      <Wrapper>
        <ComponentWrapper>
          <TitleNEdit>
            <HeaderText>{selectedTask.taskTitle}</HeaderText>
            <Button
              onClick={() => {
                navigate('edit');
              }}
            >
              수정하기
            </Button>
          </TitleNEdit>
          <WorkerNStatus>
            <Image
              src={selectedTask.workerThumbnailImg !== null ? selectedTask.workerThumbnailImg : defaultImage}
              style={{ borderRadius: '100%' }}
              preview={false}
              width={'2vw'}
              height={'2vw'}
            />
            <WorkerName> {selectedTask.workerName !== null ? selectedTask.workerName : '미할당'} </WorkerName>
            <Select
              defaultValue={selectedTask.workStatus}
              style={{ width: '7vw' }}
              onChange={value => handleChange(value)}
              options={[
                { value: 'NOT_ASSIGNED', label: '할 일' },
                { value: 'WORKING', label: '진행 중' },
                { value: 'COMPLETE', label: '완료' },
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
