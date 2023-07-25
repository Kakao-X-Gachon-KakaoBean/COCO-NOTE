import HeaderBar from '@components/HeaderBar';
import SideBar from '@components/SideBar';
import SideDetailBar from '@components/SideDetailBar';
import GanttChart from '@components/GanttChart';
import { ComponentWrapper, HeaderText, Wrapper } from '@pages/WorkSpacePage/styles.tsx';

const WorkSpacePage = () => {
  return (
    <>
      <HeaderBar />
      <SideBar />
      <SideDetailBar />
      <Wrapper>
        <ComponentWrapper>
          <HeaderText>작업 관리</HeaderText>
          <GanttChart />
        </ComponentWrapper>
      </Wrapper>
    </>
  );
};

export default WorkSpacePage;
