import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
import axios, { AxiosError } from 'axios';
import { NotificationItem } from '@type/SimpleNotificationType.ts';
import { BACKEND_URL } from '@api';
import {
  Content,
  Date,
  MoreBtn,
  Notification,
  NotificationList,
  NotificationTitle,
  ProjectContent,
  ProjectName,
} from '@components/Notification/NotificationAll/styles.tsx';
import { Button, Menu } from 'antd';
import { ActivityIndicator } from '@components/ActivityIndicator';
import convertDate from '@components/ReleaseNote/ConvertDate';
import { useEffect, useState } from 'react';
import { modifyNotificationStatus } from '@api/Notification/Notification.ts';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { projectInfoMenuOpenState } from '@states/ProjectState.ts';

function useNotifications() {
  return useInfiniteQuery<NotificationItem[]>(
    ['notifications'],
    async ({ pageParam = null }) => {
      const { data } = await axios.get(`${BACKEND_URL}/notifications/page`, {
        params: {
          lastNotificationId: pageParam,
        },
        withCredentials: true,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      return data;
    },
    {
      getNextPageParam: lastPage => {
        // 마지막 페이지의 마지막 아이템을 가져옵니다.
        const lastItem = lastPage[lastPage.length - 1];
        return lastItem ? lastItem.notificationId : null;
      },
    }
  );
}

const NotificationAll = () => {
  const navigate = useNavigate();
  const [state, setState] = useRecoilState(projectInfoMenuOpenState);
  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } = useNotifications();
  const [notifications, setNotifications] = useState<NotificationItem[][]>();

  const regex = /\[\s*(.*?)\s*\](.*)/;

  useEffect(() => {
    if (data) {
      setNotifications(data.pages);
    }
  }, [data]);

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

  function handleItemClick(url: string, notificationId: number) {
    ModifyNotificationStatusMutation.mutate({ notificationId: notificationId.toString(), url });
    notifications?.map(item => {
      item.map(value => {
        if (value.notificationId === notificationId) {
          value.hasRead = true;
        }
      });
    });
  }

  if (error) {
    return <div>에러 발생</div>;
  }

  return (
    <>
      <NotificationList>
        <NotificationTitle>
          <div>알림 목록</div>
        </NotificationTitle>
        {data?.pages.map((page, index) => (
          <div key={index}>
            {page.map(notification => {
              const match = notification.content.match(regex);
              return (
                <Menu key={notification.notificationId}>
                  <Menu.Item>
                    <Notification
                      hasRead={notification.hasRead}
                      onClick={() => handleItemClick(notification.url, notification.notificationId)}
                    >
                      <ProjectContent>
                        <ProjectName>{match && match[1]}</ProjectName>
                        <Content>{match && match[2].trim()}</Content>
                      </ProjectContent>
                      <Date>{convertDate(notification.createdAt)}</Date>
                    </Notification>
                  </Menu.Item>
                </Menu>
              );
            })}
          </div>
        ))}
        <MoreBtn>{hasNextPage ? <Button onClick={() => fetchNextPage()}>더 보기</Button> : <></>}</MoreBtn>
        {isFetching && !isFetchingNextPage ? <ActivityIndicator /> : <></>}
      </NotificationList>
    </>
  );
};

export default NotificationAll;
