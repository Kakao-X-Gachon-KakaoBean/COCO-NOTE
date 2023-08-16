import { useState } from 'react';
import { Dropdown, Menu, Space } from 'antd';
import { MenuDiv, MoreBtn } from '@components/Notification/SimpleNotification/styles.tsx';
import { BellOutlined } from '@ant-design/icons';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { projectInfoMenuOpenState, SelectedProjectState } from '@states/ProjectState.ts';
import { NotificationItem } from '@components/Notification/SimpleNotification/type.ts';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import fetcher from '@utils/fetcher.ts';
import { BACKEND_URL } from '@/Api';
import { AxiosError } from 'axios/index';
import { modifyNotificationStatus } from '@/Api/Notification/Notification.ts';

const SimpleNotification = () => {
  const [visible, setVisible] = useState(false);
  const initialSelectedProject = useResetRecoilState(SelectedProjectState);
  const [, setProjectInfoMenuOpen] = useRecoilState(projectInfoMenuOpenState);
  const [simpleNotifications, setSimpleNotifications] = useState<NotificationItem[]>();
  const navigate = useNavigate();

  const { isLoading } = useQuery<NotificationItem[]>(
    ['simpleNotification'],
    () =>
      fetcher({
        queryKey: `${BACKEND_URL}/notifications`,
      }),
    {
      onSuccess: data => {
        setSimpleNotifications(data);
      },
    }
  );
  const ModifyNotificationStatusMutation = useMutation<string, AxiosError, { notificationId: string; url: string }>(
    modifyNotificationStatus,
    {
      onSuccess: redirectUrl => {
        navigate(redirectUrl);
      },
    }
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
  function handleItemClick(url: string, notificationId: number) {
    ModifyNotificationStatusMutation.mutate({ notificationId: notificationId.toString(), url });
    simpleNotifications?.map(item => {
      if (item.notificationId === notificationId) {
        item.hasRead = true;
      }
    });
  }
  return (
    <Dropdown
      overlay={
        <Menu onClick={handleClick}>
          {!isLoading &&
            simpleNotifications?.map(item => (
              <Menu.Item key={item?.notificationId}>
                <MenuDiv hasRead={item?.hasRead} onClick={() => handleItemClick(item?.url, item?.notificationId)}>
                  {item?.content}
                </MenuDiv>
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
  );
};

export default SimpleNotification;
