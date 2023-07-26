import HeaderBar from '@components/HeaderBar';
import { Wrapper } from '@styles/DetailSide/styles.tsx';
import SideBar from '@components/SideBar';
import SideDetailBar from '@components/SideDetailBar';
import {
  AddProjectClickState,
  projectInfoMenuOpenState,
  projectValueState,
  SelectedProjectState,
} from '@states/ProjectState.ts';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Input, Modal } from 'antd';
import MDEditor from '@uiw/react-md-editor';
import { useEffect, useState } from 'react';
import { IProjectValue } from '@layouts/Main/type.ts';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { manual } from '@layouts/Main/manual.tsx';
import { ActivityIndicator } from '@components/ActivityIndicator';
import projectInfo from '@pages/ProjectInfo';

const Main = () => {
  const [projectList, setProjectList] = useRecoilState(projectValueState);
  const [isAddProject, setIsAddProject] = useRecoilState(AddProjectClickState);
  const [, setSelectedProject] = useRecoilState(SelectedProjectState);
  const projectInfoMenuOpen = useRecoilValue(projectInfoMenuOpenState);
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const { TextArea } = Input;
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (projectInfoMenuOpen) {
      setIsVisible(false);
      setTimeout(() => {
        setIsVisible(true);
      }, 550);
    }
  }, [projectInfoMenuOpen]);

  const handleOk = () => {
    if (title && contents) {
      addProject();
      setIsAddProject(false);
      setTitle('');
      setContents('');
      toast.success('프로젝트가 생성 되었습니다.'); // toast.success로 성공 메시지 표시
    } else {
      toast.error('프로젝트 명과 프로젝트 설명을 정확히 입력해주세요'); // toast.error로 실패 메시지 표시
    }
  };

  const handleCancel = () => {
    setTitle('');
    setContents('');
    setIsAddProject(false);
  };

  const addProject = () => {
    const newProject: IProjectValue = {
      projectId: projectList.length + 1,
      projectTitle: title,
      projectContent: contents,
    };
    setProjectList(prevProjectList => [...prevProjectList, newProject]);
    setSelectedProject(newProject);
  };

  return (
    <div>
      <HeaderBar />
      <SideBar />
      <SideDetailBar />
      {isVisible ? (
        <Wrapper>
          <Modal title="새 프로젝트 생성" open={isAddProject} onOk={handleOk} onCancel={handleCancel}>
            <TextArea
              value={title}
              autoSize={{ minRows: 1, maxRows: 10 }}
              onChange={e => setTitle(e.target.value)}
              placeholder="프로젝트 명"
              style={{ marginBottom: '2rem', marginTop: '3rem' }}
            />
            <TextArea
              value={contents}
              autoSize={{ minRows: 3, maxRows: 10 }}
              onChange={e => setContents(e.target.value)}
              placeholder="프로젝트 설명"
              style={{ marginBottom: '2rem' }}
            />
          </Modal>
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
