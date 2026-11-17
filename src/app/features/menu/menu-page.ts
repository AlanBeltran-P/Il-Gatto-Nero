import { Component, ElementRef, computed, inject, signal, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { SITE_CONFIG } from '../../core/config/site.config';
import { Category, DietTag, MenuEntry, MenuItem } from '../../core/models/menu.model';
import { MenuService } from '../../core/services/menu.service';
import { filterCategoriesByTags, findAvailableTags } from '../../core/utils/diet-tags';
import { searchMenu } from '../../core/utils/menu-search';
import { findPairings } from '../../core/utils/pairings';
import { ThinFrame } from '../../shared/components/thin-frame/thin-frame';
import { SwipeDirective } from '../../shared/directives/swipe.directive';
import { BackToTop } from './components/back-to-top/back-to-top';
import { CategoryNav } from './components/category-nav/category-nav';
import { CategoryPager } from './components/category-pager/category-pager';
import { CategorySection } from './components/category-section/category-section';
import { DietFilters } from './components/diet-filters/diet-filters';
import { MenuFooter } from './components/menu-footer/menu-footer';
import { MenuHeader } from './components/menu-header/menu-header';
import { ProductModal } from './components/product-modal/product-modal';
import { SearchBox } from './components/search-box/search-box';
import { SearchResults } from './components/search-results/search-results';

const NAV_HEIGHT_PX = 56;
const BACK_TO_TOP_THRESHOLD_PX = 600;

/** Desde qué lado entra la categoría nueva (para la animación). */
type EnterDirection = 'from-next' | 'from-previous' | 'none';

@Component({
  selector: 'app-menu-page',
  imports: [
    MenuHeader,
    CategoryNav,
    CategorySection,
    CategoryPager,
    SearchBox,
    SearchResults,
    DietFilters,
    ProductModal,
    MenuFooter,
    BackToTop,
    ThinFrame,
    SwipeDirective,
  ],
  templateUrl: './menu-page.html',
  styleUrl: './menu-page.css',
  host: {
    '(window:scroll)': 'onWindowScroll()',
  },
})
export class MenuPage {
  private readonly menuService = inject(MenuService);
  private readonly content = viewChild<ElementRef<HTMLElement>>('content');
  private readonly chosenCategoryId = signal<string | null>(null);

  /** undefined = cargando, null = error, MenuData = listo. */
  protected readonly menu = toSignal(this.menuService.getMenu().pipe(catchError(() => of(null))));
  protected readonly searchQuery = signal('');
  protected readonly activeTags = signal<DietTag[]>([]);
  protected readonly selectedEntry = signal<MenuEntry | null>(null);
  protected readonly enterDirection = signal<EnterDirection>('none');
  protected readonly showBackToTop = signal(false);
  protected readonly siteName = SITE_CONFIG.name;

  private readonly categories = computed(() => this.menu()?.categories ?? []);
  private readonly filteredCategories = computed(() =>
    filterCategoriesByTags(this.categories(), this.activeTags()),
  );

  protected readonly availableTags = computed(() => findAvailableTags(this.categories()));
  protected readonly isSearching = computed(() => this.searchQuery().trim().length > 0);
  protected readonly searchResults = computed(() =>
    searchMenu(this.filteredCategories(), this.searchQuery()),
  );

  private readonly selectedIndex = computed(() => {
    const index = this.categories().findIndex((c) => c.id === this.chosenCategoryId());
    return index === -1 ? 0 : index;
  });

  protected readonly selectedCategory = computed(
    (): Category | undefined => this.categories()[this.selectedIndex()],
  );
  protected readonly previousCategory = computed(() => this.categories()[this.selectedIndex() - 1]);
  protected readonly nextCategory = computed(() => this.categories()[this.selectedIndex() + 1]);
  protected readonly selectedPosition = computed(() => this.selectedIndex() + 1);

  /**
   * Lista con una sola categoría (ya filtrada por dieta): como el @for la trackea por id,
   * al cambiar de pestaña se recrea la sección y se reproduce su animación de entrada.
   */
  protected readonly visibleCategories = computed(() => {
    const category = this.filteredCategories()[this.selectedIndex()];
    return category ? [category] : [];
  });

  protected readonly selectedPairings = computed(() => {
    const entry = this.selectedEntry();
    return entry ? findPairings(entry.item, this.categories()) : [];
  });

  protected selectCategory(categoryId: string): void {
    const newIndex = this.categories().findIndex((c) => c.id === categoryId);
    if (newIndex === -1) {
      return;
    }
    // Elegir una categoría siempre cierra la búsqueda (aunque sea la misma pestaña)
    this.searchQuery.set('');
    if (newIndex !== this.selectedIndex()) {
      this.enterDirection.set(newIndex > this.selectedIndex() ? 'from-next' : 'from-previous');
      this.chosenCategoryId.set(categoryId);
    }
    this.scrollToContentIfHidden();
  }

  protected goToNextCategory(): void {
    const next = this.nextCategory();
    if (next) {
      this.selectCategory(next.id);
    }
  }

  protected goToPreviousCategory(): void {
    const previous = this.previousCategory();
    if (previous) {
      this.selectCategory(previous.id);
    }
  }

  /** Producto tocado desde la categoría actual. */
  protected openItem(item: MenuItem): void {
    this.openEntry({ item, categoryName: this.selectedCategory()?.name ?? '' });
  }

  /** Producto tocado desde la búsqueda o desde un maridaje. */
  protected openEntry(entry: MenuEntry): void {
    this.selectedEntry.set(entry);
  }

  protected closeEntry(): void {
    this.selectedEntry.set(null);
  }

  protected onWindowScroll(): void {
    this.showBackToTop.set(window.scrollY > BACK_TO_TOP_THRESHOLD_PX);
  }

  /** Si el usuario ya bajó, vuelve al inicio del contenido (debajo de la barra fija). */
  private scrollToContentIfHidden(): void {
    const content = this.content()?.nativeElement;
    if (content && content.getBoundingClientRect().top < NAV_HEIGHT_PX) {
      content.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
