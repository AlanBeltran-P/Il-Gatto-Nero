import { Component, computed, input, output } from '@angular/core';
import { MenuEntry, MenuItem as MenuItemData } from '../../../../core/models/menu.model';
import { SearchGroup } from '../../../../core/utils/menu-search';
import { MenuItem } from '../menu-item/menu-item';

@Component({
  selector: 'app-search-results',
  imports: [MenuItem],
  templateUrl: './search-results.html',
  styleUrl: './search-results.css',
})
export class SearchResults {
  readonly groups = input.required<SearchGroup[]>();
  readonly query = input('');
  readonly itemSelected = output<MenuEntry>();

  protected readonly total = computed(() =>
    this.groups().reduce((sum, group) => sum + group.items.length, 0),
  );

  protected select(item: MenuItemData, group: SearchGroup): void {
    this.itemSelected.emit({ item, categoryName: group.category.name });
  }
}
