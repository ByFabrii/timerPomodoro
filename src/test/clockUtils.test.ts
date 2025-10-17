import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getMexicoCityTimeParts } from '../utils/clock';

describe('Clock utils - Mexico City', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('formatea a 12h y periodo P.M.', () => {
    // 18:07:25Z -> 12:07:25 local (UTC-6) => P.M.
    vi.setSystemTime(new Date('2024-01-01T18:07:25.000Z'));
    const parts = getMexicoCityTimeParts();

    expect(parts.hours).toHaveLength(2);
    expect(parts.minutes).toHaveLength(2);
    expect(parts.seconds).toHaveLength(2);
    expect(parts.period).toBe('P.M.');
  });

  it('formatea periodo A.M.', () => {
    // 06:58:03Z -> 00:58:03 local (UTC-6) => A.M.
    vi.setSystemTime(new Date('2024-01-01T06:58:03.000Z'));
    const parts = getMexicoCityTimeParts();

    expect(parts.period).toBe('A.M.');
  });
});