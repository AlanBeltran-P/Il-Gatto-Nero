export interface Price {
  amount: number;
}

export interface Extra {
  name: string;
  amount: number;
}

export type DietTag = 'sin-tacc' | 'vegetariano' | 'vegano' | 'picante';

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  prices: Price[];
  badge?: string;
  variants?: string[];
  available?: boolean;
  /** Ruta relativa a /public, por ejemplo "images/platos/carbonara.webp". */
  image?: string;
  /** Etiquetas de dieta, por ejemplo ["vegetariano", "sin-tacc"]. */
  tags?: DietTag[];
  /** Ids de otros productos que combinan bien (maridaje). */
  pairings?: string[];
}

/** Un producto junto con el nombre de su categoría. */
export interface MenuEntry {
  item: MenuItem;
  categoryName: string;
}

export interface Category {
  id: string;
  name: string;
  note?: string;
  items: MenuItem[];
  extras?: Extra[];
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
}

export interface LocalInfo {
  name: string;
  logo: string;
  city: string;
  instagram: string;
}

export interface MenuData {
  local: LocalInfo;
  updatedAt: string;
  notes: string[];
  promotions: Promotion[];
  allergyNotice: string;
  categories: Category[];
}
