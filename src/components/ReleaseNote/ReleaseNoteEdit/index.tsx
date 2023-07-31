import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';
import { Button, Form, Input } from 'antd';
import HeaderBar from '@components/HeaderBar';
import SideBar from '@components/SideBar';
import SideDetailBar from '@components/SideDetailBar';
import { Wrapper } from '@styles/DetailSide/styles.tsx';
import { ReleasedNoteDiv } from '@components/ReleaseNote/ReleasedNoteAll/styles.tsx';
import { Editor, TemporarySave, TitleVersionInput } from '@components/ReleaseNote/ReleaseNoteEdit/styles.tsx';
import { projectInfoMenuOpenState } from '@states/ProjectState.ts';
import { useRecoilValueLoadable } from 'recoil';
import { ActivityIndicator } from '@components/ActivityIndicator';

interface FormValues {
  version: string;
  title: string;
}
const ReleaseNoteEdit = () => {
  const [value, setValue] = useState<string | undefined>('**내용을 입력해주세요.**');
  const [form] = Form.useForm();
  const projectInfoMenuOpen = useRecoilValueLoadable(projectInfoMenuOpenState);

  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };

  const initialValues = {
    version: '1.0.0',
    title: '미리 작성된 제목',
  };

  let contents = null;

  switch (projectInfoMenuOpen.state) {
    case 'hasValue':
      contents = () => {
        if (projectInfoMenuOpen.contents) {
          return (
            <ReleasedNoteDiv>
              <TitleVersionInput>
                <Form initialValues={initialValues} form={form} onFinish={handleSubmit}>
                  <Form.Item name="version" label="버전" rules={[{ required: true, message: '버전을 입력해주세요' }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item name="title" label="제목" rules={[{ required: true, message: '제목을 입력해주세요' }]}>
                    <Input />
                  </Form.Item>
                </Form>
              </TitleVersionInput>
              <Editor data-color-mode="light">
                <MDEditor height={'60vh'} value={value} onChange={setValue} />
              </Editor>
              <TemporarySave>
                <Button type="primary" onClick={() => form.submit()}>
                  임시저장
                </Button>
              </TemporarySave>
            </ReleasedNoteDiv>
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

export default ReleaseNoteEdit;
