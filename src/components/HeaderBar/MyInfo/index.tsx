import React, { useCallback, useState } from 'react';
import { Card, Dropdown, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import AvatarCrop from '@components/AvatarCrop';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { projectInfoMenuOpenState, SelectedProjectState } from '@states/ProjectState.ts';
import { removeCookie } from '@utils/cookie.ts';
import { memberIdState } from '@states/UserState.ts';
import { waitForAnimation } from '@hooks/waitForAnimation.ts';
import { useQueryClient } from 'react-query';

const Notification: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const initialSelectedProject = useResetRecoilState(SelectedProjectState);
  const [, setProjectInfoMenuOpen] = useRecoilState(projectInfoMenuOpenState);
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [, setIsLogin] = useState(localStorage.getItem('accessToken') !== null);
  const resetMemberId = useResetRecoilState(memberIdState);
  const resetSelectedProject = useResetRecoilState(SelectedProjectState);

  const onLogout = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      localStorage.removeItem('accessToken');
      resetMemberId();
      localStorage.removeItem('memberAtom');
      removeCookie('refreshToken');
      setIsLogin(false);
      queryClient.invalidateQueries('projectinfo');
      resetSelectedProject();
      setProjectInfoMenuOpen(false);
      document.location.href = '/';
    },
    [queryClient, resetMemberId, resetSelectedProject, setProjectInfoMenuOpen]
  );

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleDropdownVisibleChange = (flag: boolean) => {
    setVisible(flag);
  };

  return (
    <Dropdown
      overlay={
        <Card
          style={{ width: '22vw' }}
          actions={[
            <div
              key={'myPageAction'}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onClick={async () => {
                setVisible(false);
                initialSelectedProject();
                setProjectInfoMenuOpen(false);
                await waitForAnimation();
                setVisible(false);
                navigate('/mypage');
              }}
            >
              <UserOutlined style={{ fontSize: 15 }} /> &nbsp; 마이 페이지
            </div>,
            <div
              key={'logoutAction'}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onClick={onLogout}
            >
              <LogoutOutlined style={{ fontSize: 15 }} /> &nbsp; 로그아웃
            </div>,
          ]}
        >
          <AvatarCrop showProfileText={true} modalVisible={modalVisible} closeModal={closeModal} />
        </Card>
      }
      trigger={['click']}
      open={visible}
      onOpenChange={handleDropdownVisibleChange}
    >
      <a onClick={e => e.preventDefault()}>
        <Space>
          <UserOutlined
            style={{
              fontSize: '27px',
              cursor: 'pointer',
              color: '#00b050',
            }}
          />
        </Space>
      </a>
    </Dropdown>
  );
};

export default Notification;
