import { render, screen } from '@testing-library/react';
import Sprint from '@/components/Sprint';

// const mockedNavigation = jest.fn();
//
// jest.mock('@react-navigation/native', () => {
//   return {
//     useNavigation: () => ({
//       navigate: mockedNavigation,
//     }),
//   };
// });

describe('Sprint Component', () => {
  beforeEach(() => {
    //mockedNavigation.mockClear();
  });

  it('renders without crashing', () => {
    render(<Sprint />);
    // You might add more specific assertions here
  });

  it('renders the "스프린트 추가하기" button', () => {
    render(<Sprint />);
    const addButton = screen.getByText('스프린트 추가하기');
    expect(addButton).toBeInTheDocument();
  });

  it('renders rows with appropriate data', () => {
    // You might need to mock RecoilState values and useQuery here
    // to simulate different scenarios and test different data.
    // Then render the Sprint component and assert the rendered data.
  });

  it('handles row drag and drop', () => {
    // You might need to use testing utilities like userEvent
    // to simulate drag and drop interactions and assert the results.
  });

  it('navigates to sprint/task details when clicked', () => {
    // You might need to mock the useNavigate hook and render the component
    // to simulate clicking on a row and asserting the navigation behavior.
  });

  it('opens "할일 추가" form when the button is clicked', () => {
    // You might need to mock RecoilState values and render the component
    // to simulate clicking on the button and asserting the form's presence.
  });

  // Add more specific test cases based on the behavior of your component
});
