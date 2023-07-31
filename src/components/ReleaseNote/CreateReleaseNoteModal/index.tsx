import { Button, Form, Input, Modal } from 'antd';
import React from 'react';
import { CreateModalInput, ModalProps } from '@components/ReleaseNote/CreateReleaseNoteModal/type.ts';
import { ModalDiv } from '@components/ReleaseNote/CreateReleaseNoteModal/styles.tsx';
const CreateReleaseNoteModal: React.FC<ModalProps> = ({ visible, handleOk }) => {
  const [form] = Form.useForm();
  const createReleaseNote = (values: CreateModalInput) => {
    console.log(values);
    form.resetFields();
    // 정상적으로 실행되었을 시에 handleOk
    handleOk({ title: values.title, key: values.key, contents: '', status: 'success' });
  };
  return (
    <>
      <Modal
        centered
        open={visible}
        onCancel={() => handleOk({ title: '', key: '', contents: '', status: 'fail' })}
        title={'새 릴리즈 노트 생성하기'}
        footer={[
          <Button key={'footer'} onClick={() => form.submit()}>
            생성
          </Button>,
        ]}
      >
        <ModalDiv>
          <Form form={form} onFinish={createReleaseNote}>
            <Form.Item name="version" label="버전" rules={[{ required: true, message: '버전을 입력해주세요' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="title" label="제목" rules={[{ required: true, message: '제목을 입력해주세요' }]}>
              <Input />
            </Form.Item>
          </Form>
        </ModalDiv>
      </Modal>
    </>
  );
};

export default CreateReleaseNoteModal;
