import { Category, MenuEntry, MenuItem } from '../models/menu.model';

export function findEntryById(categories: Category[], itemId: string): MenuEntry | undefined {
  for (const category of categories) {
    const item = category.items.find((candidate) => candidate.id === itemId);
    if (item) {
      return { item, categoryName: category.name };
    }
  }
  return undefined;
}

/** Productos sugeridos para acompañar al item. Ignora ids que no existan en el menú. */
export function findPairings(item: MenuItem, categories: Category[]): MenuEntry[] {
  return (item.pairings ?? [])
    .map((id) => findEntryById(categories, id))
    .filter((entry): entry is MenuEntry => entry !== undefined);
}
