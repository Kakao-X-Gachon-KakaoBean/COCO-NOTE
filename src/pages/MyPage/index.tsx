import HeaderBar from "@components/HeaderBar";
import { Wrapper } from "@styles/DefaultSide/styles.tsx";
import SideBar from "@components/SideBar";
import MyInfoCard from "@components/MyInfoCard";
import {
  CenterDiv,
  MyInfoCardDiv,
  MyPageDiv,
  MyPageTextDiv,
} from "@pages/MyPage/styles.tsx";
import ChangeInfoBtn from "@components/MyInfoCard/ChangeInfoBtn";
import { Divider } from "antd";
const MyPage = () => {
  return (
    <>
      <HeaderBar />
      <SideBar />
      <Wrapper>
        <CenterDiv>
          <MyPageDiv>
            <MyPageTextDiv>내 정보</MyPageTextDiv>
            <MyInfoCardDiv>
              <MyInfoCard />
            </MyInfoCardDiv>
            <Divider />
            <MyPageTextDiv>비밀번호와 계정</MyPageTextDiv>
            <ChangeInfoBtn />
            <Divider />
            <MyPageTextDiv>내 작업항목</MyPageTextDiv>
            <Divider />
          </MyPageDiv>
        </CenterDiv>
      </Wrapper>
    </>
  );
};

export default MyPage;
