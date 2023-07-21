import HeaderBar from '@components/HeaderBar';
import SideBar from '@components/SideBar';
import { ComponentWrapper, HeaderText, Wrapper } from '@pages/ProjectInfo/styles.tsx';
import SideDetailBar from '@components/SideDetailBar';

const WorkSpaceDetail = () => {
  return (
    <>
      <HeaderBar />
      <SideBar />
      <SideDetailBar />
      <Wrapper>
        <ComponentWrapper>
          <HeaderText>Test</HeaderText>
        </ComponentWrapper>
      </Wrapper>
    </>
  );
};

export default WorkSpaceDetail;
