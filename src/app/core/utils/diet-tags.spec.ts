import { Category, MenuItem } from '../models/menu.model';
import { filterCategoriesByTags, filterItemsByTags, findAvailableTags } from './diet-tags';

const margherita: MenuItem = { id: 'm', name: 'Margherita', prices: [], tags: ['vegetariano'] };
const diavola: MenuItem = { id: 'd', name: 'Diavola', prices: [], tags: ['picante'] };
const ensalada: MenuItem = {
  id: 'e',
  name: 'Ensalada',
  prices: [],
  tags: ['vegetariano', 'sin-tacc'],
};
const items = [margherita, diavola, ensalada];

describe('filterItemsByTags', () => {
  it('devuelve todo si no hay etiquetas seleccionadas', () => {
    expect(filterItemsByTags(items, [])).toEqual(items);
  });

  it('deja los productos con la etiqueta pedida', () => {
    expect(filterItemsByTags(items, ['vegetariano'])).toEqual([margherita, ensalada]);
  });

  it('exige todas las etiquetas cuando se piden varias', () => {
    expect(filterItemsByTags(items, ['vegetariano', 'sin-tacc'])).toEqual([ensalada]);
  });
});

describe('filterCategoriesByTags', () => {
  it('filtra los productos de cada categoría', () => {
    const categories: Category[] = [{ id: 'pizze', name: 'Pizze', items }];
    expect(filterCategoriesByTags(categories, ['picante'])[0].items).toEqual([diavola]);
  });
});

describe('findAvailableTags', () => {
  it('devuelve solo las etiquetas usadas, en orden fijo', () => {
    const categories: Category[] = [{ id: 'pizze', name: 'Pizze', items }];
    expect(findAvailableTags(categories)).toEqual(['sin-tacc', 'vegetariano', 'picante']);
  });

  it('devuelve vacío si ningún producto tiene etiquetas', () => {
    const categories: Category[] = [{ id: 'x', name: 'X', items: [{ id: 'a', name: 'A', prices: [] }] }];
    expect(findAvailableTags(categories)).toEqual([]);
  });
});
