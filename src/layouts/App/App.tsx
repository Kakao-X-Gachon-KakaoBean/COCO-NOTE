import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import '@layouts/App/App.css';
import loadable from '@loadable/component';
import AddProject from '@/components/AddProject';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRecoilValue } from 'recoil';
import { memberIdState } from '@/states/userState.ts';
import { Client } from '@stomp/stompjs';

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
const SingleManuscript = loadable(() => import('@components/ReleaseNote/ReleaseNoteDetail/SingleManuscript'));
const SingleReleaseNote = loadable(() => import('@components/ReleaseNote/ReleaseNoteDetail/SingleReleaseNote'));
const SprintPage = loadable(() => import('@pages/SprintPage'));
const SprintDetailPage = loadable(() => import('@pages/SprintDetailPage'));
const TaskDetailPage = loadable(() => import('@pages/TaskDetailPage'));
const SprintEditPage = loadable(() => import('@pages/SprintEditPage'));
const TaskEditPage = loadable(() => import('@pages/TaskEditPage'));
const ReleaseNoteEdit = loadable(() => import('@components/ReleaseNote/ReleaseNoteEdit'));
const InvitationPage = loadable(() => import('@pages/InvitationPage'));
const NotificationPage = loadable(() => import('@pages/NotificationPage'));

function App() {
  const memberId = useRecoilValue(memberIdState);
  if (memberId !== '') {
    const client = new Client({
      brokerURL: 'ws://localhost:15674/ws',
      onConnect: () => {
        client.subscribe(`/queue/user-${memberId}`, message => {
          toast.info(`Received: ${message.body}`);
        });
      },
    });
    client.activate();
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/initial" />} />
          <Route path="/main" element={<Main />} />
          <Route path="/initial" element={<InitialPage />} />
          <Route path="/notification" element={<NotificationPage />} />
          <Route path={'/projects/:projectId/manage'} element={<ManagePage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/projects/:projectId/issues/*">
            <Route index element={<IssuePage />} />
            <Route path="createIssue" element={<CreateIssue />} />
            <Route path=":issueId" element={<IssueDetail />} />
            <Route path=":issueId/editIssue" element={<EditIssue />} />
          </Route>
          <Route path="/projects/:projectId/projectinfo" element={<ProjectInfo />} />
          <Route path="/projects/:projectId/release-notes/*">
            <Route index element={<ReleaseNotePage />} />
            <Route path=":releaseId" element={<SingleReleaseNote />} />
          </Route>
          <Route path="/projects/:projectId/manuscripts/*">
            <Route path=":releaseId" element={<SingleManuscript />} />
            <Route path=":releaseId/edit" element={<ReleaseNoteEdit />} />
          </Route>
          <Route path="/projects/:projectId/sprints/*">
            <Route index element={<SprintPage />} />
            <Route path=":sprintId" element={<SprintDetailPage />} />
            <Route path="tasks/:taskId" element={<TaskDetailPage />} />
            <Route path=":sprintId/edit" element={<SprintEditPage />} />
            <Route path="tasks/:taskId/edit" element={<TaskEditPage />} />
          </Route>
          <Route path="/invitations/*">
            <Route index element={<InvitationPage />} />
            <Route path=":projectkey" element={<InvitationPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <AddProject />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
