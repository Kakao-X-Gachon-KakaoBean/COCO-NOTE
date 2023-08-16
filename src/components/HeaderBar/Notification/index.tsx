import React, { useState } from 'react';
import { Dropdown, Menu, Space } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { MoreBtn } from '@/components/HeaderBar/Notification/styles.tsx';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { projectInfoMenuOpenState, SelectedProjectState } from '@/states/ProjectState.ts';
import { useQuery } from 'react-query';
import { BACKEND_URL } from '@/Api';
import fetcher from '@utils/fetcher.ts';
import { NotificationItem } from '@components/HeaderBar/Notification/type.ts';

const Notification: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const initialSelectedProject = useResetRecoilState(SelectedProjectState);
  const [, setProjectInfoMenuOpen] = useRecoilState(projectInfoMenuOpenState);
  const navigate = useNavigate();

  const { data, isLoading } = useQuery<NotificationItem[]>(['simpleNotification'], () =>
    fetcher({
      queryKey: `${BACKEND_URL}/notifications`,
    })
  );
  const handleDropdownVisibleChange = (flag: boolean) => {
    setVisible(flag);
  };

  const handleClick = () => {
    setVisible(!visible);
  };

  function waitForAnimation() {
    return new Promise(resolve => setTimeout(resolve, 550));
  }
  function handleItemClick(url: string) {
    // 여기에 원하는 기능 추가
    window.location.href = url;
  }

  return (
    <div>
      <Dropdown
        overlay={
          <Menu onClick={handleClick}>
            {!isLoading &&
              data?.map(item => (
                <Menu.Item key={item?.notificationId}>
                  <div onClick={() => handleItemClick(item?.url)}>{item?.content}</div>
                </Menu.Item>
              ))}

            <MoreBtn
              onClick={async () => {
                setVisible(false);
                initialSelectedProject();
                setProjectInfoMenuOpen(false);
                await waitForAnimation();
                navigate('/notification');
              }}
            >
              더 보기
            </MoreBtn>
          </Menu>
        }
        trigger={['click']}
        open={visible}
        onOpenChange={handleDropdownVisibleChange}
      >
        <a onClick={e => e.preventDefault()}>
          <Space>
            <BellOutlined
              style={{
                fontSize: '27px',
                cursor: 'pointer',
                color: '#00b050',
              }}
            />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};

export default Notification;
