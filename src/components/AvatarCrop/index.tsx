import React, { ChangeEvent, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Avatar from 'react-avatar-edit';
import { Modal, Typography } from 'antd';

import defaultImage from '../../images/defaultAvatar.png';
import PreviewAvatar from '@/components/AvatarCrop/PreviewAvatar';
import { MetaDiv, PreviewAvatarDiv, ProfileTextDiv } from '@/components/AvatarCrop/styles.tsx';
import { ModalVisibleProps, ProfileImages } from '@/types/AvatarType.ts';
import { IUser, MypageUser } from '@states/UserState.ts';
import fetcher from '@/utils/fetcher.ts';
import axios, { AxiosError } from 'axios';
import { BACKEND_URL } from '@/Api';

const { Text, Title } = Typography;
const AvatarCrop: React.FC<ModalVisibleProps> = ({ showProfileText, modalVisible, closeModal }) => {
  const [userProfileInfo, setUserProfileInfo] = useState<MypageUser | undefined>({
    profileImg: undefined,
    thumbnailImg: null,
    name: '',
    email: '',
  });
  const queryClient = useQueryClient();
  const { data } = useQuery<MypageUser>(['memberInfo'], () =>
    fetcher({
      queryKey: `${BACKEND_URL}/members/info`,
    })
  );
  const uploadProfileImageMutation = useMutation<IUser, AxiosError, ProfileImages>(
    'profileImage',
    data =>
      axios
        .post(`${BACKEND_URL}/members/images`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        })
        .then(response => response.data),
    {
      onMutate() {},
      onSuccess() {
        queryClient.invalidateQueries('memberInfo');
      },
      onError(error) {
        console.log('에러 발생', error);
      },
    }
  );

  function base64toFile(base64Data: string, filename: string): File | null {
    const arr = base64Data.split(',');
    if (arr.length < 2) {
      return null;
    }
    const matchResult = arr[0].match(/:(.*?);/);
    const mime = matchResult ? matchResult[1] : undefined;
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  const onCrop = (crop: string): void => {
    if (userProfileInfo) {
      setUserProfileInfo({
        ...userProfileInfo,
        thumbnailImg: crop,
      });
    }
  };

  const onBeforeFileLoad = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files[0].size) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = function () {
        if (typeof reader.result === 'string' && userProfileInfo) {
          setUserProfileInfo({
            ...userProfileInfo,
            profileImg: reader.result,
          });
        }
      };
      reader.readAsDataURL(file);
      reader.onerror = function (error) {
        console.log('이미지를 base64로 변환하는데 문제가 발생하였습니다: ', error);
      };
    }
  };

  return (
    <>
      <Modal
        title="프로필 이미지 설정"
        centered
        open={modalVisible}
        onOk={() => {
          if (userProfileInfo && userProfileInfo.profileImg && userProfileInfo.thumbnailImg) {
            const profileImage = base64toFile(userProfileInfo.profileImg, 'profileImg');
            const thumbnailImage = base64toFile(userProfileInfo.thumbnailImg, 'thumbnailImg');

            uploadProfileImageMutation.mutate({
              profileImg: profileImage,
              thumbnailImg: thumbnailImage,
            });
          }
          closeModal();
        }}
        onCancel={() => closeModal()}
      >
        <Avatar
          // 추후에 S3 관련 오류 해결하면 활성화
          // src={data?.profileImg}
          width={480}
          height={295}
          onCrop={onCrop}
          onBeforeFileLoad={onBeforeFileLoad}
          label="클릭하여 이미지를 업로드하세요"
        />
      </Modal>
      <MetaDiv>
        <PreviewAvatarDiv>
          <PreviewAvatar preview={data?.thumbnailImg ?? defaultImage} />
        </PreviewAvatarDiv>
        {showProfileText && (
          <ProfileTextDiv>
            <Title level={4}>{data?.name}</Title>
            <Text type={'secondary'}>{data?.email}</Text>
          </ProfileTextDiv>
        )}
      </MetaDiv>
    </>
  );
};

export default AvatarCrop;
