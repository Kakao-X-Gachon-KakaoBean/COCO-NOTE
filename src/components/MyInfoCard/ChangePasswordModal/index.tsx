import { Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { UserPassword } from './mock.tsx';
import { ChangePasswordInput, ChangePasswordStatus } from '@components/MyInfoCard/ChangePasswordModal/type.ts';
import {
  ConfirmNewPassword,
  ExistingPassword,
  NewPassword,
  NewPasswordText,
} from '@components/MyInfoCard/ChangePasswordModal/styles.tsx';

const ChangePasswordModal = () => {
  const [open, setOpen] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState<ChangePasswordStatus>({
    existingPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [passwordInput, setPasswordInput] = useState<ChangePasswordInput>({
    existingPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  function refreshInput() {
    setPasswordStatus({
      existingPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    });

    setPasswordInput({
      existingPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    });
  }
  const handleOk = () => {
    let isValid = true;

    if (passwordInput.existingPassword === UserPassword) {
      setPasswordStatus(prevState => ({
        ...prevState,
        existingPassword: '',
      }));
    } else {
      toast.error('현재 비밀번호를 확인해주세요');
      setPasswordStatus(prevState => ({
        ...prevState,
        existingPassword: 'error',
      }));
      isValid = false;
    }

    if (
      passwordInput.newPassword &&
      passwordInput.confirmNewPassword &&
      passwordInput.newPassword === passwordInput.confirmNewPassword
    ) {
      setPasswordStatus(prevState => ({
        ...prevState,
        confirmNewPassword: '',
      }));
    } else {
      toast.error('새로운 비밀번호를 다시 확인해주세요');
      setPasswordStatus(prevState => ({
        ...prevState,
        confirmNewPassword: 'error',
      }));
      isValid = false;
    }

    if (isValid) {
      toast.success('비밀번호가 변경되었습니다');
      setOpen(false);
      refreshInput();
    }
  };

  const handleCancel = () => {
    refreshInput();
    setOpen(false);
  };

  useEffect(() => {
    if (passwordInput.existingPassword.length > 0) {
      if (passwordInput.existingPassword !== UserPassword) {
        setPasswordStatus(prevState => ({
          ...prevState,
          existingPassword: 'warning',
        }));
      } else {
        setPasswordStatus(prevState => ({
          ...prevState,
          existingPassword: '',
        }));
      }
    }
    if (passwordInput.newPassword.length > 0 && passwordInput.confirmNewPassword.length > 0) {
      if (passwordInput.newPassword !== passwordInput.confirmNewPassword) {
        setPasswordStatus(prevState => ({
          ...prevState,
          confirmNewPassword: 'warning',
        }));
      } else {
        setPasswordStatus(prevState => ({
          ...prevState,
          confirmNewPassword: '',
        }));
      }
    }
  }, [passwordInput]);

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
        footer={[
          <Button key={'footer'} onClick={() => handleOk()}>
            비밀번호 변경
          </Button>,
        ]}
      >
        <div>
          <ExistingPassword
            value={passwordInput.existingPassword}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPasswordInput(prevState => ({
                ...prevState,
                existingPassword: event.target.value,
              }))
            }
            status={passwordStatus.existingPassword}
            placeholder="현재 비밀번호를 입력해주세요"
          />
          <NewPasswordText>새로운 비밀번호</NewPasswordText>
          <NewPassword
            value={passwordInput.newPassword}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPasswordInput(prevState => ({
                ...prevState,
                newPassword: event.target.value,
              }))
            }
            status={passwordStatus.newPassword}
            placeholder="새로운 비밀번호를 입력해주세요"
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
          <ConfirmNewPassword
            value={passwordInput.confirmNewPassword}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPasswordInput(prevState => ({
                ...prevState,
                confirmNewPassword: event.target.value,
              }))
            }
            status={passwordStatus.confirmNewPassword}
            placeholder="비밀번호를 다시 입력해주세요"
          />
        </div>
      </Modal>
      <ToastContainer position="top-center" autoClose={1500} closeOnClick pauseOnFocusLoss theme="light" />
    </div>
  );
};

export default ChangePasswordModal;
