import { isLocalUrl, resolveMenuUrl, toDisplayUrl } from './menu-url';

describe('resolveMenuUrl', () => {
  it('usa la URL pública si está configurada', () => {
    expect(resolveMenuUrl('https://ilgattonero.com.ar', 'http://localhost:4200')).toBe(
      'https://ilgattonero.com.ar/',
    );
  });

  it('usa la dirección actual si no hay URL pública', () => {
    expect(resolveMenuUrl('  ', 'https://il-gatto-nero.vercel.app')).toBe(
      'https://il-gatto-nero.vercel.app/',
    );
  });

  it('deja una sola barra final', () => {
    expect(resolveMenuUrl('https://ilgattonero.com.ar///', '')).toBe('https://ilgattonero.com.ar/');
  });
});

describe('toDisplayUrl', () => {
  it('saca el protocolo y la barra final', () => {
    expect(toDisplayUrl('https://ilgattonero.com.ar/')).toBe('ilgattonero.com.ar');
  });
});

describe('isLocalUrl', () => {
  it('detecta direcciones locales', () => {
    expect(isLocalUrl('http://localhost:4200/')).toBe(true);
    expect(isLocalUrl('http://127.0.0.1:4200/')).toBe(true);
  });

  it('no marca como local un dominio público', () => {
    expect(isLocalUrl('https://ilgattonero.com.ar/')).toBe(false);
    expect(isLocalUrl('https://localhost-pizza.com/')).toBe(false);
  });
});
