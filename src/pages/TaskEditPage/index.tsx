import HeaderBar from '@/components/HeaderBar';
import SideBar from '@/components/SideBar';
import SideDetailBar from '@/components/SideDetailBar';
import { useRecoilValue } from 'recoil';
import { EditTaskDataType, SelectedTaskId, SelectedTaskState } from '@/states/SprintState.ts';
import { ComponentWrapper, TitleNEdit, Wrapper } from '@/pages/TaskEditPage/styles.tsx';
import { Button, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { editTask } from '@/Api/Sprint/Sprint.ts';
import { toast } from 'react-toastify';

const TaskEditPage = () => {
  const navigate = useNavigate();
  const { TextArea } = Input;
  const selectedTask = useRecoilValue(SelectedTaskState);
  const selectedTaskId = useRecoilValue(SelectedTaskId);
  const sprintId = selectedTask.sprintId;
  const [title, setTitle] = useState(selectedTask.taskTitle);
  const [contents, setContents] = useState(selectedTask.taskDesc);

  const editTaskMutation = useMutation<
    '하위작업 수정 완료' | '하위작업 수정 실패',
    AxiosError,
    {
      data: EditTaskDataType;
      selectedTaskId: number;
    }
  >('edittask', data => editTask(data.data, data.selectedTaskId), {
    onMutate() {},
    onSuccess(data) {
      if (data === '하위작업 수정 완료') {
        toast.success('하위작업 수정이 완료되었습니다.');
        navigate(-1);
      } else {
        toast.warning('하위작업 수정에 실패하였습니다.');
      }
    },
    onError(error) {
      console.log(error);
      toast.error('서버와 연결 되어있지 않습니다.');
    },
  });

  const onSubmit = useCallback(() => {
    if (sprintId && title && contents) {
      editTaskMutation.mutate({
        data: {
          taskTitle: title,
          taskDesc: contents,
          sprintId: sprintId,
        },
        selectedTaskId: selectedTaskId,
      });
    }
  }, [sprintId, title, contents, editTaskMutation, selectedTaskId]);

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
