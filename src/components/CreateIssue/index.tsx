import HeaderBar from '@components/HeaderBar';
import SideBar from '@components/SideBar';
import SideDetailBar from '@components/SideDetailBar';
import { Wrapper } from '@styles/DetailSide/styles.tsx';
import { useNavigate } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';
import useInput from '../../hooks/useInput.ts';
import {
  CreateIssueBox,
  CreateIssueHeader,
  CreateIssueInput,
  CreateIssueSubmit,
  CreateIssueTitle,
} from '@components/CreateIssue/styles.tsx';
import { Button } from 'antd';
import { useRecoilValueLoadable } from 'recoil';
import { ActivityIndicator } from '@components/ActivityIndicator';
import { Input } from '@components/EditIssue/styles.tsx';
import { projectInfoMenuOpenState } from '@states/ProjectState.ts';

const CreateIssue = () => {
  const navigate = useNavigate();
  const [title, onChangeTitle] = useInput('');
  const [value, setValue] = useState<string | undefined>('**내용을 입력해주세요.**');
  const projectInfoMenuOpen = useRecoilValueLoadable(projectInfoMenuOpenState);
  const getBack = () => {
    navigate(-1);
  };

  const submitNewIssue = () => {
    console.log(`${title} + ${value}`);
  };

  let contents = null;
  switch (projectInfoMenuOpen.state) {
    case 'hasValue':
      contents = () => {
        if (projectInfoMenuOpen.contents) {
          return (
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
                {/*<div index-color-mode="light" style={{ padding: 15 }}>*/}
                {/*  <MDEditor.Markdown style={{ padding: 10 }} source={value} />*/}
                {/*</div>*/}
              </CreateIssueInput>
              <CreateIssueSubmit>
                <Button onClick={submitNewIssue}>제출</Button>
              </CreateIssueSubmit>
            </CreateIssueBox>
          );
        } else {
          return <ActivityIndicator />;
        }
      };
      break;
    case 'hasError':
      contents = () => {
        return <div>데이터를 서버에서 불러올 수 없습니다.</div>;
      };
      break;
    case 'loading':
      contents = () => {
        return <ActivityIndicator />;
      };
      break;
    default:
      contents = () => {
        return <div>에러가 발생했습니다. 페이지를 새로고침해주세요.</div>;
      };
  }
  return (
    <>
      <HeaderBar />
      <SideBar />
      <SideDetailBar />
      <Wrapper>{contents()}</Wrapper>
    </>
  );
};

export default CreateIssue;
