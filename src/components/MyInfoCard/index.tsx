import AvatarCrop from '@components/AvatarCrop';
import { useState } from 'react';
import { Space, Typography } from 'antd';
import { EditProfileBtn, InfoCardDiv, ProfileDiv, UserInfoDiv } from '@components/MyInfoCard/styles.tsx';
import { useRecoilState } from 'recoil';
import { MypageUser, MyPageUserState } from '../../States/UserState.ts';
const { Text, Paragraph } = Typography;
const MyInfoCard = () => {
  // avatar crop modal
  const [modalVisible, setModalVisible] = useState(false);

  const [userInfo, setUserInfo] = useRecoilState<MypageUser>(MyPageUserState);
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <InfoCardDiv>
      <ProfileDiv>
        <AvatarCrop showProfileText={false} modalVisible={modalVisible} closeModal={closeModal} />
        <EditProfileBtn onClick={() => setModalVisible(true)}>프로필 변경</EditProfileBtn>
      </ProfileDiv>
      <UserInfoDiv>
        <Typography>
          <Space direction={'vertical'}>
            <Paragraph>
              <Text type={'secondary'} style={{ fontFamily: 'SCDream3' }}>
                이름
                <br />
              </Text>
              <Text
                strong
                style={{ fontSize: '1.3rem', fontFamily: 'SCDream5' }}
                editable={{
                  tooltip: '이름 변경',
                  onChange: value => setUserInfo({ ...userInfo, name: value }),
                }}
              >
                {userInfo.name}
              </Text>
            </Paragraph>
            <Paragraph>
              <Text type={'secondary'} style={{ fontFamily: 'SCDream3' }}>
                이메일
                <br />
              </Text>
              <Text style={{ fontFamily: 'SCDream4' }}>{userInfo.email}</Text>
            </Paragraph>
          </Space>
        </Typography>
      </UserInfoDiv>
    </InfoCardDiv>
  );
};

export default MyInfoCard;
