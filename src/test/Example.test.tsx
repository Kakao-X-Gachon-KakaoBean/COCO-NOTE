import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Example from '@/pages/Example';

test('불러오기 테스트페이지', () => {
  render(<Example />);
  const buttonElement = screen.getByText('버튼');
  expect(buttonElement).toBeInTheDocument();
});
