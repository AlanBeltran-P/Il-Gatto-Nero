import { Category, MenuItem } from '../models/menu.model';
import { findEntryById, findPairings } from './pairings';

const carbonara: MenuItem = {
  id: 'carbonara',
  name: 'Carbonara',
  prices: [],
  pairings: ['nebbiolo', 'no-existe'],
};
const categories: Category[] = [
  { id: 'pizze', name: 'Le Nostre Pizze', items: [carbonara] },
  { id: 'tintos', name: 'Tintos', items: [{ id: 'nebbiolo', name: 'Nebbiolo', prices: [] }] },
];

describe('findEntryById', () => {
  it('devuelve el producto con el nombre de su categoría', () => {
    expect(findEntryById(categories, 'nebbiolo')?.categoryName).toBe('Tintos');
  });

  it('devuelve undefined si no existe', () => {
    expect(findEntryById(categories, 'no-existe')).toBeUndefined();
  });
});

describe('findPairings', () => {
  it('devuelve los maridajes que existen e ignora los que no', () => {
    const pairings = findPairings(carbonara, categories);
    expect(pairings.map((p) => p.item.id)).toEqual(['nebbiolo']);
  });

  it('devuelve vacío si el producto no tiene maridajes', () => {
    expect(findPairings({ id: 'x', name: 'X', prices: [] }, categories)).toEqual([]);
  });
});
