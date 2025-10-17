export interface ClockParts {
  hours: string;
  minutes: string;
  seconds: string;
  period: 'A.M.' | 'P.M.';
  weekday: string;
}

// Mapa de etiquetas legibles
export const TIMEZONE_LABELS: Record<string, string> = {
  'America/Mexico_City': 'Ciudad de México',
  'America/New_York': 'Nueva York, EE.UU.',
  'Europe/Madrid': 'Madrid, España',
  'Europe/London': 'Londres, Reino Unido',
  'Asia/Tokyo': 'Tokio, Japón',
  'Australia/Sydney': 'Sídney, Australia',
};

export function getTimezoneLabel(timeZone: string): string {
  return TIMEZONE_LABELS[timeZone] ?? timeZone;
}

export function getTimeParts(timeZone: string, date: Date = new Date()): ClockParts {
  const formatter = new Intl.DateTimeFormat('es-MX', {
    timeZone,
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const parts = formatter.formatToParts(date);
  let hour = parts.find(p => p.type === 'hour')?.value ?? '0';
  const minute = parts.find(p => p.type === 'minute')?.value ?? '00';
  const second = parts.find(p => p.type === 'second')?.value ?? '00';
  const dayPeriodRaw = parts.find(p => p.type === 'dayPeriod')?.value ?? '';

  const period: 'A.M.' | 'P.M.' =
    dayPeriodRaw.toLowerCase().includes('p') ? 'P.M.' : 'A.M.';

  if (hour.length === 1) hour = '0' + hour;

  const weekday = new Intl.DateTimeFormat('es-MX', {
    timeZone,
    weekday: 'long',
  }).format(date).toLowerCase();

  return { hours: hour, minutes: minute, seconds: second, period, weekday };
}

// Compatibilidad con tests existentes
export function getMexicoCityTimeParts(date: Date = new Date()): ClockParts {
  return getTimeParts('America/Mexico_City', date);
}