import { Button } from 'antd';
import 'react-toastify/dist/ReactToastify.css';
import SearchPassword from '@/components/SearchPassword';
import { useCallback, useState } from 'react';
import Menu from '@/components/Menu';
import { ToastContainer } from 'react-toastify';

const ChangePasswordModal = () => {
  const [checkPasswordModal, setCheckPasswordModal] = useState(false);
  const onClosePasswordModal = useCallback(() => {
    setCheckPasswordModal(prev => !prev);
  }, []);
  return (
    <div>
      <Button onClick={onClosePasswordModal} style={{ fontFamily: 'SCDream4', fontSize: '12px' }}>
        비밀번호 변경
      </Button>
      {checkPasswordModal && (
        <Menu show={checkPasswordModal} onCloseModal={onClosePasswordModal}>
          <SearchPassword onClosePasswordModal={onClosePasswordModal} />
        </Menu>
      )}
      <ToastContainer position="top-center" autoClose={1500} closeOnClick pauseOnFocusLoss theme="light" />
    </div>
  );
};

export default ChangePasswordModal;
