import HeaderBar from '@components/HeaderBar';
import SideBar from '@components/SideBar';
import SideDetailBar from '@components/SideDetailBar';
import { Wrapper } from '@styles/DetailSide/styles.tsx';
import { useNavigate } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import { useEffect, useState } from 'react';
import useInput from '../../hooks/useInput.ts';
import {
  CreateIssueBox,
  CreateIssueHeader,
  CreateIssueInput,
  CreateIssueSubmit,
  CreateIssueTitle,
} from '@components/CreateIssue/styles.tsx';
import { Button } from 'antd';
import { useRecoilValue } from 'recoil';
import { ActivityIndicator } from '@components/ActivityIndicator';
import { Input } from '@components/EditIssue/styles.tsx';

const CreateIssue = () => {
  const navigate = useNavigate();
  const [title, onChangeTitle] = useInput('');
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

  const getBack = () => {
    navigate(-1);
  };

  const submitNewIssue = () => {
    console.log(`${title} + ${value}`);
  };
  return (
    <>
      <HeaderBar />
      <SideBar />
      <SideDetailBar />
      {isVisible ? (
        <Wrapper>
        <CreateIssueBox>
          <CreateIssueHeader>
            <Button onClick={getBack}>뒤로 가기</Button>
          </CreateIssueHeader>
          <CreateIssueTitle>
            <Input type="text" id="title" name="title" value={title} onChange={onChangeTitle} placeholder="제목" />
          </CreateIssueTitle>
          <CreateIssueInput>
            <div data-color-mode="light">
              <MDEditor height={500} value={value} onChange={setValue} />
            </div>
            {/*미리 보기*/}
            {/*<div data-color-mode="light" style={{ padding: 15 }}>*/}
            {/*  <MDEditor.Markdown style={{ padding: 10 }} source={value} />*/}
            {/*</div>*/}
          </CreateIssueInput>
          <CreateIssueSubmit>
            <Button onClick={submitNewIssue}>제출</Button>
          </CreateIssueSubmit>
        </CreateIssueBox>
      </Wrapper>
      ) : (
        <Wrapper>
          <ActivityIndicator />
        </Wrapper>
      )}
    </>
  );
};

export default CreateIssue;
