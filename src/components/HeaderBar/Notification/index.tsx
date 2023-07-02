import React, { useState } from 'react';
import { Menu, Dropdown, Space } from 'antd';
import {items} from "@components/HeaderBar/Notification/dummy.tsx";
import {BellIcon} from "@components/HeaderBar/Notification/styles.tsx";

const Notification : React.FC = () => {
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
                        <BellIcon/>
                    </Space>
                </a>
            </Dropdown>
        </div>
    );
};

export default Notification;