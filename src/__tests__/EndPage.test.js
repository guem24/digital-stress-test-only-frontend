import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import EndPage from '../pages/EndPage';

describe('EndPage Component', () => {
  const mockProps = {
    activeSlide: 'questionnaire',
    uploadFinalData: jest.fn(),
    studyMetaTracker: {
      studyTitle: 'Test Study',
      studyUuid: 'test-uuid-123',
      studyResultId: 'result-123',
    },
    speechTestAnalysis: {
      audioMeanQ1: 50,
      audioMeanQ2: 60,
      audioMeanQ3: 55,
      speakBreakCounterQ1: 2,
      speakBreakCounterQ2: 3,
      speakBreakCounterQ3: 1,
      speakingTickCounterQ1: 100,
      speakingTickCounterQ2: 90,
      speakingTickCounterQ3: 95,
      volumeHighQ1: 80,
      volumeHighQ2: 75,
      volumeHighQ3: 70,
    },
    areAllVideosUploaded: true,
  };

  test('renders completion message', async () => {
    render(<EndPage {...mockProps} />);

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.getByText(/Deine Daten wurden gespeichert/)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  test('shows loading spinner initially', () => {
    render(<EndPage {...mockProps} />);
    expect(screen.getByText(/Daten werden gespeichert/)).toBeInTheDocument();
  });

  test('calls uploadFinalData on mount', () => {
    render(<EndPage {...mockProps} />);
    expect(mockProps.uploadFinalData).toHaveBeenCalled();
  });

  test('displays return to questionnaire message', async () => {
    render(<EndPage {...mockProps} />);

    await waitFor(() => {
      expect(screen.getByText(/Kehre bitte zurück zum Fragebogen/)).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});
