import { Component, inject, ViewChild, ElementRef, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '@shared/data-access';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-banner-slider',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  template: `
    <section class="brand-showcase-section mx-auto px-3 md:px-0 mt-4 md:mt-[40px] mb-6 md:mb-10">
      <div 
        class="brand-showcase-container shadow-xl select-none"
        [style.background]="brandGradient()"
      >
        <!-- Top banner image & arrows -->
        <div class="brand-top-banner group">
          @if (dataService.activeBrand(); as brand) {
            <img 
              [src]="brand.bannerUrl" 
              [alt]="brand.name"
              class="w-full h-full object-cover block"
            />
          }

          <button 
            type="button" 
            (click)="selectPreviousBrand()"
            class="absolute start-2 md:start-4 top-1/2 -translate-y-1/2 w-[32px] h-[40px] flex items-center justify-center text-white hover:scale-105 active:scale-95 transition cursor-pointer z-10 p-0 border-0 bg-transparent opacity-100"
            aria-label="Previous Brand"
          >
            <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-[32px] h-[40px] drop-shadow-sm shrink-0">
              <path 
                [attr.d]="dataService.isRtl() ? 'M11 8L23 20L11 32' : 'M21 8L9 20L21 32'" 
                stroke="white" 
                stroke-width="2.5" 
                stroke-linecap="round" 
                stroke-linejoin="round"
              />
            </svg>
          </button>

          <button 
            type="button" 
            (click)="selectNextBrand()"
            class="absolute end-2 md:end-4 top-1/2 -translate-y-1/2 w-[32px] h-[40px] flex items-center justify-center text-white hover:scale-105 active:scale-95 transition cursor-pointer z-10 p-0 border-0 bg-transparent opacity-100"
            aria-label="Next Brand"
          >
            <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-[32px] h-[40px] drop-shadow-sm shrink-0">
              <path 
                [attr.d]="dataService.isRtl() ? 'M21 8L9 20L21 32' : 'M11 8L23 20L11 32'" 
                stroke="white" 
                stroke-width="2.5" 
                stroke-linecap="round" 
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>

        <!-- Products horizontal slider -->
        <div class="brand-products-wrapper">
          <button 
            type="button"
            (click)="scrollProductsLeft()"
            class="hidden md:flex absolute start-2 top-1/2 -translate-y-1/2 z-20 w-[42px] h-[42px] rounded-full bg-white shadow-lg items-center justify-center text-gray-700 hover:text-black hover:scale-105 transition cursor-pointer"
            aria-label="Previous products"
          >
            <i class="pi text-sm" [class.pi-chevron-right]="dataService.isRtl()" [class.pi-chevron-left]="!dataService.isRtl()"></i>
          </button>

          <div 
            #productScroll
            class="flex items-stretch gap-[12px] overflow-x-auto no-scrollbar scroll-smooth h-full"
          >
            @for (item of dataService.filteredProducts(); track item.id) {
              <div class="shrink-0">
                <app-product-card 
                  [product]="item" 
                  [isRtl]="dataService.isRtl()">
                </app-product-card>
              </div>
            } @empty {
              <div class="w-full h-[300px] flex flex-col items-center justify-center text-white/80">
                <img src="assets/search-icon.svg" alt="Search" class="w-8 h-8 mb-2 brightness-0 invert opacity-70" />
                <p>{{ dataService.isRtl() ? 'لا توجد منتجات مطابقة لهذا البحث' : 'No products found for this brand' }}</p>
              </div>
            }
          </div>

          <button 
            type="button"
            (click)="scrollProductsRight()"
            class="hidden md:flex absolute end-2 top-1/2 -translate-y-1/2 z-20 w-[42px] h-[42px] rounded-full bg-white shadow-lg items-center justify-center text-gray-700 hover:text-black hover:scale-105 transition cursor-pointer"
            aria-label="Next products"
          >
            <i class="pi text-sm" [class.pi-chevron-left]="dataService.isRtl()" [class.pi-chevron-right]="!dataService.isRtl()"></i>
          </button>
        </div>

        <!-- View more CTA -->
        <div class="brand-view-more-wrapper hidden md:block">
          <button 
            type="button"
            [style.color]="brandHexColor()"
            class="brand-view-more-btn"
          >
            {{ dataService.isRtl() ? 'عرض المزيد' : 'View More' }}
          </button>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .brand-showcase-section {
      width: 100%;
      max-width: 1352px;
      margin-left: auto;
      margin-right: auto;
    }

    .brand-showcase-container {
      width: 100%;
      max-width: 1352px;
      border-radius: 24px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding-bottom: 12px;
      transition: all 0.5s ease;
    }

    @media (min-width: 1024px) {
      .brand-showcase-section {
        width: 1352px;
      }
      .brand-showcase-container {
        width: 1352px;
        height: 699px;
      }
    }

    .brand-top-banner {
      width: 100%;
      height: 149px;
      flex-shrink: 0;
      border-top-left-radius: 24px;
      border-top-right-radius: 24px;
      overflow: hidden;
      position: relative;
    }

    .brand-products-wrapper {
      height: 460px;
      flex-shrink: 0;
      padding-left: 16px;
      padding-right: 16px;
      margin-top: 14px;
      margin-bottom: 12px;
      position: relative;
    }

    .brand-view-more-wrapper {
      height: 52px;
      flex-shrink: 0;
      padding-left: 16px;
      padding-right: 16px;
    }

    .brand-view-more-btn {
      width: 100%;
      height: 52px;
      border-radius: 10px;
      background-color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Poppins', sans-serif;
      font-weight: 700;
      font-size: 20px;
      cursor: pointer;
      border: none;
      transition: background-color 0.2s, transform 0.1s;
    }
    .brand-view-more-btn:hover {
      background-color: #f9f9f9;
    }
    .brand-view-more-btn:active {
      transform: scale(0.99);
    }
  `]
})
export class BannerSliderComponent {
  readonly dataService = inject(DataService);
  @ViewChild('productScroll') productScroll!: ElementRef<HTMLDivElement>;

  readonly brandGradient = computed(() => {
    const brand = this.dataService.activeBrand();
    if (!brand || brand.id === 'earbuds-brand') {
      return '#8A181A';
    }
    return brand.hexColor 
      ? `linear-gradient(180deg, ${brand.hexColor} 0%, ${brand.hexColor} 100%)` 
      : '#8A181A';
  });

  readonly brandHexColor = computed(() => {
    const brand = this.dataService.activeBrand();
    return brand?.id === 'earbuds-brand' ? '#8A181A' : (brand?.hexColor || '#8A181A');
  });

  selectPreviousBrand() {
    const brands = this.dataService.brands();
    if (!brands || brands.length === 0) return;
    const currentId = this.dataService.selectedBrandId();
    const idx = brands.findIndex(b => b.id === currentId);
    const newIdx = (idx - 1 + brands.length) % brands.length;
    if (brands[newIdx]) {
      this.dataService.selectBrand(brands[newIdx].id);
    }
  }

  selectNextBrand() {
    const brands = this.dataService.brands();
    if (!brands || brands.length === 0) return;
    const currentId = this.dataService.selectedBrandId();
    const idx = brands.findIndex(b => b.id === currentId);
    const newIdx = (idx + 1) % brands.length;
    if (brands[newIdx]) {
      this.dataService.selectBrand(brands[newIdx].id);
    }
  }

  scrollProductsLeft() {
    const el = this.productScroll.nativeElement;
    const offset = this.dataService.isRtl() ? 300 : -300;
    el.scrollBy({ left: offset, behavior: 'smooth' });
  }

  scrollProductsRight() {
    const el = this.productScroll.nativeElement;
    const offset = this.dataService.isRtl() ? -300 : 300;
    el.scrollBy({ left: offset, behavior: 'smooth' });
  }
}
