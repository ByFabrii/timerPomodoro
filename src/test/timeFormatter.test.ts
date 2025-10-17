import { describe, it, expect } from 'vitest';
import { formatTime, formatLapTime } from '../utils/timeFormatter';

describe('timeFormatter', () => {
  describe('formatTime', () => {
    it('should format milliseconds correctly', () => {
      expect(formatTime(0)).toBe('00:00.00');
      expect(formatTime(1000)).toBe('00:01.00');
      expect(formatTime(60000)).toBe('01:00.00');
      expect(formatTime(61500)).toBe('01:01.50');
      expect(formatTime(3661500)).toBe('61:01.50');
    });

    it('should handle centiseconds correctly', () => {
      expect(formatTime(1050)).toBe('00:01.05');
      expect(formatTime(1999)).toBe('00:01.99');
    });
  });

  describe('formatLapTime', () => {
    it('should format lap times correctly', () => {
      expect(formatLapTime(500)).toBe('500ms');
      expect(formatLapTime(999)).toBe('999ms');
      expect(formatLapTime(1000)).toBe('1.00s');
      expect(formatLapTime(1500)).toBe('1.50s');
      expect(formatLapTime(60000)).toBe('60.00s');
    });
  });
});