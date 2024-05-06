import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../src/App';

test('renders app component', () => {
  render(<App />);
  const linkElement = screen.getByText(/Create Your ToDo's/i);
  expect(linkElement).toBeInTheDocument();
});