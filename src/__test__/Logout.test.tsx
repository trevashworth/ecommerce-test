// Logout.test.tsx

import { render, screen } from '@testing-library/react';
import Logout from '../components/Logout';
import '@testing-library/jest-dom';// Mock the signOut function from firebase/auth
jest.mock('firebase/auth', () => ({
  signOut: jest.fn(),
  // If auth is a default export or named, mock it as well
  getAuth: jest.fn(() => ({})),
}));
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(() => ({})),
})
)


describe('Logout component', () => {
  it('renders "Logout" text', () => {
    render(<Logout />);
    expect(screen.getByText(/User Logged Out/i)).toBeInTheDocument();
  });

  it('calls signOut on mount', () => {
    const { signOut } = require('firebase/auth');
    render(<Logout />);
    expect(signOut).toHaveBeenCalled();
  });
});
