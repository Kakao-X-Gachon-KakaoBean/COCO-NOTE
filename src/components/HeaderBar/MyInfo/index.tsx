import React, { useEffect, useState } from "react";
import { Card, Dropdown, Space } from "antd";
import { Link } from "react-router-dom";
import { UserIcon } from "@components/HeaderBar/MyInfo/styles.tsx";
import AvatarCrop from "@components/AvatarCrop";
import { EditOutlined, UserOutlined } from "@ant-design/icons";

const Notification: React.FC = () => {
  // dropdown
  const [visible, setVisible] = useState(false);

  // avatar crop modal
  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => {
    setModalVisible(false);
  };

  // profile 수정 modal이 활성화되어있는 동안에는 dropdown도 닫히지 않음.
  const [count, setCount] = useState(0);
  const handleDropdownVisibleChange = (flag: boolean) => {
    if (flag === false && modalVisible === true) {
      setVisible(true);
    } else if (flag === false && modalVisible === false && count > 0) {
      setVisible(true);
    } else {
      setVisible(flag);
    }
  };

  useEffect(() => {
    if (modalVisible) {
      setCount(1);
    } else {
      setCount(0);
    }
  }, [modalVisible]);

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
              onClick={() => {
                setVisible(false);
              }}
            >
              <UserOutlined style={{ fontSize: 15 }} /> &nbsp; 내 정보
            </Link>,
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => {
                setModalVisible(true);
              }}
            >
              <EditOutlined style={{ fontSize: 15 }} /> &nbsp; 프로필 사진 변경
            </div>,
          ]}
        >
          <AvatarCrop modalVisible={modalVisible} closeModal={closeModal} />
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
