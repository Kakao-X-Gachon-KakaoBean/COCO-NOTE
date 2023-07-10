import { Circle, HorizontalLine, Wrapper } from '@components/SideBar/styles.tsx';
import { useRecoilState, useRecoilValue } from 'recoil';
import { AddProjectClickState, projectValueState, SelectedProjectState } from '@states/ProjectState.ts';
import { Tooltip } from 'antd';

const SideBar = () => {
  const projectList = useRecoilValue(projectValueState);
  const [, setIsAddProject] = useRecoilState(AddProjectClickState);
  const [selectedProject, setSelectedProject] = useRecoilState(SelectedProjectState);

  return (
    <Wrapper>
      <Circle
        className={selectedProject === 0 ? 'selected' : 'notSelected'}
        onClick={() => {
          setSelectedProject(0);
        }}
      >
        <text>메인으로</text>
      </Circle>
      <HorizontalLine />
      {projectList.map(project => (
        <Tooltip placement={'right'} title={project.projectTitle} key={project.projectId}>
          <Circle
            className={selectedProject === project.projectId ? 'selected' : 'notSelected'}
            onClick={() => {
              setSelectedProject(project.projectId);
            }}
          >
            <text>{project.projectTitle}</text>
          </Circle>
        </Tooltip>
      ))}
      <Circle onClick={() => setIsAddProject(true)}>
        <text style={{ fontSize: '2rem' }}>+</text>
      </Circle>
    </Wrapper>
  );
};

export default SideBar;
