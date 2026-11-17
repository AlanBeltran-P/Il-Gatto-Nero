import { Category, MenuItem } from '../models/menu.model';

export interface SearchGroup {
  category: Category;
  items: MenuItem[];
}

/** Minúsculas y sin tildes: "Ragú" y "ragu" quedan iguales. */
export function normalizeText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
}

function searchableText(item: MenuItem, category: Category): string {
  return normalizeText(
    [item.name, item.description ?? '', ...(item.variants ?? []), category.name].join(' '),
  );
}

/** Un producto coincide si contiene todas las palabras buscadas. */
function matches(item: MenuItem, category: Category, words: string[]): boolean {
  const text = searchableText(item, category);
  return words.every((word) => text.includes(word));
}

/** Busca en nombre, descripción, variedades y categoría. Agrupa los resultados por categoría. */
export function searchMenu(categories: Category[], query: string): SearchGroup[] {
  const words = normalizeText(query).split(/\s+/).filter(Boolean);
  if (words.length === 0) {
    return [];
  }

  return categories
    .map((category) => ({
      category,
      items: category.items.filter((item) => matches(item, category, words)),
    }))
    .filter((group) => group.items.length > 0);
}
