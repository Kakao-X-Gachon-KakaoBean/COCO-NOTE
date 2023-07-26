import HeaderBar from '@components/HeaderBar';
import { Wrapper } from '@styles/DetailSide/styles.tsx';
import SideBar from '@components/SideBar';
import SideDetailBar from '@components/SideDetailBar';
import { ToastContainer } from 'react-toastify';
import MDEditor from '@uiw/react-md-editor';
import 'react-toastify/dist/ReactToastify.css';
import { manual } from '@layouts/Main/manual.tsx';
import { ActivityIndicator } from '@components/ActivityIndicator';
import { useRecoilValue } from 'recoil';
import { projectInfoMenuOpenState } from '@states/ProjectState.ts';
import { useEffect, useState } from 'react';

const Main = () => {
  const projectInfoMenuOpen = useRecoilValue(projectInfoMenuOpenState);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (projectInfoMenuOpen) {
      setIsVisible(false);
      setTimeout(() => {
        setIsVisible(true);
      }, 550);
    }
  }, [projectInfoMenuOpen]);

  return (
    <div>
      <HeaderBar />
      <SideBar />
      <SideDetailBar />
      {isVisible ? (
        <Wrapper>
          <MDEditor.Markdown source={manual} style={{ fontFamily: 'SCDream4' }} />
        </Wrapper>
      ) : (
        <Wrapper>
          <ActivityIndicator />
        </Wrapper>
      )}
      <ToastContainer position="top-right" autoClose={3000} closeOnClick pauseOnFocusLoss theme="light" />
    </div>
  );
};

export default Main;
