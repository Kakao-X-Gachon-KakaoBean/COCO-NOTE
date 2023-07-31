import HeaderBar from '@components/HeaderBar';
import SideBar from '@components/SideBar';
import SideDetailBar from '@components/SideDetailBar';
import { Wrapper } from '@styles/DetailSide/styles.tsx';
import { useNavigate } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import { Button } from 'antd';
import { useState } from 'react';
import useInput from '../../hooks/useInput.ts';
import { EditIssueHeader, Input, EditIssueBox, EditIssueInput, EditIssueText, EditIssueSubmit } from './styles.tsx';
import { useRecoilValueLoadable } from 'recoil';
import { projectInfoMenuOpenState } from '@states/ProjectState.ts';
import { ActivityIndicator } from '@components/ActivityIndicator';

const EditIssue = () => {
  const navigate = useNavigate();
  const [title, onChangeTitle] = useInput<string>('');
  const [value, setValue] = useState<string | undefined>('**내용을 입력해주세요.**');
  const projectInfoMenuOpen = useRecoilValueLoadable(projectInfoMenuOpenState);

  const submitIssue = () => {
    console.log(`${title}, ${value}`);
  };
  const getBack = () => {
    navigate(-1);
  };

  let contents = null;

  switch (projectInfoMenuOpen.state) {
    case 'hasValue':
      contents = () => {
        if (projectInfoMenuOpen.contents) {
          return (
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

export default EditIssue;
