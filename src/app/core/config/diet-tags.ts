import { DietTag } from '../models/menu.model';

/** Orden en el que se muestran los filtros y las etiquetas. */
export const DIET_TAG_ORDER: DietTag[] = ['sin-tacc', 'vegetariano', 'vegano', 'picante'];

export const DIET_TAG_LABELS: Record<DietTag, string> = {
  'sin-tacc': 'Sin TACC',
  vegetariano: 'Vegetariano',
  vegano: 'Vegano',
  picante: 'Picante',
};
