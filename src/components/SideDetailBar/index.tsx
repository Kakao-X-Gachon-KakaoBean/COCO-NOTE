import {
    Wrapper,
    DropdownDiv,
    HorizontalLine,
    ScrollWrapper,
    ScrollDiv
} from "@components/SideDetailBar/styles.tsx";
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import {Link} from "react-router-dom";
import {useRef} from "react";
///https://ant.design/components/list


const SideDetailBar = () => {
    const boxRef = useRef(null);
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Link to="/mypage">
                    프로젝트 정보
                </Link>
            ),
        },
        {
            key: '2',
            label: (
                <Link to="/mypage">
                    멤버 관리
                </Link>
            ),
        },
    ];
    return (
      <Wrapper>
          <DropdownDiv>
              <Dropdown menu={{ items }} trigger={['click']}>
                  <a onClick={(e) => e.preventDefault()}>
                      <Space>
                          프로젝트 명
                          <DownOutlined />
                      </Space>
                  </a>
              </Dropdown><HorizontalLine/>
          </DropdownDiv>

          <ScrollWrapper>
              <text>릴리즈 노트</text>
              <HorizontalLine />
              <ScrollDiv ref={boxRef}>
              </ScrollDiv>
          </ScrollWrapper>
          <ScrollWrapper>
              <text>작업 관리</text>
              <HorizontalLine />
              <ScrollDiv ref={boxRef}>
              </ScrollDiv>
          </ScrollWrapper>
          <ScrollWrapper>
              <text>이슈</text>
              <HorizontalLine />
              <ScrollDiv ref={boxRef}>
              </ScrollDiv>
          </ScrollWrapper>
      </Wrapper>

  );
};

export default SideDetailBar;
