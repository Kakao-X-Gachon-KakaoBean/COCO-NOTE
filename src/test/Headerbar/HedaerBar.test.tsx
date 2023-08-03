import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeaderBar from '@/components/HeaderBar/index.tsx';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';

describe('헤더바 페이지 불러오기', () => {
  test('화면에 COCONOTE가 보인다.', () => {
    render(
      <BrowserRouter>
        <RecoilRoot>
          <HeaderBar />
        </RecoilRoot>
      </BrowserRouter>
    );

    const titleElement = screen.getByText(/COCONOTE/i);
    expect(titleElement).toBeInTheDocument();
  });
});
