import HeaderBar from '@components/HeaderBar';
import SideBar from '@components/SideBar';
import { ComponentText, ComponentWrapper } from '@pages/ProjectInfo/styles.tsx';

import SideDetailBar from '@components/SideDetailBar';
import { Wrapper } from '@styles/DetailSide/styles.tsx';
import { ActivityIndicator } from '@components/ActivityIndicator';
import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { projectInfoMenuOpenState } from '@states/ProjectState.ts';

const WorkSpaceDetail = () => {
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
            <ComponentText>Test</ComponentText>
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

export default WorkSpaceDetail;
