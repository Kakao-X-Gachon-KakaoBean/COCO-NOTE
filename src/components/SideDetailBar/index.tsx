import {
  DropdownDiv,
  HorizontalLine,
  HorizonText,
  ScrollWrapper,
  Text,
  ViewAll,
  Wrapper,
} from '@/components/SideDetailBar/styles.tsx';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { projectInfoMenuOpenState, SelectedProjectState } from '@/states/ProjectState.ts';
import { useRecoilValue } from 'recoil';
import ReleaseNoteTree from '@/components/ReleaseNote/ReleaseNoteTree';
import ReleaseNoteExam from '@/components/ReleaseNote/ReleaseNoteExam';

const SideDetailBar = () => {
  const selectedProject = useRecoilValue(SelectedProjectState);
  const projectInfoMenuOpen = useRecoilValue(projectInfoMenuOpenState);
  const navigate = useNavigate();

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <Link to={`/projects/${selectedProject.projectId}/projectinfo`}>프로젝트 정보</Link>,
    },
    {
      key: '2',
      label: <Link to={`/projects/${selectedProject.projectId}/manage`}>멤버 관리</Link>,
    },
  ];
  return (
    <Wrapper open={projectInfoMenuOpen}>
      <DropdownDiv>
        <Dropdown menu={{ items }} trigger={['click']}>
          <a onClick={e => e.preventDefault()}>
            <Space>
              {selectedProject.projectTitle}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
        <HorizontalLine />
      </DropdownDiv>

      <ScrollWrapper>
        <HorizonText>
          <Text>릴리즈 노트</Text>
          <ViewAll
            onClick={() => {
              navigate(`/projects/${selectedProject.projectId}/releasenotes`);
            }}
          >
            전체보기
          </ViewAll>
        </HorizonText>
        <HorizontalLine />
        {selectedProject.projectTitle === '테스트 프로젝트' ? <ReleaseNoteTree /> : <ReleaseNoteExam />}
        {/*<ReleaseNoteTree />*/}
      </ScrollWrapper>
      <ScrollWrapper>
        <HorizonText>
          <Text>작업 관리</Text>
          <ViewAll
            onClick={() => {
              navigate(`/projects/${selectedProject.projectId}/workspace`);
            }}
          >
            전체보기
          </ViewAll>{' '}
        </HorizonText>
        <HorizontalLine />
      </ScrollWrapper>
      <ScrollWrapper>
        <HorizonText>
          <Text>이슈</Text>
          <ViewAll
            onClick={() => {
              navigate(`/projects/${selectedProject.projectId}/issues`);
            }}
          >
            전체보기
          </ViewAll>
        </HorizonText>
        <HorizontalLine />
      </ScrollWrapper>
    </Wrapper>
  );
};

export default SideDetailBar;
