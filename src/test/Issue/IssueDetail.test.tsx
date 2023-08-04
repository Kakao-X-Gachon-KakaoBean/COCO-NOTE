import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import IssueDetail from '@/components/IssueDetail';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';

const queryClient = new QueryClient();

test('이슈 세부조회 페이지 불러오기', () => {
  render(
    <BrowserRouter>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <IssueDetail />
        </QueryClientProvider>
      </RecoilRoot>
    </BrowserRouter>
  );
});
