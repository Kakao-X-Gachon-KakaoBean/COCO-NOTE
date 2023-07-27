import { Button, Modal, Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import {
  FooterContainer,
  WithdrawAccountAgreeText,
  WithdrawAccountExplainText,
} from '@components/MyInfoCard/WithdrawAccountModal/styles.tsx';

const WithdrawAccountModal = () => {
  const [open, setOpen] = useState(false);
  const [isAgree, setIsAgree] = useState(false);
  const handleOk = () => {
    if (isAgree) {
      toast.success('계정이 삭제되었습니다.');
      setIsAgree(false);
      setOpen(false);
    } else {
      toast.error('동의사항을 확인해주세요.');
    }
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const checkAgree = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
    setIsAgree(e.target.checked);
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
      <Modal
        centered
        open={open}
        title={'계정 탈퇴'}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <FooterContainer key={'checkAgreeBox'}>
            <Checkbox onChange={checkAgree} checked={isAgree}>
              <WithdrawAccountAgreeText>계정삭제에 동의합니다.</WithdrawAccountAgreeText>
            </Checkbox>
            <Button key={'footer'} onClick={() => handleOk()}>
              확인
            </Button>
          </FooterContainer>,
        ]}
      >
        <WithdrawAccountExplainText>
          <div>정말 계정을 삭제하시겠습니까?</div>
          <div>코코노트의 모든 사용자 정보가 삭제됩니다.</div>
        </WithdrawAccountExplainText>
      </Modal>
      <ToastContainer position="top-center" autoClose={1500} closeOnClick pauseOnFocusLoss theme="light" />
    </div>
  );
};

export default WithdrawAccountModal;
