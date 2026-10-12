import { Component, input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '@shared/data-access';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-[215px] h-[460px] p-[8px] rounded-[12px] border border-[#E0E0E5] bg-white flex flex-col gap-[8px] relative group select-none transition-all duration-300">
      
      <!-- Upper: Image Section (width: 199px, height: 298px, rounded: 10px, background: #FFFFFF) -->
      <div class="w-[199px] h-[298px] rounded-[10px] bg-white relative overflow-hidden shrink-0 flex flex-col items-center">
        
        <!-- Wishlist Button Container (width: 34px, height: 34px, padding: 8px, border-radius: 8px, bg: #FFFFFF, shadow) -->
        <button 
          type="button"
          (click)="toggleWishlist($event)"
          class="absolute top-[8px] end-[8px] z-10 w-[34px] h-[34px] p-[8px] rounded-[8px] bg-white flex items-center justify-center hover:scale-105 active:scale-95 transition cursor-pointer shadow-[0_1px_4px_rgba(0,0,0,0.1)] border-0"
          aria-label="Add to wishlist"
        >
          <!-- Heart Icon (width: 18px, height: 18px) -->
          <img 
            src="assets/heart.svg" 
            alt="Wishlist" 
            class="w-[18px] h-[18px] transition-all object-contain"
            [class.opacity-40]="!isFavorite()"
          />
        </button>

        <!-- Product Image Container (Wishlist icon overlays on top as per design 2) -->
        <div 
          (click)="onImageClick($event)"
          class="w-[199px] h-[280px] flex items-center justify-center relative cursor-pointer group/img overflow-hidden"
        >
          <img 
            [src]="currentImage()" 
            [alt]="product().name"
            class="w-full h-full object-contain transition-transform duration-300"
            loading="lazy"
          />

          <!-- Previous Variant Button -->
          @if (variantImages().length > 1) {
            <button 
              type="button"
              (click)="prevVariant($event)"
              class="absolute start-1 top-1/2 -translate-y-1/2 z-20 w-[28px] h-[28px] rounded-full bg-white/95 shadow-md flex items-center justify-center text-black hover:scale-110 active:scale-95 transition-opacity duration-200 cursor-pointer"
              [class.opacity-100]="showArrows()"
              [class.opacity-0]="!showArrows()"
              [class.group-hover/img:!opacity-100]="true"
              [class.pointer-events-auto]="showArrows()"
              [class.pointer-events-none]="!showArrows()"
              [class.group-hover/img:!pointer-events-auto]="true"
              aria-label="Previous Variant"
            >
              <i class="pi text-[11px] font-bold" [class.pi-chevron-right]="isRtl()" [class.pi-chevron-left]="!isRtl()"></i>
            </button>

            <!-- Next Variant Button -->
            <button 
              type="button"
              (click)="nextVariant($event)"
              class="absolute end-1 top-1/2 -translate-y-1/2 z-20 w-[28px] h-[28px] rounded-full bg-white/95 shadow-md flex items-center justify-center text-black hover:scale-110 active:scale-95 transition-opacity duration-200 cursor-pointer"
              [class.opacity-100]="showArrows()"
              [class.opacity-0]="!showArrows()"
              [class.group-hover/img:!opacity-100]="true"
              [class.pointer-events-auto]="showArrows()"
              [class.pointer-events-none]="!showArrows()"
              [class.group-hover/img:!pointer-events-auto]="true"
              aria-label="Next Variant"
            >
              <i class="pi text-[11px] font-bold" [class.pi-chevron-left]="isRtl()" [class.pi-chevron-right]="!isRtl()"></i>
            </button>
          }
        </div>

        <!-- Slider Pagination Dots (top: 290px, height: 4px, gap: 3px, active: 17x4 bg #57545B, inactive: 4.17x4 bg #A7A5AF opacity 0.3) -->
        <div class="absolute bottom-[4px] inset-x-0 flex items-center justify-center gap-[3px] h-[4px]">
          @for (img of variantImages(); track $index) {
            <button
              type="button"
              (click)="selectVariant($index, $event)"
              class="transition-all cursor-pointer p-0 border-0"
              [ngClass]="$index === (currentImageIndex() % variantImages().length) 
                ? 'w-[17px] h-[4px] bg-[#57545B] rounded-[56px]' 
                : 'w-[4.17px] h-[4px] bg-[#A7A5AF] opacity-30 rounded-[56px] hover:opacity-70'"
              [attr.aria-label]="'Variant ' + ($index + 1)"
            ></button>
          }
        </div>

      </div>

      <!-- Lower: Product Details (width: 199px, height: 138px, gap: 4px) -->
      <div class="w-[199px] h-[138px] flex flex-col gap-[4px] justify-between pt-0 pb-0.5">
        
        <!-- Product Title (width: 199px, height: 40px, Poppins 500 Medium, 14px, line-height 140%, #222029) -->
        <h3 class="w-[199px] h-[40px] font-['Poppins',sans-serif] font-medium text-[14px] leading-[140%] text-[#222029] overflow-hidden line-clamp-2" [title]="product().name">
          {{ isRtl() ? product().nameAr : product().name }}
        </h3>

        <!-- Rating section (width: 126px, height: 14px, gap: 8px) -->
        <div class="w-[126px] h-[14px] flex items-center gap-[8px]">
          <!-- Star section (width: 76px, height: 14px, gap: 4px) -->
          <div class="w-[76px] h-[14px] flex items-center gap-[4px]">
            @for (star of [1, 2, 3, 4, 5]; track star) {
              @if (star <= 4) {
                <!-- Filled star (width: 12px, height: 12px, fill: #FFCC00, stroke: #FFCC00 1.5px) -->
                <svg width="12" height="12" viewBox="0 0 12 13" fill="none" class="w-[12px] h-[12px] shrink-0" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.29362 4.61797L5.59262 2.00197C5.63043 1.92626 5.68859 1.86259 5.76056 1.81808C5.83254 1.77357 5.91549 1.75 6.00012 1.75C6.08474 1.75 6.1677 1.77357 6.23967 1.81808C6.31165 1.86259 6.36981 1.92626 6.40762 2.00197L7.70662 4.61797L10.6106 5.03997C10.6944 5.05159 10.7732 5.08652 10.8381 5.14078C10.9029 5.19504 10.9512 5.26644 10.9774 5.34683C11.0037 5.42723 11.0068 5.51338 10.9864 5.59545C10.966 5.67752 10.9229 5.7522 10.8621 5.81097L8.76112 7.84597L9.25712 10.721C9.32062 11.09 8.93062 11.371 8.59712 11.197L6.00012 9.83897L3.40262 11.197C3.06962 11.3715 2.67962 11.09 2.74312 10.7205L3.23912 7.84547L1.13812 5.81047C1.07761 5.75166 1.03482 5.67705 1.0146 5.59513C0.994384 5.51321 0.997555 5.42725 1.02375 5.34704C1.04995 5.26683 1.09813 5.19558 1.1628 5.14139C1.22748 5.08719 1.30606 5.05223 1.38962 5.04047L4.29362 4.61797Z" fill="#FFCC00" stroke="#FFCC00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              } @else {
                <!-- Outline star (width: 12px, height: 12px, fill: none, stroke: #FFCC00 1.5px) -->
                <svg width="12" height="12" viewBox="0 0 12 13" fill="none" class="w-[12px] h-[12px] shrink-0" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.29362 4.61797L5.59262 2.00197C5.63043 1.92626 5.68859 1.86259 5.76056 1.81808C5.83254 1.77357 5.91549 1.75 6.00012 1.75C6.08474 1.75 6.1677 1.77357 6.23967 1.81808C6.31165 1.86259 6.36981 1.92626 6.40762 2.00197L7.70662 4.61797L10.6106 5.03997C10.6944 5.05159 10.7732 5.08652 10.8381 5.14078C10.9029 5.19504 10.9512 5.26644 10.9774 5.34683C11.0037 5.42723 11.0068 5.51338 10.9864 5.59545C10.966 5.67752 10.9229 5.7522 10.8621 5.81097L8.76112 7.84597L9.25712 10.721C9.32062 11.09 8.93062 11.371 8.59712 11.197L6.00012 9.83897L3.40262 11.197C3.06962 11.3715 2.67962 11.09 2.74312 10.7205L3.23912 7.84547L1.13812 5.81047C1.07761 5.75166 1.03482 5.67705 1.0146 5.59513C0.994384 5.51321 0.997555 5.42725 1.02375 5.34704C1.04995 5.26683 1.09813 5.19558 1.1628 5.14139C1.22748 5.08719 1.30606 5.05223 1.38962 5.04047L4.29362 4.61797Z" fill="none" stroke="#FFCC00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              }
            }
          </div>
          <!-- Rating count (width: 42px, height: 14px, Poppins 400 10px, line-height 140%, letter-spacing: 0.4%, #777777) -->
          <span class="w-[42px] h-[14px] flex items-center font-['Poppins',sans-serif] font-normal text-[10px] leading-[140%] tracking-[0.004em] text-[#777777] whitespace-nowrap">
            {{ product().rating }} ({{ product().reviewsCount }})
          </span>
        </div>

        <!-- Price & Discount -->
        <div class="flex items-baseline gap-1.5 flex-wrap">
          <span class="text-[16px] font-extrabold text-[#222029] leading-none flex items-center gap-1">
            <img src="assets/aed-icon.svg" alt="AED" class="w-[12px] h-[12px] opacity-80 inline-block" />
            <span>{{ product().price | number:'1.2-2' }}</span>
          </span>
          <span class="text-[11px] text-[#A7A5AF] line-through leading-none">
            {{ product().originalPrice | number:'1.0-0' }}
          </span>
          <span class="text-[11px] font-bold text-[#E53935] leading-none">
            {{ product().discount }}
          </span>
        </div>

        <!-- Cash on Delivery Badge -->
        @if (product().isCashOnDelivery) {
          <div class="flex items-center gap-1 text-[10px] text-[#0DAC57] font-medium border border-[#0DAC57]/20 bg-[#E8F8EE] px-1.5 py-0.5 rounded w-max">
            <img src="assets/cash-on-delivery.svg" alt="COD" class="w-3.5 h-3 object-contain" />
            <span>{{ isRtl() ? 'الدفع عند الاستلام' : 'Cash On Delivery' }}</span>
          </div>
        }

        <!-- Tabby & Tamara Installment Badges -->
        <div class="flex items-center gap-2 mt-0.5">
          <!-- Tabby -->
          <div class="h-[18px] px-1.5 rounded-[4px] bg-[#E5FDF4] border border-[#3BFF9F]/30 flex items-center justify-center">
            <img src="assets/tabby-logo.svg" alt="Tabby" class="h-[11px] w-auto object-contain" />
          </div>
          <!-- Tamara -->
          <div class="h-[18px] px-1.5 rounded-[4px] bg-[#FFF5F0] border border-[#FF9800]/25 flex items-center justify-center">
            <img src="assets/tamara.svg" alt="Tamara" class="h-[11px] w-auto object-contain" />
          </div>
        </div>

      </div>

    </div>
  `
})
export class ProductCardComponent {
  product = input.required<Product>();
  isRtl = input<boolean>(false);
  isFavorite = signal<boolean>(false);
  currentImageIndex = signal<number>(0);
  showArrows = signal<boolean>(false);

  variantImages = computed(() => {
    const p = this.product();
    return p.images && p.images.length > 0 ? p.images : [p.image];
  });

  currentImage = computed(() => {
    const imgs = this.variantImages();
    return imgs[this.currentImageIndex() % imgs.length];
  });

  onImageClick(e: Event) {
    e.stopPropagation();
    this.showArrows.set(true);
  }

  prevVariant(e: Event) {
    e.stopPropagation();
    const len = this.variantImages().length;
    this.currentImageIndex.update(i => (i - 1 + len) % len);
  }

  nextVariant(e: Event) {
    e.stopPropagation();
    const len = this.variantImages().length;
    this.currentImageIndex.update(i => (i + 1) % len);
  }

  selectVariant(index: number, e: Event) {
    e.stopPropagation();
    this.currentImageIndex.set(index);
    this.showArrows.set(true);
  }

  toggleWishlist(e: Event) {
    e.stopPropagation();
    this.isFavorite.update(v => !v);
  }
}
