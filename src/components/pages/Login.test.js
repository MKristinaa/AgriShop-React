import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login'; 
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';



jest.mock('../../actions/userActions', () => ({
  login: jest.fn(() => Promise.resolve({ success: true })),
}));

describe('Login component', () => {
  test('renderuje inpute i dugme', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText('EMAIL');
    const passwordInput = screen.getByPlaceholderText('PASSWORD');
    const loginButton = screen.getByRole('button', { name: /login/i }); 

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  test('poziva login kada se submituje forma', async () => {
    const { login } = require('../../actions/userActions');

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('EMAIL'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('PASSWORD'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i })); 

    expect(await login).toHaveBeenCalledWith('test@example.com', 'password123');
  });
});
