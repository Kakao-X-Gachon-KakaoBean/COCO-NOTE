import { Button, Input, Modal, Space } from 'antd';
import { useState } from 'react';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const ChangePasswordModal = () => {
  const [open, setOpen] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button onClick={() => setOpen(true)} style={{ fontFamily: 'SCDream4', fontSize: '12px' }}>
        비밀번호 변경
      </Button>
      <Modal
        centered
        open={open}
        title={'비밀번호 변경'}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[<Button key={'footer'}>custom footer</Button>]}
      >
        <Space direction="vertical">
          <Input.Password placeholder="input password" />
          <Input.Password
            placeholder="input password"
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
          <Space direction="horizontal">
            <Input.Password
              placeholder="input password"
              visibilityToggle={{
                visible: passwordVisible,
                onVisibleChange: setPasswordVisible,
              }}
            />
            <Button style={{ width: 80 }} onClick={() => setPasswordVisible(prevState => !prevState)}>
              {passwordVisible ? 'Hide' : 'Show'}
            </Button>
          </Space>
        </Space>
      </Modal>
    </div>
  );
};

export default ChangePasswordModal;
