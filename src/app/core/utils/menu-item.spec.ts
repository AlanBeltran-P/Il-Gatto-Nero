import { MenuItem } from '../models/menu.model';
import { hasPrices, isItemAvailable } from './menu-item';

const baseItem: MenuItem = { id: 'x', name: 'Plato', prices: [{ amount: 1000 }] };

describe('isItemAvailable', () => {
  it('es true si no se indica disponibilidad', () => {
    expect(isItemAvailable(baseItem)).toBe(true);
  });

  it('es false si available es false', () => {
    expect(isItemAvailable({ ...baseItem, available: false })).toBe(false);
  });
});

describe('hasPrices', () => {
  it('es true si tiene al menos un precio', () => {
    expect(hasPrices(baseItem)).toBe(true);
  });

  it('es false si la lista de precios está vacía', () => {
    expect(hasPrices({ ...baseItem, prices: [] })).toBe(false);
  });
});
