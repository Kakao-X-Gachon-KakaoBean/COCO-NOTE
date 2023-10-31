import { CenterDiv, ChangeInfoDiv, MyInfoCardDiv, MyPageDiv, MyPageTextDiv } from '@/components/MyInfo/styles.tsx';
import MyInfoCard from '@/components/MyInfoCard';
import { Divider } from 'antd';
import ChangePasswordModal from '@/components/MyInfoCard/ChangePasswordModal';
import WithdrawAccountModal from '@/components/MyInfoCard/WithdrawAccountModal';

const MyInfo = () => {
  return (
    <>
      <CenterDiv>
        <MyPageDiv>
          <MyPageTextDiv>내 정보</MyPageTextDiv>
          <MyInfoCardDiv>
            <MyInfoCard />
          </MyInfoCardDiv>
          <Divider />
          <MyPageTextDiv>비밀번호 변경</MyPageTextDiv>
          <ChangeInfoDiv>
            <ChangePasswordModal />
          </ChangeInfoDiv>
          <Divider />
          <MyPageTextDiv>계정 탈퇴</MyPageTextDiv>
          <ChangeInfoDiv>
            <WithdrawAccountModal />
          </ChangeInfoDiv>
        </MyPageDiv>
      </CenterDiv>
    </>
  );
};

export default MyInfo;
