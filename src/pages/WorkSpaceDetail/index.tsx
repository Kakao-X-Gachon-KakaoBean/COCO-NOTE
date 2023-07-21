import HeaderBar from '@components/HeaderBar';
import SideBar from '@components/SideBar';
import { ComponentText, ComponentWrapper, Wrapper } from '@pages/ProjectInfo/styles.tsx';
import SideDetailBar from '@components/SideDetailBar';

const WorkSpaceDetail = () => {
  return (
    <>
      <HeaderBar />
      <SideBar />
      <SideDetailBar />
      <Wrapper>
        <ComponentWrapper>
          <ComponentText>Test</ComponentText>
        </ComponentWrapper>
      </Wrapper>
    </>
  );
};

export default WorkSpaceDetail;
