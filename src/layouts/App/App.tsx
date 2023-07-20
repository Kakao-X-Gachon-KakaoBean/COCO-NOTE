import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import '@layouts/App/App.css';
import loadable from '@loadable/component';

const InitialPage = loadable(() => import('@pages/InitialPage'));
const Main = loadable(() => import('@layouts/Main'));
const ManagePage = loadable(() => import('@pages/ManagePage'));
const MyPage = loadable(() => import('@pages/MyPage'));
const Login = loadable(() => import('@pages/Login'));
const SignUp = loadable(() => import('@pages/SignUp'));
const ProjectInfo = loadable(() => import('@pages/ProjectInfo'));
const TimeLine = loadable(() => import('@pages/TimeLine'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/initial" />} />
        <Route path="/main" element={<Main />} />
        <Route path="/initial" element={<InitialPage />} />
        <Route path="/manage" element={<ManagePage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/projectinfo" element={<ProjectInfo />} />
        <Route path="/Timeline" element={<TimeLine />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
