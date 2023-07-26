import HeaderBar from '@components/HeaderBar';
import { Wrapper } from '@styles/DetailSide/styles.tsx';
import SideBar from '@components/SideBar';
import SideDetailBar from '@components/SideDetailBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Main = () => {
  return (
    <div>
      <HeaderBar />
      <SideBar />
      <SideDetailBar />
      <Wrapper>
        <div>프로젝트를 선택해주세요!</div>
      </Wrapper>
      <ToastContainer position="top-right" autoClose={3000} closeOnClick pauseOnFocusLoss theme="light" />
    </div>
  );
};

export default Main;
