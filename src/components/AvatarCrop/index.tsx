import { useState } from "react";
import Avatar from "react-avatar-edit";
import { Modal, Typography } from "antd";

import defaultImage from "../../images/defaultAvatar.png";
import PreviewAvatar from "@components/AvatarCrop/PreviewAvatar";
import {
  MetaDiv,
  PreviewAvatarDiv,
  ProfileTextDiv,
} from "@components/AvatarCrop/styles.tsx";

const { Text, Title } = Typography;
const AvatarCrop = () => {
  // 초기의 프로필 사진을 저장해서 Avatar Crop 시 표시되도록 해야한다.
  // 초기의 프로필 사진을 저장해서 Avatar Crop 취소 시 원상복귀해야한다.
  const [notConfirmedPreview, setNotConfirmedPreview] = useState<string | null>(
    null
  );
  const [preview, setPreview] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const onClose = (): void => {
    setPreview(null);
  };

  const onCrop = (preview: string): void => {
    setNotConfirmedPreview(preview);
  };

  return (
    <div>
      <Modal
        title="프로필 이미지 설정"
        centered
        open={modalOpen}
        onOk={() => {
          setPreview(notConfirmedPreview);
          setModalOpen(false);
        }}
        onCancel={() => setModalOpen(false)}
      >
        <Avatar
          width={480}
          height={295}
          onCrop={onCrop}
          onClose={onClose}
          label="클릭하여 이미지를 업로드하세요"
        />
      </Modal>
      <MetaDiv>
        <PreviewAvatarDiv
          onClick={() => {
            setModalOpen(true);
          }}
        >
          <PreviewAvatar preview={preview ?? defaultImage} />
        </PreviewAvatarDiv>
        <ProfileTextDiv>
          <Title level={4}>김윤호</Title>
          <Text>프론트엔드 개발자</Text>
          <Text type={"secondary"}>hkj9909@gmail.com</Text>
        </ProfileTextDiv>
      </MetaDiv>
    </div>
  );
};

export default AvatarCrop;
