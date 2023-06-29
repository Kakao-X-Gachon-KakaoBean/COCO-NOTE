import HeaderBar from "@components/HeaderBar";
import { Wrapper } from "@styles/DetailSide/styles.tsx";
import SideBar from "@components/SideBar";
import SideDetailBar from "@components/SideDetailBar";
const Main = () => {
  return (
    <>
      <HeaderBar />
      <SideBar />
      <SideDetailBar />
      <Wrapper>
        <div>
          <h1>Welcome to the Main Page</h1>
        </div>
      </Wrapper>
    </>
  );
};

export default Main;
