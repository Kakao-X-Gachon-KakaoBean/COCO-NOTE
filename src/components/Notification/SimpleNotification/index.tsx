import { useState } from 'react';
import { Dropdown, Menu, Space } from 'antd';
import { MenuDiv, MoreBtn, NoAlarmDiv } from '@/components/Notification/SimpleNotification/styles.tsx';
import { BellOutlined } from '@ant-design/icons';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { projectInfoMenuOpenState, SelectedProjectState } from '@/states/ProjectState.ts';
import { NotificationItem } from '@/types/SimpleNotificationType.ts';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import fetcher from '@/utils/fetcher.ts';
import { BACKEND_URL } from '@/api';
import { AxiosError } from 'axios';
import { modifyNotificationStatus } from '@/api/Notification/Notification.ts';
import { waitForAnimation } from '@/hooks/waitForAnimation.ts';

const SimpleNotification = () => {
  const [visible, setVisible] = useState(false);
  const initialSelectedProject = useResetRecoilState(SelectedProjectState);
  const [state, setState] = useRecoilState(projectInfoMenuOpenState);
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
        if (!state) {
          setState(true);
        }
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
          {simpleNotifications && simpleNotifications.length === 0 ? (
            <NoAlarmDiv>알림이 없습니다</NoAlarmDiv>
          ) : (
            simpleNotifications?.map(item => (
              <Menu.Item key={item?.notificationId}>
                <MenuDiv hasRead={item?.hasRead} onClick={() => handleItemClick(item?.url, item?.notificationId)}>
                  {item?.content}
                </MenuDiv>
              </Menu.Item>
            ))
          )}

          <MoreBtn
            onClick={async () => {
              setVisible(false);
              initialSelectedProject();
              setState(false);
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
