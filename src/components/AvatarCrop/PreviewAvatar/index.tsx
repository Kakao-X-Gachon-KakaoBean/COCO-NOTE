import React from "react";
import defaultImage from "../../../images/defaultAvatar.png";
import { ProfileImagePreview } from "@components/AvatarCrop/PreviewAvatar/styles.tsx";
import { PreviewProps } from "@components/HeaderBar/type.ts";

const PreviewAvatar: React.FC<PreviewProps> = ({ preview }) => {
  return (
    <div>
      <ProfileImagePreview src={preview ?? defaultImage} alt="Preview" />
    </div>
  );
};

export default PreviewAvatar;
