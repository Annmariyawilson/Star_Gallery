import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Category, Brand, Product } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private http = inject(HttpClient);

  // Application state signals
  categories = signal<Category[]>([]);
  brands = signal<Brand[]>([]);
  allProducts = signal<Product[]>([]);
  selectedBrandId = signal<string>('earbuds-brand');
  selectedCategoryId = signal<string | null>(null);
  currentLang = signal<'en' | 'ar'>('en');
  searchQuery = signal<string>('');

  isRtl = computed(() => this.currentLang() === 'ar');

  activeBrand = computed(() => {
    const list = this.brands();
    return list.find(b => b.id === this.selectedBrandId()) || list[0] || null;
  });

  // Dynamically filters products based on brand, category, and search query
  filteredProducts = computed(() => {
    const brandId = this.selectedBrandId();
    const catId = this.selectedCategoryId();
    const query = this.searchQuery().toLowerCase().trim();

    return this.allProducts().filter(p => {
      const matchBrand = !brandId || p.brandId === brandId;
      const matchCat = !catId || p.categoryId === catId;
      const matchQuery = !query || 
        p.name.toLowerCase().includes(query) || 
        p.nameAr.toLowerCase().includes(query);
      return matchBrand && matchCat && matchQuery;
    });
  });

  // API calls simulating realistic network latency
  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>('data/brands.json').pipe(delay(200));
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('data/categories.json').pipe(delay(200));
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('data/products.json').pipe(delay(250));
  }

  getProductsByBrand(brandId: string): Observable<Product[]> {
    return this.getProducts().pipe(
      map(products => products.filter(p => p.brandId === brandId))
    );
  }

  getProductsByCategory(categoryId: string): Observable<Product[]> {
    return this.getProducts().pipe(
      map(products => products.filter(p => p.categoryId === categoryId))
    );
  }

  loadInitialData(): void {
    this.getCategories().subscribe(cats => this.categories.set(cats));
    this.getBrands().subscribe(brands => this.brands.set(brands));
    this.getProducts().subscribe(prods => this.allProducts.set(prods));
  }

  selectBrand(brandId: string): void {
    this.selectedBrandId.set(brandId);
  }

  selectCategory(categoryId: string | null): void {
    this.selectedCategoryId.update(curr => curr === categoryId ? null : categoryId);
  }

  toggleLanguage(): void {
    const next = this.currentLang() === 'en' ? 'ar' : 'en';
    this.currentLang.set(next);
    if (typeof document !== 'undefined') {
      document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = next;
    }
  }

  setSearchQuery(q: string): void {
    this.searchQuery.set(q);
  }
}

export { DataService as CatalogService, DataService as ProductService };
