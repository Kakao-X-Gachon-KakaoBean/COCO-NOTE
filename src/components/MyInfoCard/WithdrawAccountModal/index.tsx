import { Button, Modal } from 'antd';
import { useState } from 'react';

const WithdrawAccountModal = () => {
  const [open, setOpen] = useState(false);
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button
        type={'primary'}
        danger
        onClick={() => setOpen(true)}
        style={{ fontFamily: 'SCDream4', fontSize: '12px' }}
      >
        계정 탈퇴
      </Button>
      <Modal centered open={open} title={'비밀번호 변경'} onOk={handleOk} onCancel={handleCancel}>
        계정 탈퇴
      </Modal>
    </div>
  );
};

export default WithdrawAccountModal;
