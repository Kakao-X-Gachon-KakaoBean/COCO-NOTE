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
import { Img } from '@layouts/Main/styles.tsx';
import logoImg from '../../images/logoImage.png';

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
          <Img src={logoImg} alt="Google" />
          <div data-color-mode="light">
            <MDEditor.Markdown source={manual} style={{ fontFamily: 'SCDream4' }} />
          </div>
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
