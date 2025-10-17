import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getMexicoCityTimeParts } from '../utils/clock';

describe('Clock utils - día en español', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('devuelve el día en español (lunes)', () => {
    vi.setSystemTime(new Date('2024-01-01T12:00:00.000Z')); // Martes UTC -> Lunes MX
    const parts = getMexicoCityTimeParts();
    expect(parts.weekday).toBe('lunes');
  });
});