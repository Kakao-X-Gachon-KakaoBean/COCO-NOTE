import HeaderBar from '@components/HeaderBar';
import SideBar from '@components/SideBar';
import { ComponentText, ComponentWrapper } from '@pages/ProjectInfo/styles.tsx';

import SideDetailBar from '@components/SideDetailBar';
import { Wrapper } from '@styles/DetailSide/styles.tsx';
import { ActivityIndicator } from '@components/ActivityIndicator';
import { useRecoilValueLoadable } from 'recoil';
import { projectInfoMenuOpenState } from '@states/ProjectState.ts';

const SprintDetailPage = () => {
  const projectInfoMenuOpen = useRecoilValueLoadable(projectInfoMenuOpenState);

  let contents = null;

  switch (projectInfoMenuOpen.state) {
    case 'hasValue':
      contents = () => {
        if (projectInfoMenuOpen.contents) {
          return (
            <ComponentWrapper>
              <ComponentText>Test</ComponentText>
            </ComponentWrapper>
          );
        } else {
          return <ActivityIndicator />;
        }
      };
      break;
    case 'hasError':
      contents = () => {
        return <div>데이터를 서버에서 불러올 수 없습니다.</div>;
      };
      break;
    case 'loading':
      contents = () => {
        return <ActivityIndicator />;
      };
      break;
    default:
      contents = () => {
        return <div>에러가 발생했습니다. 페이지를 새로고침해주세요.</div>;
      };
  }

  return (
    <>
      <HeaderBar />
      <SideBar />
      <SideDetailBar />
      <Wrapper>{contents()}</Wrapper>
    </>
  );
};

export default SprintDetailPage;
