import { AddCircle, Circle, InnerText, LogoImage, Wrapper } from '@/components/SideBar/styles.tsx';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { AddProjectClickState, projectInfoMenuOpenState, SelectedProjectState } from '@/states/ProjectState.ts';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'antd';
import { useQuery } from 'react-query';
import fetcher from '@utils/fetcher.ts';
import { IProjectValue } from '@layouts/Main/type.ts';
import { BACKEND_URL } from '@/Api';
import logoImage from '@/images/logoImage.png';

const SideBar = () => {
  const navigate = useNavigate();
  const [, setIsAddProject] = useRecoilState(AddProjectClickState);
  const [selectedProject, setSelectedProject] = useRecoilState(SelectedProjectState);
  const initialSelectedProject = useResetRecoilState(SelectedProjectState);
  const [, setProjectInfoMenuOpen] = useRecoilState(projectInfoMenuOpenState);

  const { isLoading, data } = useQuery<IProjectValue[]>(['projectList'], () =>
    fetcher({
      queryKey: `${BACKEND_URL}/projects`,
    })
  );

  function waitForAnimation() {
    return new Promise(resolve => setTimeout(resolve, 550));
  }

  return (
    <Wrapper>
      {!isLoading && data && (
        <div>
          <Tooltip placement={'right'} title={'메인으로'}>
            <LogoImage
              src={logoImage}
              className={selectedProject.projectId === 0 ? 'selected' : 'notSelected'}
              onClick={async () => {
                initialSelectedProject();
                setProjectInfoMenuOpen(false);
                await waitForAnimation();
                navigate('/main');
              }}
              alt={'logoImage'}
            ></LogoImage>
          </Tooltip>
          {data.map(project => (
            <div key={project.projectId}>
              <Tooltip placement={'right'} title={project.projectTitle}>
                <Circle
                  className={selectedProject.projectId === project.projectId ? 'selected' : 'notSelected'}
                  onClick={async () => {
                    setSelectedProject(project);
                    setProjectInfoMenuOpen(true);
                    await waitForAnimation();
                    navigate(`/projects/${project.projectId}/projectinfo`);
                  }}
                >
                  <InnerText>{project.projectTitle}</InnerText>
                </Circle>
              </Tooltip>
            </div>
          ))}
        </div>
      )}

      <AddCircle onClick={() => setIsAddProject(true)}>
        <InnerText style={{ fontSize: '2rem' }}>+</InnerText>
      </AddCircle>
    </Wrapper>
  );
};

export default SideBar;
