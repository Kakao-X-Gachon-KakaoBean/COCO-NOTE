import React, { useState } from "react";
import { Menu, Dropdown, Space } from "antd";
import { items } from "@components/HeaderBar/Notification/dummy.tsx";
import { BellOutlined } from "@ant-design/icons";

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
            {items.map((item) => (
              <Menu.Item
                key={item.key}
                danger={item.danger}
                disabled={item.disabled}
              >
                {item.icon}
                {item.label}
              </Menu.Item>
            ))}
          </Menu>
        }
        trigger={["click"]}
        visible={visible}
        onVisibleChange={handleDropdownVisibleChange}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <BellOutlined
              style={{
                fontSize: "25px",
                cursor: "pointer",
                color: visible ? "green" : "black",
              }}
            />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};

export default Notification;
