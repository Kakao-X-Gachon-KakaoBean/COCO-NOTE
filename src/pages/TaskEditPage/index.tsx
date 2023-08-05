import HeaderBar from '@/components/HeaderBar';
import SideBar from '@/components/SideBar';
import SideDetailBar from '@/components/SideDetailBar';
import { useRecoilState, useRecoilValue } from 'recoil';
import { SelectedTaskState, SprintValueState } from '@/states/SprintState.ts';
import { ComponentWrapper, TitleNEdit, Wrapper } from '@/pages/TaskEditPage/styles.tsx';
import { Button, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const TaskDetailPage = () => {
  const navigate = useNavigate();
  const { TextArea } = Input;
  const selectedTask = useRecoilValue(SelectedTaskState);
  const [sprintList, setSprintList] = useRecoilState(SprintValueState);
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const getBack = () => {
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
              value={selectedTask.sprintTitle}
              autoSize={{ minRows: 1, maxRows: 10 }}
              onChange={e => setTitle(e.target.value)}
              placeholder="하위작업 명"
              style={{ fontSize: 'xx-large', color: 'Black', marginTop: '5vh', marginBottom: '5vh', width: '50vw' }}
            />
            <Button onClick={getBack}>완료하기</Button>
          </TitleNEdit>
          <TextArea
            value={selectedTask.taskDesc}
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
