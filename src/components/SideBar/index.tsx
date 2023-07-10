import { Circle, HorizontalLine, InnerText, Wrapper } from '@components/SideBar/styles.tsx';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { AddProjectClickState, projectValueState, SelectedProjectState } from '@states/ProjectState.ts';
import { Tooltip } from 'antd';

const SideBar = () => {
  const projectList = useRecoilValue(projectValueState);
  const [, setIsAddProject] = useRecoilState(AddProjectClickState);
  const [selectedProject, setSelectedProject] = useRecoilState(SelectedProjectState);
  const initialSelectedProject = useResetRecoilState(SelectedProjectState);

  return (
    <Wrapper>
      {projectList.map((project, projectIndex) => (
        <div key={project.projectId}>
          {projectIndex === 0 ? (
            <>
              <Tooltip placement={'right'} title={'메인으로'}>
                <Circle
                  className={selectedProject.projectId === 0 ? 'selected' : 'notSelected'}
                  onClick={() => {
                    initialSelectedProject();
                  }}
                >
                  <InnerText>메인으로</InnerText>
                </Circle>
              </Tooltip>
            </>
          ) : (
            <Tooltip placement={'right'} title={project.projectTitle} key={project.projectId}>
              <Circle
                className={selectedProject === project ? 'selected' : 'notSelected'}
                onClick={() => {
                  setSelectedProject(project);
                }}
              >
                <InnerText>{project.projectTitle}</InnerText>
              </Circle>
            </Tooltip>
          )}
          {projectIndex === 0 && <HorizontalLine />}
        </div>
      ))}
      <Circle onClick={() => setIsAddProject(true)}>
        <InnerText style={{ fontSize: '2rem' }}>+</InnerText>
      </Circle>
    </Wrapper>
  );
};

export default SideBar;
