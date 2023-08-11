import axios from 'axios';

const pagedFetcher = async ({ queryKey }: { queryKey: [string, number] }) => {
  const [url, page] = queryKey;

  const response = await axios.get(`${url}&page=${page}`, {
    withCredentials: true,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  return response.data;
};

export default pagedFetcher;
