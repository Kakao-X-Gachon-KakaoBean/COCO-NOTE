import HeaderBar from '@/components/HeaderBar';
import SideBar from '@/components/SideBar';
import SideDetailBar from '@/components/SideDetailBar';
import { useRecoilValue } from 'recoil';
import { SelectedTaskId, SelectedTaskState } from '@/states/SprintState.ts';
import { ComponentWrapper, TitleNEdit, Wrapper } from '@/pages/TaskEditPage/styles.tsx';
import { Button, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';

const TaskEditPage = () => {
  const navigate = useNavigate();
  const { TextArea } = Input;
  const selectedTask = useRecoilValue(SelectedTaskState);
  const selectedTaskId = useRecoilValue(SelectedTaskId);
  const sprintId = selectedTask.sprintId;
  const [title, setTitle] = useState(selectedTask.taskTitle);
  const [contents, setContents] = useState(selectedTask.taskDesc);

  const editTaskMutation = useMutation<string, AxiosError, { taskTitle: string; taskDesc: string; sprintId: number }>(
    'edittask',
    data =>
      axios
        .patch(`http://localhost:8080/tasks/${selectedTaskId}`, data, {
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
        console.log(data);
        navigate(-1);
      },
      onError(error) {
        console.log(error);
        alert('하위작업 수정에 실패하였습니다.');
      },
    }
  );

  const onSubmit = useCallback(() => {
    if (sprintId && title && contents) {
      editTaskMutation.mutate({
        taskTitle: title,
        taskDesc: contents,
        sprintId: sprintId,
      });
    }
  }, [title, contents, editTaskMutation, sprintId]);

  return (
    <>
      <HeaderBar />
      <SideBar />
      <SideDetailBar />
      <Wrapper>
        <ComponentWrapper>
          <TitleNEdit>
            <TextArea
              value={title}
              autoSize={{ minRows: 1, maxRows: 10 }}
              onChange={e => setTitle(e.target.value)}
              placeholder="하위작업 명"
              style={{ fontSize: 'xx-large', color: 'Black', marginTop: '5vh', marginBottom: '5vh', width: '50vw' }}
            />
            <Button onClick={onSubmit}>완료하기</Button>
          </TitleNEdit>
          <TextArea
            value={contents}
            autoSize={{ minRows: 3, maxRows: 10 }}
            onChange={e => setContents(e.target.value)}
            placeholder="하위작업 설명"
            style={{ fontSize: 'large', color: 'Black', marginBottom: '3vh', width: '50vw' }}
          />{' '}
        </ComponentWrapper>
      </Wrapper>
    </>
  );
};

export default TaskEditPage;
