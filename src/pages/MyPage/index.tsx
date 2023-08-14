import HeaderBar from '@/components/HeaderBar';
import { Wrapper } from '@/styles/DetailSide/styles.tsx';
import SideBar from '@/components/SideBar';
import MyInfoCard from '@/components/MyInfoCard';
import { CenterDiv, ChangeInfoDiv, MyInfoCardDiv, MyPageDiv, MyPageTextDiv } from '@/pages/MyPage/styles.tsx';
import { Divider } from 'antd';
import ChangePasswordModal from '@/components/MyInfoCard/ChangePasswordModal';
import WithdrawAccountModal from '@/components/MyInfoCard/WithdrawAccountModal';
import SideDetailBar from '@components/SideDetailBar';

const MyPage = () => {
  return (
    <>
      <HeaderBar />
      <SideBar />
      <SideDetailBar />
      <Wrapper>
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
      </Wrapper>
    </>
  );
};

export default MyPage;
