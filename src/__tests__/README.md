# Test Suite

This directory contains unit and integration tests for the Digital Stress Test application.

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run a specific test file
npm test -- MathTaskResult.test.js
```

## Test Files

### App.test.js
Tests the main App component and routing setup.

### Introduction.test.js
Tests the Introduction page component, including:
- Rendering of introduction slides
- Navigation through info pages
- Calibration slide display

### MathTaskResult.test.js
Tests the Math Task Results display, including:
- Score display
- Above/below average comparison logic
- Percentage calculations

### EndPage.test.js
Tests the final completion page, including:
- Data upload trigger
- Loading spinner display
- Completion message display

### utils.test.js
Tests utility functions like `calculateHeightInPx`.

## Writing New Tests

When adding new components, follow this structure:

```javascript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import YourComponent from '../path/to/YourComponent';

describe('YourComponent', () => {
  const mockProps = {
    // Define mock props here
  };

  test('description of what you are testing', () => {
    render(<YourComponent {...mockProps} />);
    // Your assertions here
  });
});
```

## Best Practices

1. **Isolate tests**: Each test should be independent
2. **Mock external dependencies**: Use jest.fn() for functions
3. **Test user interactions**: Use fireEvent for button clicks, etc.
4. **Test edge cases**: Not just the happy path
5. **Keep tests readable**: Use clear descriptions

## Coverage Goals

Aim for:
- 80%+ line coverage
- 80%+ branch coverage
- 100% coverage for critical paths (data upload, calculations)
