import axios from 'axios';

//get
const fetcher = async ({ queryKey }: { queryKey: string }) => {
  const response = await axios.get(queryKey, {
    withCredentials: true,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  return response.data;
};

export default fetcher;
