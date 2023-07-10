import AvatarCrop from '@components/AvatarCrop';
import { useState } from 'react';
import { Space, Typography } from 'antd';
import { EditProfileBtn, InfoCardDiv, ProfileDiv, UserInfoDiv } from '@components/MyInfoCard/styles.tsx';
import { useRecoilValue } from 'recoil';
import { MypageUser, MyPageUserState } from '../../States/UserState.ts';

const { Text, Paragraph } = Typography;
const MyInfoCard = () => {
  // avatar crop modal
  const [modalVisible, setModalVisible] = useState(false);

  const userInfo = useRecoilValue<MypageUser>(MyPageUserState);
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <InfoCardDiv>
      <ProfileDiv>
        <AvatarCrop showProfileText={false} modalVisible={modalVisible} closeModal={closeModal} />
        <EditProfileBtn onClick={() => setModalVisible(true)}>프로필 사진 변경</EditProfileBtn>
      </ProfileDiv>
      <UserInfoDiv>
        <Typography>
          <Space direction={'vertical'}>
            <Paragraph>
              <Text type={'secondary'}>
                이름
                <br />
              </Text>
              <Text strong style={{ fontSize: '1.3rem' }}>
                {userInfo.name}
              </Text>
            </Paragraph>
            <Paragraph>
              <Text type={'secondary'}>
                이메일
                <br />
              </Text>
              <Text>{userInfo.email}</Text>
            </Paragraph>
          </Space>
        </Typography>
      </UserInfoDiv>
    </InfoCardDiv>
  );
};

export default MyInfoCard;
