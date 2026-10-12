import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Category, Brand, Product } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly http = inject(HttpClient);

  readonly categories = signal<Category[]>([]);
  readonly brands = signal<Brand[]>([]);
  readonly allProducts = signal<Product[]>([]);
  readonly selectedBrandId = signal<string>('earbuds-brand');
  readonly selectedCategoryId = signal<string | null>(null);
  readonly currentLang = signal<'en' | 'ar'>('en');
  readonly searchQuery = signal<string>('');

  readonly isRtl = computed(() => this.currentLang() === 'ar');

  readonly activeBrand = computed(() => {
    const list = this.brands();
    return list.find(b => b.id === this.selectedBrandId()) || list[0] || null;
  });

  readonly filteredProducts = computed(() => {
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

  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>('data/brands.json').pipe(delay(200));
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('data/categories.json').pipe(delay(200));
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('data/products.json').pipe(delay(250));
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

  setSearchQuery(query: string): void {
    this.searchQuery.set(query);
  }
}
