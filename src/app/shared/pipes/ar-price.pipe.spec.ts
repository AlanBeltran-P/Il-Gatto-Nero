import { ArPricePipe } from './ar-price.pipe';

describe('ArPricePipe', () => {
  const pipe = new ArPricePipe();
  const normalizeSpaces = (text: string) => text.replace(/\s/g, ' ');

  it('formatea pesos con separador de miles y sin decimales', () => {
    expect(normalizeSpaces(pipe.transform(32000))).toBe('$ 32.000');
  });

  it('formatea montos chicos', () => {
    expect(normalizeSpaces(pipe.transform(4000))).toBe('$ 4.000');
  });
});
