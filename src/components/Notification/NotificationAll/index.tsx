import { useInfiniteQuery } from 'react-query';
import axios from 'axios';
import { NotificationItem } from '@components/Notification/SimpleNotification/type.ts';
import { BACKEND_URL } from '@/Api';

function useNotifications() {
  return useInfiniteQuery<NotificationItem[]>(
    'notifications',
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
  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } = useNotifications();

  if (error) {
    return <div>에러 발생</div>;
  }

  return (
    <div>
      {data?.pages.map((page, index) => (
        <div key={index}>
          {page.map(notification => (
            <div key={notification.notificationId}>{notification.content}</div>
          ))}
        </div>
      ))}

      <button onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
        {isFetchingNextPage ? '불러오는 중입니다.' : hasNextPage ? '더 보기' : '더 이상 데이터 없음'}
      </button>

      <div>{isFetching && !isFetchingNextPage ? '불러오는 중입니다...' : null}</div>
    </div>
  );
};

export default NotificationAll;
