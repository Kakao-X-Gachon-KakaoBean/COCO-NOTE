import AvatarCrop from '@/components/AvatarCrop';
import { useState } from 'react';
import { Space, Typography } from 'antd';
import { EditProfileBtn, InfoCardDiv, ProfileDiv, UserInfoDiv } from '@/components/MyInfoCard/styles.tsx';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { MypageUser } from '@/states/userState.ts';
import fetcher from '@/utils/fetcher.ts';
import { modifyMemberName } from '@/Api/Mypage/Mypage.ts';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { EditName } from '@components/MyInfoCard/type.ts';
const { Text, Paragraph } = Typography;
const MyInfoCard = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const queryClient = useQueryClient();
  const closeModal = () => {
    setModalVisible(false);
  };

  const { data } = useQuery<MypageUser>(['memberInfo'], () =>
    fetcher({
      queryKey: 'http://localhost:8080/members/info',
    })
  );
  const ModifyMemberNameMutation = useMutation<'멤버 이름 변경 성공' | '멤버 이름 변경 실패', AxiosError, EditName>(
    'modifyMemberName',
    (data: EditName) => modifyMemberName(data),
    {
      onSuccess: data => {
        if (data === '멤버 이름 변경 성공') {
          queryClient.invalidateQueries('memberInfo');
          toast.success('이름을 변경했습니다.');
        } else {
          toast.error('이름 변경에 실패했습니다.');
        }
      },
    }
  );

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
                  onChange: value => ModifyMemberNameMutation.mutate({ nameToChange: value }),
                }}
              >
                {data?.name}
              </Text>
            </Paragraph>
            <Paragraph>
              <Text type={'secondary'} style={{ fontFamily: 'SCDream3' }}>
                이메일
                <br />
              </Text>
              <Text style={{ fontFamily: 'SCDream4' }}>{data?.email}</Text>
            </Paragraph>
          </Space>
        </Typography>
      </UserInfoDiv>
    </InfoCardDiv>
  );
};

export default MyInfoCard;
