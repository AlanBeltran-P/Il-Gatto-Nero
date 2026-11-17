import { formatLongDate } from './date';

describe('formatLongDate', () => {
  it('formatea una fecha ISO en español', () => {
    expect(formatLongDate('2026-11-17')).toBe('17 de noviembre de 2026');
  });

  it('devuelve vacío si la fecha es inválida', () => {
    expect(formatLongDate('no-es-fecha')).toBe('');
  });
});
