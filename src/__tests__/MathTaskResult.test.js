import React from 'react';
import { render, screen } from '@testing-library/react';
import MathTaskResult from '../pages/MathTaskResult';

describe('MathTaskResult Component', () => {
  const mockProps = {
    mathTaskScore: 48,
    handleNext: jest.fn(),
    handleCancelDialog: jest.fn(),
  };

  test('renders score correctly', () => {
    render(<MathTaskResult {...mockProps} />);
    expect(screen.getByText(/48%/)).toBeInTheDocument();
  });

  test('shows "below average" when score is less than 75', () => {
    render(<MathTaskResult {...mockProps} />);
    // The component should show "unter dem Durchschnitt" (below average)
    // when score (48%) is less than average (75%)
    const text = screen.getByText(/27%/);
    expect(text).toBeInTheDocument();
  });

  test('shows "above average" when score is greater than 75', () => {
    const highScoreProps = {
      ...mockProps,
      mathTaskScore: 90,
    };
    render(<MathTaskResult {...highScoreProps} />);
    // Should show 15% above average
    expect(screen.getByText(/15%/)).toBeInTheDocument();
  });

  test('shows exactly average when score is 75', () => {
    const avgScoreProps = {
      ...mockProps,
      mathTaskScore: 75,
    };
    render(<MathTaskResult {...avgScoreProps} />);
    expect(screen.getByText(/75%/)).toBeInTheDocument();
  });
});
