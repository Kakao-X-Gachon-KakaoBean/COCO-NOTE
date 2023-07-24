import HeaderBar from '@components/HeaderBar';
import SideBar from '@components/SideBar';
import SideDetailBar from '@components/SideDetailBar';
import { Wrapper } from '@styles/DetailSide/styles.tsx';
import { Link } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';
import useInput from '../../hooks/useInput.ts';
import { Header, InputArea, InputAreaBody, InputAreaTitle } from '@components/CreateIssue/styles.tsx';

const CreateIssue = () => {
  const [title, onChangeTitle] = useInput('');
  const [value, setValue] = useState<string | undefined>('**내용을 입력해주세요.**');

  console.log(`${title}, ${value}`);
  return (
    <>
      <HeaderBar />
      <SideBar />
      <SideDetailBar open={true} />
      <Wrapper open={true}>
        <div style={{ padding: '1rem' }}>
          <Header>
            <div>이슈 생성 페이지</div>
            <Link to="/issue">뒤로 가기</Link>
          </Header>
          <InputArea>
            <InputAreaTitle>
              <div>제목</div>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={onChangeTitle}
                placeholder="제목을 입력해주세요"
              />
            </InputAreaTitle>
            <InputAreaBody>
              <div data-color-mode="light">
                <MDEditor height={865} value={value} onChange={setValue} />
              </div>

              {/*미리 보기*/}
              {/*<div data-color-mode="light" style={{ padding: 15 }}>*/}
              {/*  <MDEditor.Markdown style={{ padding: 10 }} source={value} />*/}
              {/*</div>*/}
            </InputAreaBody>
          </InputArea>
        </div>
      </Wrapper>
    </>
  );
};

export default CreateIssue;
