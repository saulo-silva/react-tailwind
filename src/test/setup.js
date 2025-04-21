import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

// Limpa após cada teste
afterEach(() => {
  cleanup();
}); 