import { Category } from '../models/menu.model';
import { normalizeText, searchMenu } from './menu-search';

const categories: Category[] = [
  {
    id: 'pasta',
    name: 'Pasta Artigianale',
    items: [
      { id: 'cavatelli', name: 'Cavatelli al ragú', description: 'Ragú clásico.', prices: [] },
      { id: 'cacio', name: 'Tonnarelli cacio e pepe', prices: [] },
    ],
  },
  {
    id: 'cervezas',
    name: 'Cervezas',
    items: [{ id: 'cerveza', name: 'Cerveza 330 ml', variants: ['Peroni Nastro Azzurro'], prices: [] }],
  },
];

describe('normalizeText', () => {
  it('pasa a minúsculas y quita tildes', () => {
    expect(normalizeText('  Ragú CLÁSICO ')).toBe('ragu clasico');
  });
});

describe('searchMenu', () => {
  it('devuelve vacío si la búsqueda está vacía', () => {
    expect(searchMenu(categories, '   ')).toEqual([]);
  });

  it('encuentra sin importar tildes ni mayúsculas', () => {
    const groups = searchMenu(categories, 'RAGU');
    expect(groups.length).toBe(1);
    expect(groups[0].items.map((i) => i.id)).toEqual(['cavatelli']);
  });

  it('busca también en las variedades', () => {
    expect(searchMenu(categories, 'peroni')[0].items[0].id).toBe('cerveza');
  });

  it('busca también por nombre de categoría', () => {
    expect(searchMenu(categories, 'pasta')[0].items.length).toBe(2);
  });

  it('exige que estén todas las palabras', () => {
    expect(searchMenu(categories, 'cacio pepe')[0].items.map((i) => i.id)).toEqual(['cacio']);
    expect(searchMenu(categories, 'cacio peroni')).toEqual([]);
  });
});
