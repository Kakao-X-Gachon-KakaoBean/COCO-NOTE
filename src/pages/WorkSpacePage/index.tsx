import HeaderBar from '@components/HeaderBar';
import SideBar from '@components/SideBar';
import SideDetailBar from '@components/SideDetailBar';
import GanttChart from '@components/GanttChart';
import { ComponentWrapper, HeaderText } from '@pages/WorkSpacePage/styles.tsx';
import { Wrapper } from '@styles/DetailSide/styles.tsx';
import { useRecoilValue } from 'recoil';
import { projectInfoMenuOpenState } from '@states/ProjectState.ts';
import { useEffect, useState } from 'react';
import { ActivityIndicator } from '@components/ActivityIndicator';

const WorkSpacePage = () => {
  const projectInfoMenuOpen = useRecoilValue(projectInfoMenuOpenState);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!projectInfoMenuOpen) {
      setIsVisible(false);
      setTimeout(() => {
        setIsVisible(true);
      }, 550);
    }
  }, [projectInfoMenuOpen]);

  return (
    <>
      <HeaderBar />
      <SideBar />
      <SideDetailBar />
      {isVisible ? (
        <Wrapper>
          <ComponentWrapper>
            <HeaderText>작업 관리</HeaderText>
            <GanttChart />
          </ComponentWrapper>
        </Wrapper>
      ) : (
        <Wrapper>
          <ActivityIndicator />
        </Wrapper>
      )}
    </>
  );
};

export default WorkSpacePage;
