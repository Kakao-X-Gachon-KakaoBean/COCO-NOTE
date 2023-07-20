import HeaderBar from '@components/HeaderBar';
import SideBar from '@components/SideBar';
import { ComponentWrapper, Text, Wrapper } from '@pages/ProjectInfo/styles.tsx';
import SideDetailBar from '@components/SideDetailBar';
import GanttChart from '@components/GanttChart';

const ProjectInfo = () => {
  return (
    <>
      <HeaderBar />
      <SideBar />
      <SideDetailBar />
      <Wrapper>
        <ComponentWrapper>
          <Text>작업 관리</Text>
          <GanttChart />
        </ComponentWrapper>
      </Wrapper>
    </>
  );
};

export default ProjectInfo;
