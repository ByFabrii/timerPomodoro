import '@testing-library/jest-dom';

// Mock para performance.now() en tests
Object.defineProperty(window, 'performance', {
  value: {
    now: () => Date.now(),
  },
});

// Mock para crypto.randomUUID()
Object.defineProperty(window, 'crypto', {
  value: {
    randomUUID: () => Math.random().toString(36).substring(2, 15),
  },
});