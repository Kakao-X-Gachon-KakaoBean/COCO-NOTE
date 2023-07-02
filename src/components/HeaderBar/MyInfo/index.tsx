import React, { useState } from "react";
import { Card, Dropdown, Space } from "antd";
import { Link } from "react-router-dom";
import { UserIcon } from "@components/HeaderBar/MyInfo/styles.tsx";
import AvatarCrop from "@components/AvatarCrop";
import { SettingFilled } from "@ant-design/icons";

const Notification: React.FC = () => {
  // dropdown
  const [visible, setVisible] = useState(false);

  const handleDropdownVisibleChange = (flag: boolean) => {
    setVisible(flag);
  };

  // <Link
  //     to="/mypage"
  //     style={{ textDecoration: "none", color: "black" }}
  // >
  return (
    <Dropdown
      overlay={
        <Card
          style={{ width: "20vw" }}
          actions={[
            <Link
              to="/mypage"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SettingFilled style={{ fontSize: 15 }} />
            </Link>,
          ]}
        >
          <AvatarCrop />
        </Card>
      }
      trigger={["click"]}
      visible={visible}
      onVisibleChange={handleDropdownVisibleChange}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <UserIcon />
        </Space>
      </a>
    </Dropdown>
  );
};

export default Notification;
