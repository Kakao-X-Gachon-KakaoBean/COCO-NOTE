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

const EditIssue = () => {
  const navigate = useNavigate();
  const [title, onChangeTitle] = useInput<string>('');
  const [value, setValue] = useState<string | undefined>('**내용을 입력해주세요.**');

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
    </>
  );
};

export default EditIssue;
