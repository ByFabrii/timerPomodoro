import { describe, it, expect } from 'vitest';
import { getTimezoneLabel } from '../utils/clock';

describe('Timezone label', () => {
  it('devuelve etiqueta legible para zonas conocidas', () => {
    expect(getTimezoneLabel('America/Mexico_City')).toBe('Ciudad de México');
    expect(getTimezoneLabel('Europe/London')).toBe('Londres, Reino Unido');
  });
});