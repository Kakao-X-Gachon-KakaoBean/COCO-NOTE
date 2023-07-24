import React, { ChangeEvent, useEffect, useState } from 'react';
import Avatar from 'react-avatar-edit';
import { Modal, Typography } from 'antd';

import defaultImage from '../../images/defaultAvatar.png';
import PreviewAvatar from '@components/AvatarCrop/PreviewAvatar';
import { MetaDiv, PreviewAvatarDiv, ProfileTextDiv } from '@components/AvatarCrop/styles.tsx';
import { ModalVisibleProps } from '@components/AvatarCrop/type.ts';
import { MypageUser, MyPageUserState } from '@states/userState.ts';
import { useRecoilState } from 'recoil';

const { Text, Title } = Typography;
const AvatarCrop: React.FC<ModalVisibleProps> = ({ showProfileText, modalVisible, closeModal }) => {
  const [userInfo, setUserInfo] = useRecoilState<MypageUser>(MyPageUserState);
  const [preview, setPreview] = useState<string | null>(userInfo.profileImage);

  useEffect(() => {
    setPreview(userInfo.profileImage);
  }, [userInfo.profileImage, userInfo.originalImage]);

  const onCrop = (crop: string): void => {
    setPreview(crop);
  };

  const onBeforeFileLoad = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files[0].size) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = function () {
        if (typeof reader.result === 'string') {
          console.log('원본', reader.result);
          setUserInfo({
            ...userInfo,
            originalImage: reader.result,
          });
        }
      };
      reader.readAsDataURL(file);
      reader.onerror = function (error) {
        console.log('이미지를 base64로 변환하는데 문제가 발생하였습니다: ', error);
      };
    }
  };

  const closeModalHandler = () => {
    setPreview(userInfo.profileImage);
    closeModal();
  };

  return (
    <div>
      <Modal
        title="프로필 이미지 설정"
        centered
        open={modalVisible}
        onOk={() => {
          setUserInfo(prevUserInfo => ({
            ...prevUserInfo,
            profileImage: preview === null ? defaultImage : preview,
          }));
          closeModalHandler();
        }}
        onCancel={() => closeModalHandler()}
      >
        <Avatar
          width={480}
          height={295}
          onCrop={onCrop}
          onClose={() => {
            setPreview(userInfo.profileImage);
          }}
          onBeforeFileLoad={onBeforeFileLoad}
          label="클릭하여 이미지를 업로드하세요"
        />
      </Modal>
      <MetaDiv>
        <PreviewAvatarDiv>
          <PreviewAvatar preview={preview ?? defaultImage} />
        </PreviewAvatarDiv>
        {showProfileText && (
          <ProfileTextDiv>
            <Title level={4}>{userInfo.name}</Title>
            <Text type={'secondary'}>{userInfo.email}</Text>
          </ProfileTextDiv>
        )}
      </MetaDiv>
    </div>
  );
};

export default AvatarCrop;
