import React, { useState } from 'react';
import { Card, Dropdown, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import AvatarCrop from '@/components/AvatarCrop';
import { UserOutlined } from '@ant-design/icons';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { projectInfoMenuOpenState, SelectedProjectState } from '@states/ProjectState.ts';

const Notification: React.FC = () => {
  const navigate = useNavigate();
  const initialSelectedProject = useResetRecoilState(SelectedProjectState);
  const [, setProjectInfoMenuOpen] = useRecoilState(projectInfoMenuOpenState);
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleDropdownVisibleChange = (flag: boolean) => {
    setVisible(flag);
  };
  function waitForAnimation() {
    return new Promise(resolve => setTimeout(resolve, 550));
  }
  return (
    <Dropdown
      overlay={
        <Card
          style={{ width: '22vw' }}
          actions={[
            <div
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
