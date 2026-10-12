import { Component, inject, ViewChild, ElementRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '@shared/data-access';

@Component({
  selector: 'app-category-slider',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="max-w-[1352px] w-full mx-auto px-3 md:px-0 mt-4 md:mt-6 mb-0">
      <!-- Mobile view: 2-row paginated grid -->
      <div class="md:hidden">
        <div 
          #mobileScrollContainer
          (scroll)="onMobileScroll()"
          class="grid grid-rows-2 grid-flow-col auto-cols-[calc(25%-6px)] gap-x-2.5 gap-y-3 overflow-x-auto no-scrollbar py-1 scroll-smooth"
        >
          @for (cat of dataService.categories(); track cat.id) {
            <div 
              (click)="dataService.selectCategory(cat.id)"
              class="flex flex-col items-center cursor-pointer select-none"
            >
              <div 
                class="w-[62px] h-[62px] rounded-full bg-[#F3F4F6] p-1 flex items-center justify-center overflow-hidden transition-all shadow-xs"
                [class.ring-2]="dataService.selectedCategoryId() === cat.id"
                [class.ring-[#0DAC57]]="dataService.selectedCategoryId() === cat.id"
              >
                <img 
                  [src]="cat.image" 
                  [alt]="cat.name" 
                  class="w-full h-full object-cover rounded-full"
                  loading="lazy"
                />
              </div>
              <span 
                class="text-[10px] font-medium text-center line-clamp-1 leading-tight mt-1 transition text-[#242424]"
                [class.text-[#0DAC57]]="dataService.selectedCategoryId() === cat.id"
                [class.font-bold]="dataService.selectedCategoryId() === cat.id"
              >
                {{ dataService.isRtl() ? cat.nameAr : cat.name }}
              </span>
            </div>
          }
        </div>

        <!-- Mobile pagination dots -->
        <div class="flex items-center justify-center gap-1.5 mt-2.5">
          <button
            type="button"
            (click)="scrollMobileToPage(0)"
            class="h-1 rounded-full transition-all duration-300 cursor-pointer p-0 border-0"
            [ngClass]="mobilePage() === 0 ? 'w-6 bg-[#1A3826]' : 'w-4 bg-[#E0E0E0]'"
            aria-label="Category Page 1"
          ></button>
          <button
            type="button"
            (click)="scrollMobileToPage(1)"
            class="h-1 rounded-full transition-all duration-300 cursor-pointer p-0 border-0"
            [ngClass]="mobilePage() === 1 ? 'w-6 bg-[#1A3826]' : 'w-4 bg-[#E0E0E0]'"
            aria-label="Category Page 2"
          ></button>
        </div>
      </div>

      <!-- Desktop view: horizontal scroll container -->
      <div class="hidden md:block relative w-[1352px] h-[188px] bg-[#FBFBFC] rounded-[12px] mx-auto overflow-visible">
        <!-- Floating navigation buttons -->
        <div class="absolute -start-[21px] top-[61px] w-[1394px] h-[48px] flex justify-between items-center pointer-events-none z-20">
          <button 
            type="button"
            (click)="scrollLeft()"
            class="w-[48px] h-[48px] rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-[#CECDD4]/60 flex items-center justify-center text-[#7F7B87] hover:text-black hover:scale-105 active:scale-95 transition cursor-pointer pointer-events-auto"
            aria-label="Previous Categories"
          >
            <img src="assets/left-arrow.svg" alt="Previous" class="w-[12px] h-[16px]" [class.rotate-180]="dataService.isRtl()" />
          </button>

          <button 
            type="button"
            (click)="scrollRight()"
            class="w-[48px] h-[48px] rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-[#CECDD4]/60 flex items-center justify-center text-[#7F7B87] hover:text-black hover:scale-105 active:scale-95 transition cursor-pointer pointer-events-auto"
            aria-label="Next Categories"
          >
            <img src="assets/right-arrow.svg" alt="Next" class="w-[12px] h-[16px]" [class.rotate-180]="dataService.isRtl()" />
          </button>
        </div>

        <div 
          #scrollContainer
          (scroll)="onDesktopScroll()"
          class="w-[1352px] h-[164px] flex items-center gap-[16px] overflow-x-auto no-scrollbar scroll-smooth rounded-[12px] px-[16px]"
        >
          @for (cat of dataService.categories(); track cat.id) {
            <div 
              (click)="dataService.selectCategory(cat.id)"
              class="w-[130px] h-[164px] shrink-0 rounded-[12px] bg-[#FBFBFB] flex flex-col items-center gap-[8px] pl-[8px] pr-[8px] pb-[8px] pt-0 cursor-pointer select-none transition-all duration-200 hover:shadow-xs group/item"
              [class.ring-2]="dataService.selectedCategoryId() === cat.id"
              [class.ring-[#0DAC57]]="dataService.selectedCategoryId() === cat.id"
            >
              <div class="w-[114px] h-[128px] shrink-0 flex items-center justify-center overflow-hidden">
                <img 
                  [src]="cat.image" 
                  [alt]="cat.name" 
                  class="w-full h-full object-contain group-hover/item:scale-105 transition duration-300"
                  loading="lazy"
                />
              </div>

              <span 
                class="font-['Poppins',sans-serif] font-medium text-[14px] leading-[140%] text-center text-[#000000] truncate w-full group-hover/item:text-[#0DAC57] transition"
              >
                {{ dataService.isRtl() ? cat.nameAr : cat.name }}
              </span>
            </div>
          }
        </div>

        <!-- Desktop pagination bar -->
        <div class="h-[24px] flex items-center justify-center gap-1.5">
          <button
            type="button"
            (click)="scrollDesktopToPage(0)"
            class="h-[3px] rounded-full transition-all duration-300 cursor-pointer p-0 border-0"
            [ngClass]="desktopPage() === 0 ? 'w-8 bg-[#1A3826]' : 'w-8 bg-[#E0E0E5]'"
            aria-label="Category Page 1"
          ></button>
          <button
            type="button"
            (click)="scrollDesktopToPage(1)"
            class="h-[3px] rounded-full transition-all duration-300 cursor-pointer p-0 border-0"
            [ngClass]="desktopPage() === 1 ? 'w-8 bg-[#1A3826]' : 'w-8 bg-[#E0E0E5]'"
            aria-label="Category Page 2"
          ></button>
        </div>
      </div>
    </section>
  `
})
export class CategorySliderComponent {
  readonly dataService = inject(DataService);
  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('mobileScrollContainer') mobileScrollContainer!: ElementRef<HTMLDivElement>;

  readonly desktopPage = signal<number>(0);
  readonly mobilePage = signal<number>(0);

  scrollLeft() {
    const el = this.scrollContainer.nativeElement;
    const offset = this.dataService.isRtl() ? 320 : -320;
    el.scrollBy({ left: offset, behavior: 'smooth' });
    setTimeout(() => this.updateDesktopPage(), 250);
  }

  scrollRight() {
    const el = this.scrollContainer.nativeElement;
    const offset = this.dataService.isRtl() ? -320 : 320;
    el.scrollBy({ left: offset, behavior: 'smooth' });
    setTimeout(() => this.updateDesktopPage(), 250);
  }

  onDesktopScroll() {
    this.updateDesktopPage();
  }

  updateDesktopPage() {
    if (!this.scrollContainer) return;
    const el = this.scrollContainer.nativeElement;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      this.desktopPage.set(0);
      return;
    }
    const current = Math.abs(el.scrollLeft);
    const progress = Math.min(1, Math.max(0, current / maxScroll));
    const page = Math.round(progress * 2);
    this.desktopPage.set(page);
  }

  scrollDesktopToPage(page: number) {
    if (!this.scrollContainer) return;
    const el = this.scrollContainer.nativeElement;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) return;
    const target = (page / 2) * maxScroll;
    const targetLeft = this.dataService.isRtl() ? -target : target;
    el.scrollTo({ left: targetLeft, behavior: 'smooth' });
    this.desktopPage.set(page);
  }

  onMobileScroll() {
    if (!this.mobileScrollContainer) return;
    const el = this.mobileScrollContainer.nativeElement;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      this.mobilePage.set(0);
      return;
    }
    const current = Math.abs(el.scrollLeft);
    const progress = current / maxScroll;
    this.mobilePage.set(progress > 0.4 ? 1 : 0);
  }

  scrollMobileToPage(page: number) {
    if (!this.mobileScrollContainer) return;
    const el = this.mobileScrollContainer.nativeElement;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const target = page === 0 ? 0 : maxScroll;
    const targetLeft = this.dataService.isRtl() ? -target : target;
    el.scrollTo({ left: targetLeft, behavior: 'smooth' });
    this.mobilePage.set(page);
  }
}
