import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import '@layouts/App/App.css';
import loadable from '@loadable/component';
import ReleaseNoteDetail from '@components/ReleaseNote/ReleaseNoteDetail';

const InitialPage = loadable(() => import('@pages/InitialPage'));
const Main = loadable(() => import('@layouts/Main'));
const ManagePage = loadable(() => import('@pages/ManagePage'));
const MyPage = loadable(() => import('@pages/MyPage'));
const Login = loadable(() => import('@pages/Login'));
const SignUp = loadable(() => import('@pages/SignUp'));
const IssuePage = loadable(() => import('@pages/IssuePage'));
const IssueDetail = loadable(() => import('@components/IssueDetail'));
const EditIssue = loadable(() => import('@components/EditIssue'));
const CreateIssue = loadable(() => import('@components/CreateIssue'));
const ProjectInfo = loadable(() => import('@pages/ProjectInfo'));
const ReleaseNotePage = loadable(() => import('@pages/ReleaseNotePage'));
const ReleaseNoteEdit = loadable(() => import('@components/ReleaseNote/ReleaseNoteEdit'));

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
        <Route path="issue">
          <Route index element={<IssuePage />} />
          <Route path=":issueId" element={<IssueDetail />} />
          <Route path=":issueId/editIssue" element={<EditIssue />} />
        </Route>
        <Route path="/issue/createissue" element={<CreateIssue />} />
        <Route path="/projectinfo" element={<ProjectInfo />} />
        <Route path="releasenote">
          <Route index element={<ReleaseNotePage />} />
          <Route path=":releaseId" element={<ReleaseNoteDetail />} />
          <Route path=":releaseId/edit" element={<ReleaseNoteEdit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
