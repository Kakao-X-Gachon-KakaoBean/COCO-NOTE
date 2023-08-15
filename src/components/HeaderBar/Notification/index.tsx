import React, { useState } from 'react';
import { Dropdown, Menu, Space } from 'antd';
import { items } from '@/components/HeaderBar/Notification/dummy.tsx';
import { BellOutlined } from '@ant-design/icons';
import { MoreBtn } from '@/components/HeaderBar/Notification/styles.tsx';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { projectInfoMenuOpenState, SelectedProjectState } from '@/states/ProjectState.ts';

const Notification: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const initialSelectedProject = useResetRecoilState(SelectedProjectState);
  const [, setProjectInfoMenuOpen] = useRecoilState(projectInfoMenuOpenState);
  const navigate = useNavigate();

  const handleDropdownVisibleChange = (flag: boolean) => {
    setVisible(flag);
  };

  const handleClick = () => {
    setVisible(!visible);
  };

  function waitForAnimation() {
    return new Promise(resolve => setTimeout(resolve, 550));
  }

  return (
    <div>
      <Dropdown
        overlay={
          <Menu onClick={handleClick}>
            {items.map(item => (
              <Menu.Item key={item.key} danger={item.danger} disabled={item.disabled}>
                {item.icon}
                {item.label}
              </Menu.Item>
            ))}
            <MoreBtn
              onClick={async () => {
                setVisible(false);
                initialSelectedProject();
                setProjectInfoMenuOpen(false);
                await waitForAnimation();
                navigate('/notification');
              }}
            >
              더 보기
            </MoreBtn>
          </Menu>
        }
        trigger={['click']}
        open={visible}
        onOpenChange={handleDropdownVisibleChange}
      >
        <a onClick={e => e.preventDefault()}>
          <Space>
            <BellOutlined
              style={{
                fontSize: '27px',
                cursor: 'pointer',
                color: '#00b050',
              }}
            />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};

export default Notification;
