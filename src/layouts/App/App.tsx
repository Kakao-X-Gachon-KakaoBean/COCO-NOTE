import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import '@layouts/App/App.css';
import loadable from '@loadable/component';

const Main = loadable(() => import('@layouts/Main'));
const FirstPage = loadable(() => import('@pages/FirstPage'));
const MyPage = loadable(() => import('@pages/MyPage'));
const Login = loadable(() => import('@pages/Login'));
const SignUp = loadable(() => import('@pages/SignUp'));
const ProjectInfo = loadable(() => import('@pages/ProjectInfo'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/firstpage" />} />
        <Route path="/main" element={<Main />} />
        <Route path="/firstpage" element={<FirstPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/projectinfo" element={<ProjectInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
