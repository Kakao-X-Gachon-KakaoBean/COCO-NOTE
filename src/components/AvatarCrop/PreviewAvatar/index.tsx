import React from 'react';
import { Image } from 'antd';
import defaultImage from '../../../images/defaultAvatar.png';
import { ProfileViewDiv } from '@components/AvatarCrop/PreviewAvatar/styles.tsx';
import { PreviewProps } from '@type/HeaderBarType.ts';

const PreviewAvatar: React.FC<PreviewProps> = ({ preview }) => {
  return (
    <ProfileViewDiv>
      <Image src={preview ?? defaultImage} alt="Preview" width={'80%'} height={'130%'} />
    </ProfileViewDiv>
  );
};

export default PreviewAvatar;
