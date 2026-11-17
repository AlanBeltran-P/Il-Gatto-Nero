import { DIET_TAG_ORDER } from '../config/diet-tags';
import { Category, DietTag, MenuItem } from '../models/menu.model';

/** Deja solo los productos que tienen todas las etiquetas pedidas. */
export function filterItemsByTags(items: MenuItem[], tags: DietTag[]): MenuItem[] {
  if (tags.length === 0) {
    return items;
  }
  return items.filter((item) => tags.every((tag) => item.tags?.includes(tag)));
}

/** Aplica el filtro de etiquetas a todas las categorías. */
export function filterCategoriesByTags(categories: Category[], tags: DietTag[]): Category[] {
  return categories.map((category) => ({
    ...category,
    items: filterItemsByTags(category.items, tags),
  }));
}

/** Etiquetas que aparecen en al menos un producto, en el orden de DIET_TAG_ORDER. */
export function findAvailableTags(categories: Category[]): DietTag[] {
  const usedTags = new Set(categories.flatMap((c) => c.items.flatMap((item) => item.tags ?? [])));
  return DIET_TAG_ORDER.filter((tag) => usedTags.has(tag));
}
