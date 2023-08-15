import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SprintPage from '@/pages/SprintPage';

// Mocking the Recoil hook
jest.mock('recoil', () => ({
  useRecoilValueLoadable: jest.fn(),
  useRecoilValue: jest.fn(),
  useRecoilState: jest.fn(),
}));

describe('SprintPage', () => {
  it('renders loading state', async () => {
    // Mocking the useRecoilValueLoadable hook's return value
    const mockUseRecoilValueLoadable = jest.fn(() => ({
      state: 'loading',
    }));
    const mockUseRecoilValue = jest.fn(() => ({
      state: false,
    }));
    require('recoil').useRecoilValueLoadable.mockReturnValue(mockUseRecoilValueLoadable);
    require('recoil').useRecoilValue.mockReturnValue(mockUseRecoilValue);

    const { getByTestId } = render(<SprintPage />);

    // Assert that the loading indicator is rendered
    expect(getByTestId('activity-indicator')).toBeInTheDocument();

    // You might also want to assert other parts of the component
    // depending on your specific requirements
  });

  it('renders error state', async () => {
    // Mocking the useRecoilValueLoadable hook's return value
    const mockUseRecoilValueLoadable = jest.fn(() => ({
      state: 'hasError',
    }));
    require('recoil').useRecoilValueLoadable.mockReturnValue(mockUseRecoilValueLoadable);

    const { getByText } = render(<SprintPage />);

    // Assert that the error message is rendered
    expect(getByText('데이터를 서버에서 불러올 수 없습니다.')).toBeInTheDocument();

    // You might also want to assert other parts of the component
    // depending on your specific requirements
  });

  it('renders content state', async () => {
    // Mocking the useRecoilValueLoadable hook's return value
    const mockUseRecoilValueLoadable = jest.fn(() => ({
      state: 'hasValue',
      contents: true, // or false, depending on your scenario
    }));
    require('recoil').useRecoilValueLoadable.mockReturnValue(mockUseRecoilValueLoadable);

    const { getByText } = render(<SprintPage />);

    // Assert that the header text and Sprint component are rendered
    expect(getByText('작업 관리')).toBeInTheDocument();
    // Add additional assertions based on your requirements

    // You might also want to assert other parts of the component
    // depending on your specific requirements
  });
});
