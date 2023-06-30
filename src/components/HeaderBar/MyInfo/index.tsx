import React, { useState } from 'react';
import {UserOutlined} from '@ant-design/icons';
import { Card, Dropdown, Space } from 'antd';
import {Link} from "react-router-dom";

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
                <Card title="Card title" bordered={false} style={{ width: 300 }}>
                    <p><Link to = "/mypage" style={{ textDecoration: "none", color: "black" }}>내 정보</Link></p>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
            }
            trigger={['click']}
            visible={visible}
            onVisibleChange={handleDropdownVisibleChange}
        >
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    <UserOutlined style={{ fontSize: '20px' }}/>
                </Space>
            </a>
        </Dropdown>
    );
};

export default Notification;
