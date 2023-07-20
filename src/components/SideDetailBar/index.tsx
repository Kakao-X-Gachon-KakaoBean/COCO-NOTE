import {
  DropdownDiv,
  HorizontalLine,
  HorizonText,
  ScrollWrapper,
  Text,
  ViewAll,
  Wrapper,
} from '@components/SideDetailBar/styles.tsx';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { Link } from 'react-router-dom';
import { SelectedProjectState } from '@states/ProjectState.ts';
import { useRecoilValue } from 'recoil';

const SideDetailBar = () => {
  const selectedProject = useRecoilValue(SelectedProjectState);

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <Link to="/projectinfo">프로젝트 정보</Link>,
    },
    {
      key: '2',
      label: <Link to="/mypage">멤버 관리</Link>,
    },
  ];
  return (
    <Wrapper>
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
          <ViewAll>전체보기</ViewAll>
        </HorizonText>
        <HorizontalLine />
      </ScrollWrapper>
      <ScrollWrapper>
        <Link to="/timeline" style={{ textDecoration: 'none' }}>
          <HorizonText>
            <Text>작업 관리</Text>
            <ViewAll>전체보기</ViewAll>{' '}
          </HorizonText>
        </Link>
        <HorizontalLine />
      </ScrollWrapper>
      <ScrollWrapper>
        <HorizonText>
          <Text>이슈</Text>
          <ViewAll>전체보기</ViewAll>
        </HorizonText>
        <HorizontalLine />
      </ScrollWrapper>
    </Wrapper>
  );
};

export default SideDetailBar;
