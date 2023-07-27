import { AddCircle, Circle, InnerText, Wrapper } from '@components/SideBar/styles.tsx';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import {
  AddProjectClickState,
  projectInfoMenuOpenState,
  projectValueState,
  SelectedProjectState,
} from '@states/ProjectState.ts';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'antd';

const SideBar = () => {
  const navigate = useNavigate();
  const projectList = useRecoilValue(projectValueState);
  const [, setIsAddProject] = useRecoilState(AddProjectClickState);
  const [selectedProject, setSelectedProject] = useRecoilState(SelectedProjectState);
  const initialSelectedProject = useResetRecoilState(SelectedProjectState);
  const [, setProjectInfoMenuOpen] = useRecoilState(projectInfoMenuOpenState);
  function waitForAnimation() {
    return new Promise(resolve => setTimeout(resolve, 550)); // 300ms는 애니메이션 시간에 따라 조정하세요.
  }
  return (
    <Wrapper>
      {projectList.map((project, projectIndex) => (
        <div key={project.projectId}>
          {projectIndex === 0 ? (
            <Tooltip placement={'right'} title={'메인으로'}>
              <Circle
                className={selectedProject.projectId === 0 ? 'selected' : 'notSelected'}
                onClick={async () => {
                  initialSelectedProject();
                  setProjectInfoMenuOpen(false);
                  await waitForAnimation();
                  navigate('/main');
                }}
              >
                <InnerText>메인으로</InnerText>
              </Circle>
            </Tooltip>
          ) : (
            <Tooltip placement={'right'} title={project.projectTitle} key={project.projectId}>
              <Circle
                className={selectedProject === project ? 'selected' : 'notSelected'}
                onClick={async () => {
                  setSelectedProject(project);
                  setProjectInfoMenuOpen(true);
                  await waitForAnimation();
                  navigate(`/project/${project.projectId}/projectinfo`);
                }}
              >
                <InnerText>{project.projectTitle}</InnerText>
              </Circle>
            </Tooltip>
          )}
        </div>
      ))}
      <AddCircle onClick={() => setIsAddProject(true)}>
        <InnerText style={{ fontSize: '2rem' }}>+</InnerText>
      </AddCircle>
    </Wrapper>
  );
};

export default SideBar;
