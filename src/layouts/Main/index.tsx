import HeaderBar from '@/components/HeaderBar';
import { Wrapper } from '@/styles/DetailSide/styles.tsx';
import SideBar from '@/components/SideBar';
import SideDetailBar from '@/components/SideDetailBar';
import { projectInfoMenuOpenState } from '@/states/ProjectState.ts';
import { useRecoilValueLoadable } from 'recoil';
import MDEditor from '@uiw/react-md-editor';
import 'react-toastify/dist/ReactToastify.css';
import { manual } from '@/layouts/Main/manual.tsx';
import { ActivityIndicator } from '@/components/ActivityIndicator';

const Main = () => {
  const projectInfoMenuOpen = useRecoilValueLoadable(projectInfoMenuOpenState);
  let contents = null;

  switch (projectInfoMenuOpen.state) {
    case 'hasValue':
      contents = () => {
        if (!projectInfoMenuOpen.contents) {
          return <MDEditor.Markdown source={manual} style={{ fontFamily: 'SCDream4' }} />;
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
      <Wrapper data-color-mode="light">{contents()}</Wrapper>
    </>
  );
};

export default Main;
