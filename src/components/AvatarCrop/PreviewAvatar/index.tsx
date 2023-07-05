import React from "react";
import { Image } from "antd";
import defaultImage from "../../../images/defaultAvatar.png";
import { ProfileViewDiv } from "@components/AvatarCrop/PreviewAvatar/styles.tsx";
import { PreviewProps } from "@components/HeaderBar/type.ts";

const PreviewAvatar: React.FC<PreviewProps> = ({ preview }) => {
  return (
    <ProfileViewDiv>
      <Image
        src={preview ?? defaultImage}
        alt="Preview"
        width={"150px"}
        height={"150px"}
      />
    </ProfileViewDiv>
  );
};

export default PreviewAvatar;
