import React, { useState } from 'react';
import {BellOutlined} from '@ant-design/icons';
import { Menu, Dropdown, Space } from 'antd';
import {items} from "@components/HeaderBar/Notification/dummy.tsx";

const Notification : React.FC = () => {
    const [visible, setVisible] = useState(false);

    const handleDropdownVisibleChange = (flag: boolean) => {
        setVisible(flag);
    };

    const handleClick = () => {
        setVisible(!visible);
    };

    return (
        <Dropdown
            overlay={
                <Menu onClick={handleClick}>
                    {items.map((item) => (
                        <Menu.Item key={item.key} danger={item.danger} disabled={item.disabled}>
                            {item.icon}
                            {item.label}
                        </Menu.Item>
                    ))}
                </Menu>
            }
            trigger={['click']}
            visible={visible}
            onVisibleChange={handleDropdownVisibleChange}
        >
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    <BellOutlined style={{ fontSize: '20px' }}/>
                </Space>
            </a>
        </Dropdown>
    );
};

export default Notification;
