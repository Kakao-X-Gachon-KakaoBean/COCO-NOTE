import MDEditor from '@uiw/react-md-editor';
import { useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';
import HeaderBar from '@components/HeaderBar';
import SideBar from '@components/SideBar';
import SideDetailBar from '@components/SideDetailBar';
import { Wrapper } from '@styles/DetailSide/styles.tsx';
import { ReleasedNoteDiv } from '@components/ReleaseNote/ReleasedNoteAll/styles.tsx';
import { Editor, TemporarySave, TitleVersionInput } from '@components/ReleaseNote/ReleaseNoteEdit/styles.tsx';
import { projectInfoMenuOpenState } from '@states/ProjectState.ts';
import { useRecoilValue } from 'recoil';
import { ActivityIndicator } from '@components/ActivityIndicator';

interface FormValues {
  version: string;
  title: string;
}
const ReleaseNoteEdit = () => {
  const [value, setValue] = useState<string | undefined>('**내용을 입력해주세요.**');
  const [form] = Form.useForm();
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

  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };

  const initialValues = {
    version: '1.0.0',
    title: '미리 작성된 제목',
  };
  return (
    <>
      <HeaderBar />
      <SideBar />
      <SideDetailBar />
      {isVisible ? (
        <Wrapper>
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
            <Editor>
              <MDEditor height={'60vh'} value={value} onChange={setValue} />
            </Editor>
            <TemporarySave>
              <Button type="primary" onClick={() => form.submit()}>
                임시저장
              </Button>
            </TemporarySave>
          </ReleasedNoteDiv>
        </Wrapper>
      ) : (
        <Wrapper>
          <ActivityIndicator />
        </Wrapper>
      )}
    </>
  );
};

export default ReleaseNoteEdit;
