import React, { useState } from 'react';
import { Dropdown, Menu, Space } from 'antd';
import { items } from '@components/HeaderBar/Notification/dummy.tsx';
import { BellOutlined } from '@ant-design/icons';

const Notification: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const handleDropdownVisibleChange = (flag: boolean) => {
    setVisible(flag);
  };

  const handleClick = () => {
    setVisible(!visible);
  };

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
