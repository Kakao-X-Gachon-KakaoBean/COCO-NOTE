import HeaderBar from "@components/HeaderBar";
import { Wrapper } from "@styles/DefaultSide/styles.tsx";
import SideBar from "@components/SideBar";
const MyPage = () => {
  return (
    <>
      <HeaderBar />
      <SideBar />
      <Wrapper>
        <div>
          <h1>This is my page</h1>
        </div>
      </Wrapper>
    </>
  );
};

export default MyPage;
