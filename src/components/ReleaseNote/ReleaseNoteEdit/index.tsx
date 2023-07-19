import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { EditorDiv } from '@components/ReleaseNote/ReleaseNoteDetail/styles.tsx';
import HeaderBar from '@components/HeaderBar';
import SideBar from '@components/SideBar';
import SideDetailBar from '@components/SideDetailBar';
import { Wrapper } from '@styles/DetailSide/styles.tsx';
import { ReleasedNoteDiv } from '@components/ReleaseNote/ReleasedNoteAll/styles.tsx';

interface FormValues {
  version: string;
  title: string;
}
const ReleaseNoteEdit = () => {
  const [value, setValue] = useState<string | undefined>('**내용을 입력해주세요.**');
  const [form] = Form.useForm();

  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };
  return (
    <>
      <HeaderBar />
      <SideBar />
      <SideDetailBar />
      <Wrapper>
        <ReleasedNoteDiv>
          <div>
            <Form form={form} onFinish={handleSubmit}>
              <Form.Item name="version" label="버전" rules={[{ required: true, message: '버전을 입력해주세요' }]}>
                <Input />
              </Form.Item>
              <Form.Item name="title" label="제목" rules={[{ required: true, message: '제목을 입력해주세요' }]}>
                <Input />
              </Form.Item>
            </Form>
          </div>
          <EditorDiv>
            <MDEditor height={500} value={value} onChange={setValue} />
          </EditorDiv>
          <Button type="primary" onClick={() => form.submit()}>
            임시저장
          </Button>
        </ReleasedNoteDiv>
      </Wrapper>
    </>
  );
};

export default ReleaseNoteEdit;
