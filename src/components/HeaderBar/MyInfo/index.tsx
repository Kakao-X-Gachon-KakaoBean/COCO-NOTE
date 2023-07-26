import React, { useState } from 'react';
import { Card, Dropdown, Space } from 'antd';
import { Link } from 'react-router-dom';
import AvatarCrop from '@components/AvatarCrop';
import { UserOutlined } from '@ant-design/icons';

const Notification: React.FC = () => {
  // dropdown
  const [visible, setVisible] = useState(false);

  // avatar crop modal
  const [modalVisible, setModalVisible] = useState(false);
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
            <Link
              to="/mypage"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onClick={() => {
                setVisible(false);
              }}
            >
              <UserOutlined style={{ fontSize: 15 }} /> &nbsp; 내 정보
            </Link>,
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
