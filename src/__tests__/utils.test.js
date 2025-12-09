import { calculateHeightInPx, calculateWidthInPx } from '../utils';

describe('Utility Functions', () => {
  describe('calculateHeightInPx', () => {
    beforeAll(() => {
      // Mock document.documentElement.clientHeight
      Object.defineProperty(document.documentElement, 'clientHeight', {
        writable: true,
        configurable: true,
        value: 1000,
      });
    });

    test('calculates 50% of document height correctly', () => {
      const result = calculateHeightInPx(50);
      expect(result).toBe(500);
    });

    test('calculates 20% of document height correctly', () => {
      const result = calculateHeightInPx(20);
      expect(result).toBe(200);
    });

    test('calculates 100% of document height correctly', () => {
      const result = calculateHeightInPx(100);
      expect(result).toBe(1000);
    });

    test('calculates 0% of document height correctly', () => {
      const result = calculateHeightInPx(0);
      expect(result).toBe(0);
    });
  });

  describe('calculateWidthInPx', () => {
    beforeAll(() => {
      // Mock document.documentElement.clientWidth
      Object.defineProperty(document.documentElement, 'clientWidth', {
        writable: true,
        configurable: true,
        value: 500,
      });
    });

    test('calculates 50% of document width correctly', () => {
      const result = calculateWidthInPx(50);
      expect(result).toBe(250);
    });

    test('calculates 100% of document width correctly', () => {
      const result = calculateWidthInPx(100);
      expect(result).toBe(500);
    });
  });
});
