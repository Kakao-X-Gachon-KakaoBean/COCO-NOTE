import HeaderBar from '@components/HeaderBar';
import SideBar from '@components/SideBar';
import SideDetailBar from '@components/SideDetailBar';
import { Wrapper } from '@styles/DetailSide/styles.tsx';
import { useNavigate } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import useInput from '../../hooks/useInput.ts';
import { EditIssueHeader, Input, EditIssueBox, EditIssueInput, EditIssueText, EditIssueSubmit } from './styles.tsx';
import { useRecoilValue } from 'recoil';
import { projectInfoMenuOpenState } from '@states/ProjectState.ts';
import { ActivityIndicator } from '@components/ActivityIndicator';

const EditIssue = () => {
  const navigate = useNavigate();
  const [title, onChangeTitle] = useInput<string>('');
  const [value, setValue] = useState<string | undefined>('**내용을 입력해주세요.**');
  const projectInfoMenuOpen = useRecoilValue(projectInfoMenuOpenState);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!projectInfoMenuOpen) {
      setIsVisible(false);
      setTimeout(() => {
        setIsVisible(true);
      }, 550);
    }
  }, [projectInfoMenuOpen]);

  const submitIssue = () => {
    console.log(`${title}, ${value}`);
  };
  const getBack = () => {
    navigate(-1);
  };

  return (
    <>
      <HeaderBar />
      <SideBar />
      <SideDetailBar />
      {isVisible ? (
        <Wrapper>
          <EditIssueBox>
            <EditIssueHeader>
              <div>이슈 수정</div>
              <Button onClick={getBack}>뒤로 가기</Button>
            </EditIssueHeader>
            <EditIssueInput>
              <Input type="text" id="title" name="title" value={title} onChange={onChangeTitle} placeholder="제목" />
            </EditIssueInput>
            <EditIssueText data-color-mode="light">
              <MDEditor height={500} value={value} onChange={setValue} />
            </EditIssueText>
            <EditIssueSubmit>
              <Button onClick={submitIssue}>제출</Button>
            </EditIssueSubmit>
          </EditIssueBox>
        </Wrapper>
      ) : (
        <Wrapper>
          <ActivityIndicator />
        </Wrapper>
      )}
    </>
  );
};

export default EditIssue;
