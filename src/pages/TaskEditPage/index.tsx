import HeaderBar from '@/components/HeaderBar';
import SideBar from '@/components/SideBar';
import SideDetailBar from '@/components/SideDetailBar';
import { useRecoilState, useRecoilValue } from 'recoil';
import { SelectedTaskState, SprintValueState } from '@/states/SprintState.ts';
import { ComponentWrapper, TitleNEdit, Wrapper } from '@/pages/TaskEditPage/styles.tsx';
import { Button, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ChildType } from '@components/Sprint/type.ts';

const TaskDetailPage = () => {
  const navigate = useNavigate();
  const { TextArea } = Input;
  const selectedTask = useRecoilValue(SelectedTaskState);
  const [sprintList, setSprintList] = useRecoilState(SprintValueState);
  const [title, setTitle] = useState(selectedTask.sprintTitle);
  const [contents, setContents] = useState(selectedTask.taskDesc);
  const getBack = () => {
    const newTask: ChildType = {
      ...selectedTask,
      sprintTitle: title,
      taskDesc: contents,
    };

    const updatedSprintList = sprintList.map(sprint => {
      if (sprint.children) {
        const updatedChildren = sprint.children.map(task => {
          if (task.taskId === selectedTask.taskId) {
            return newTask;
          } else {
            return task;
          }
        });
        return { ...sprint, children: updatedChildren };
      } else {
        return sprint;
      }
    });

    console.log(updatedSprintList);
    setSprintList(updatedSprintList);

    navigate(-1);
  };

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
            <Button onClick={getBack}>완료하기</Button>
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

export default TaskDetailPage;
