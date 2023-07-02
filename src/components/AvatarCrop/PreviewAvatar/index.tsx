import React from "react";
import defaultImage from "../../../images/defaultAvatar.png";
import { ProfileImagePreview } from "@components/AvatarCrop/PreviewAvatar/styles.tsx";

interface PreviewProps {
  preview: string;
}
const PreviewAvatar: React.FC<PreviewProps> = ({ preview }) => {
  return (
    <div>
      <ProfileImagePreview src={preview ?? defaultImage} alt="Preview" />
    </div>
  );
};

export default PreviewAvatar;