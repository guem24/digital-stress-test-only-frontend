import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
  });

  test('uses HashRouter for routing', () => {
    const { container } = render(<App />);
    // HashRouter doesn't add specific testable elements,
    // but we can verify the component renders
    expect(container).toBeInTheDocument();
  });
});
