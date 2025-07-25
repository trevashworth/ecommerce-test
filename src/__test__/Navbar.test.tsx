import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '../components/NavBar';

// Mock react-router-dom Link to avoid errors
jest.mock('react-router-dom', () => ({
  Link: ({ to, children, ...rest }: any) => <a href={to} {...rest}>{children}</a>,
}));

// Mock the useAuth hook
jest.mock('../context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

const mockedUseAuth = require('../context/AuthContext').useAuth;

describe('Navbar', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shows Register and Login links when user is not logged in', () => {
    mockedUseAuth.mockReturnValue({ user: null });

    render(<Navbar />);
    expect(screen.getByText(/register/i)).toBeInTheDocument();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.queryByText(/profile/i)).toBeNull();
    expect(screen.queryByText(/logout/i)).toBeNull();
  });

  it('shows Profile and Logout links when user is logged in', () => {
    mockedUseAuth.mockReturnValue({ user: { uid: '123', email: 'test@test.com' } });

    render(<Navbar />);
    expect(screen.getByText(/profile/i)).toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
    expect(screen.queryByText(/register/i)).toBeNull();
    expect(screen.queryByText(/login/i)).toBeNull();
  });

  it('always shows Home and Cart links', () => {
    mockedUseAuth.mockReturnValue({ user: null });
    render(<Navbar />);
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/cart/i)).toBeInTheDocument();
  });
});