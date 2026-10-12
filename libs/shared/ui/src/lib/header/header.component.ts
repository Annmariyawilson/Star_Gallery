import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '@shared/data-access';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <header class="w-full bg-white shadow-xs z-50 sticky top-0 md:rounded-t-[12px]">
      
      <!-- Mobile Top Header (Visible on mobile < md) -->
      <div class="md:hidden px-3 pt-2 pb-2 bg-white border-b border-gray-100 flex flex-col gap-1.5">
        <!-- Row 1: Logo, Search Bar, Language Switcher -->
        <div class="flex items-center justify-between gap-2">
          <!-- Logo -->
          <a href="#" class="shrink-0 select-none">
            <img 
              src="assets/star-gallery-logo.svg" 
              alt="Star Gallery" 
              class="h-[28px] w-auto max-w-[110px] object-contain" 
            />
          </a>

          <!-- Search Bar -->
          <div class="flex-1 flex items-center h-[36px] border border-[#C2C1C9] rounded-[8px] bg-white overflow-hidden focus-within:border-[#0DAC57]">
            <input 
              type="text" 
              [placeholder]="dataService.isRtl() ? 'ما الذي تبحث عنه؟' : 'What are you looking for?'" 
              [value]="dataService.searchQuery()"
              (input)="onSearchInput($event)"
              class="w-full h-full px-2.5 text-[12px] text-[#222029] placeholder-[#AAAAAA] outline-hidden bg-transparent"
            />
            <button 
              type="button" 
              class="h-full px-3 bg-[#0DAC57] text-white flex items-center justify-center hover:bg-[#0b964b] transition cursor-pointer"
              aria-label="Search"
            >
              <i class="pi pi-search text-xs"></i>
            </button>
          </div>

          <!-- Language Switcher -->
          <button 
            type="button"
            (click)="dataService.toggleLanguage()"
            class="flex flex-col items-center justify-center text-[#57545B] hover:text-[#0DAC57] transition shrink-0 cursor-pointer"
            aria-label="Switch Language"
          >
            <img src="assets/globe-icon.svg" alt="Language" class="w-[18px] h-[18px]" />
            <span class="text-[9px] font-semibold mt-0.5 font-['Tajawal',sans-serif]">
              {{ dataService.isRtl() ? 'English' : 'العربية' }}
            </span>
          </button>
        </div>

        <!-- Row 2: Location Deliver To Bar -->
        <div class="flex items-center gap-1.5 text-[11px] text-[#222029] cursor-pointer pt-0.5">
          <div class="w-4 h-4 rounded-full bg-[#E53935] flex items-center justify-center text-white shrink-0">
            <i class="pi pi-map-marker text-[9px]"></i>
          </div>
          <span class="text-[#7F7B87] font-normal">{{ dataService.isRtl() ? 'التوصيل إلى' : 'Deliver to' }}</span>
          <span class="font-bold text-black truncate">57XC+WJ-Dubai</span>
          <i class="pi pi-chevron-down text-[9px] text-[#7F7B87]"></i>
        </div>
      </div>

      <!-- Desktop Top Navbar (Hidden on mobile < md) - 1512px x 75px, px 60px -->
      <div class="hidden md:flex w-full max-w-[1512px] mx-auto h-[75px] px-[60px] items-center justify-between bg-white">
        
        <!-- Left Section: Logo (152.83px), Deliver To (142.17px), Search Bar (558px) with exact 20px gap -->
        <div class="flex items-center gap-[20px] shrink-0">
          <!-- Logo -->
          <a 
            href="#" 
            class="h-[48px] flex items-center justify-center shrink-0 select-none group"
          >
            <img 
              src="assets/star-gallery-logo.svg" 
              alt="Star Gallery" 
              class="h-[48px] w-auto object-contain group-hover:scale-102 transition-transform" 
            />
          </a>

          <!-- Deliver To Dropdown (UAE Dubai, 142.17px) -->
          <div 
            class="hidden sm:flex flex-col justify-center gap-[4px] w-[142.17px] h-[48.08px] py-[4px] px-[12px] bg-[#F9F9F9] hover:bg-gray-100 transition rounded-[8px] cursor-pointer select-none shrink-0"
          >
            <!-- Deliver to label -->
            <span class="w-[47px] h-[14px] text-[10px] text-[#7F7B87] font-normal leading-[14px] tracking-[0.04em] whitespace-nowrap">
              {{ dataService.isRtl() ? 'التوصيل إلى' : 'Deliver to' }}
            </span>

            <!-- Bottom Row: Flag, Dubai, Chevron Icon (118.17px x 20px) -->
            <div class="w-[118.17px] h-[20px] flex items-center justify-between">
              <div class="flex items-center gap-[6px]">
                <!-- UAE Flag Mini SVG (26.67px x 20px, radius 1.67px) -->
                <div class="w-[26.67px] h-[20px] rounded-[1.67px] overflow-hidden flex shrink-0 shadow-2xs border border-gray-200/40">
                  <div class="w-[7px] h-full bg-[#FF0000]"></div>
                  <div class="flex-1 flex flex-col h-full">
                    <div class="h-1/3 bg-[#00732F]"></div>
                    <div class="h-1/3 bg-[#FFFFFF]"></div>
                    <div class="h-1/3 bg-[#000000]"></div>
                  </div>
                </div>

                <!-- Dubai City Name -->
                <span class="w-[36px] h-[20px] flex items-center text-[12px] font-medium text-black leading-none whitespace-nowrap">
                  {{ dataService.isRtl() ? 'دبي' : 'Dubai' }}
                </span>
              </div>

              <!-- Dropdown Icon (1.5px stroke chevron) -->
              <svg class="w-[7px] h-[13.5px] text-[#7F7B87] shrink-0" viewBox="0 0 7 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 5L3.5 7.5L6 5" stroke="#7F7B87" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>

          <!-- Search Bar (558px x 46px, exactly 20px gap from Deliver To) -->
          <div class="w-[558px] h-[46px] rounded-[12px] border-[0.5px] border-[#A7A5AF] bg-white flex items-center justify-between pt-[8px] pr-[2px] pb-[8px] pl-[12px] overflow-hidden focus-within:border-[#0DAC57] transition shrink-0">
            <input 
              type="text" 
              [placeholder]="dataService.isRtl() ? 'ما الذي تبحث عنه؟' : 'What are you looking for'" 
              [value]="dataService.searchQuery()"
              (input)="onSearchInput($event)"
              class="flex-1 h-full text-[12px] font-normal leading-[140%] text-[#222029] placeholder-[#AAAAAA] outline-hidden bg-transparent pr-2 font-['Poppins',sans-serif]"
            />
            <button 
              type="button" 
              class="w-[50px] h-[42px] rounded-r-[10px] bg-[#0DAC57] hover:bg-[#0b964b] transition flex items-center justify-center text-white shrink-0 cursor-pointer p-[4px]"
              aria-label="Search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 22 22" fill="none" class="w-[18px] h-[18px] text-white">
                <path d="M15.2103 13.6361C16.2996 12.1495 16.7874 10.3063 16.5763 8.47538C16.3652 6.64443 15.4706 4.96073 14.0715 3.76112C12.6725 2.56151 10.8721 1.93446 9.03069 2.00543C7.18923 2.07639 5.44246 2.84013 4.13986 4.14386C2.83725 5.44758 2.07486 7.19514 2.00523 9.0369C1.93559 10.8787 2.56384 12.6788 3.76428 14.0772C4.96472 15.4756 6.64882 16.3691 8.47966 16.579C10.3105 16.7888 12.1531 16.2995 13.6387 15.209H13.6376C13.6706 15.254 13.7073 15.2972 13.7478 15.3384L18.0789 19.6701C18.2898 19.8812 18.576 19.9999 18.8744 20C19.1728 20.0001 19.4591 19.8816 19.6702 19.6707C19.8812 19.4597 19.9999 19.1735 20 18.8751C20.0001 18.5766 19.8817 18.2903 19.6707 18.0792L15.3396 13.7475C15.2994 13.7068 15.2562 13.6703 15.2103 13.6361ZM15.5005 9.31117C15.5005 10.1238 15.3405 10.9285 15.0295 11.6793C14.7186 12.43 14.2628 13.1122 13.6883 13.6868C13.1138 14.2615 12.4317 14.7173 11.681 15.0283C10.9303 15.3392 10.1258 15.4993 9.31324 15.4993C8.50071 15.4993 7.69615 15.3392 6.94547 15.0283C6.1948 14.7173 5.51272 14.2615 4.93818 13.6868C4.36364 13.1122 3.90788 12.43 3.59695 11.6793C3.28601 10.9285 3.12597 10.1238 3.12597 9.31117C3.12597 7.66997 3.77784 6.096 4.93818 4.9355C6.09851 3.77499 7.67227 3.12303 9.31324 3.12303C10.9542 3.12303 12.528 3.77499 13.6883 4.9355C14.8486 6.096 15.5005 7.66997 15.5005 9.31117Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Right: Actions (Language, Account, Wishlist, Cart) - width 427px, height 75px, gap 20px -->
        <div class="w-[427px] h-[75px] flex items-center gap-[20px] shrink-0">
          
          <!-- Language Toggle Button (91.75px x 75px, gap 10px, padding 4px) -->
          <button 
            type="button"
            (click)="dataService.toggleLanguage()"
            class="w-[91.75px] h-[75px] p-[4px] flex flex-col items-center justify-center gap-[10px] text-[#57545B] hover:text-[#0DAC57] transition cursor-pointer select-none group bg-white shrink-0"
            aria-label="Switch Language"
          >
            <img 
              src="assets/globe-icon.svg" 
              alt="Language" 
              class="w-[24px] h-[24px] shrink-0 group-hover:scale-105 transition-transform" 
            />
            <span class="w-[34px] h-[17px] text-[12px] font-normal leading-[140%] text-[#57545B] group-hover:text-[#0DAC57] transition-colors text-center font-['Tajawal',sans-serif] whitespace-nowrap">
              {{ dataService.isRtl() ? 'English' : 'العربية' }}
            </span>
          </button>

          <!-- Account (91.75px x 75px, gap 10px, padding 4px) -->
          <a href="#" class="w-[91.75px] h-[75px] p-[4px] flex flex-col items-center justify-center gap-[10px] text-[#57545B] hover:text-[#0DAC57] transition group shrink-0">
            <img src="assets/user.svg" alt="Account" class="w-[24px] h-[24px] group-hover:scale-105 transition-transform shrink-0" />
            <span class="text-[12px] font-normal leading-[140%] text-[#57545B] group-hover:text-[#0DAC57] transition-colors text-center whitespace-nowrap font-['Poppins',sans-serif]">
              {{ dataService.isRtl() ? 'حسابي' : 'Account' }}
            </span>
          </a>

          <!-- Wishlist (91.75px x 75px, gap 10px, padding 4px) -->
          <a href="#" class="w-[91.75px] h-[75px] p-[4px] flex flex-col items-center justify-center gap-[10px] text-[#57545B] hover:text-[#B33036] transition group shrink-0">
            <img src="assets/heart.svg" alt="Wishlist" class="w-[24px] h-[24px] group-hover:scale-105 transition-transform shrink-0" />
            <span class="text-[12px] font-normal leading-[140%] text-[#57545B] group-hover:text-[#B33036] transition-colors text-center whitespace-nowrap font-['Poppins',sans-serif]">
              {{ dataService.isRtl() ? 'المفضلة' : 'Wishlist' }}
            </span>
          </a>

          <!-- Cart (91.75px x 75px, gap 10px, padding 4px) -->
          <a href="#" class="w-[91.75px] h-[75px] p-[4px] flex flex-col items-center justify-center gap-[10px] text-[#57545B] hover:text-[#0DAC57] transition group shrink-0">
            <img src="assets/shopping-cart.svg" alt="Cart" class="w-[24px] h-[24px] group-hover:scale-105 transition-transform shrink-0" />
            <span class="text-[12px] font-normal leading-[140%] text-[#57545B] group-hover:text-[#0DAC57] transition-colors text-center whitespace-nowrap font-['Poppins',sans-serif]">
              {{ dataService.isRtl() ? 'السلة' : 'Cart' }}
            </span>
          </a>

        </div>
      </div>

      <!-- Categories & Sub-Navigation Bar (Desktop only, hidden on mobile) - width: 1512px, height: 48px, background: #FBFBFC, border-y -->
      <div class="hidden md:block w-full bg-[#FBFBFC] border-t border-b border-[#E0E0E5]">
        <div class="max-w-[1512px] w-full mx-auto h-[48px] px-[60px] flex items-center justify-between">
          
          <!-- Left Section: Categories button + Nav Links (width: 940px, showing Ca> with chevron matching Image 2) -->
          <div class="w-[940px] h-[48px] flex items-center gap-[20px] relative overflow-hidden shrink-0">
            <!-- Categories Dropdown Button (149px x 48px, only hover display white) -->
            <button 
              type="button" 
              class="w-[149px] h-[48px] p-[12px] bg-transparent text-[#222029] rounded-tr-[12px] rounded-bl-[12px] border border-transparent hover:bg-white hover:border-[#E0E0E5] flex items-center gap-[4px] transition shrink-0 cursor-pointer select-none"
            >
              <!-- 4-Square Category Icon (24px x 24px) -->
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="w-[24px] h-[24px] shrink-0" xmlns="http://www.w3.org/2000/svg">
                <rect x="3.5" y="3.5" width="6.5" height="6.5" rx="1.5" stroke="#222029" stroke-width="1.8"/>
                <rect x="14" y="3.5" width="6.5" height="6.5" rx="1.5" stroke="#222029" stroke-width="1.8"/>
                <rect x="3.5" y="14" width="6.5" height="6.5" rx="1.5" stroke="#222029" stroke-width="1.8"/>
                <rect x="14" y="14" width="6.5" height="6.5" rx="1.5" stroke="#222029" stroke-width="1.8"/>
              </svg>
              <!-- Categories Label (width: 89px, height: 24px, 16px Poppins 400 capitalize) -->
              <span class="w-[89px] h-[24px] flex items-center font-['Poppins',sans-serif] font-normal text-[16px] leading-none capitalize text-[#222029] whitespace-nowrap">
                {{ dataService.isRtl() ? 'الفئات' : 'Categories' }}
              </span>
            </button>

            <!-- Navigation Links Container (gap between each text is 20px) -->
            <nav class="flex-1 h-[48px] flex items-center gap-[20px] text-[16px] leading-[140%] font-normal text-[#222029] whitespace-nowrap font-['Poppins',sans-serif] overflow-hidden">
              <a href="#" class="h-[48px] flex items-center hover:text-[#0DAC57] transition shrink-0">{{ dataService.isRtl() ? 'الإلكترونيات' : 'Electronics' }}</a>
              <a href="#" class="h-[48px] flex items-center hover:text-[#0DAC57] transition shrink-0">{{ dataService.isRtl() ? 'المنزل والمطبخ' : 'Home & Kitchen' }}</a>
              <a href="#" class="h-[48px] flex items-center hover:text-[#0DAC57] transition shrink-0">{{ dataService.isRtl() ? 'الإلكترونيات' : 'Electronics' }}</a>
              <a href="#" class="h-[48px] flex items-center hover:text-[#0DAC57] transition shrink-0">{{ dataService.isRtl() ? 'الحديقة والأنشطة الخارجية' : 'Outdoor & Garden' }}</a>
              <a href="#" class="h-[48px] flex items-center hover:text-[#0DAC57] transition shrink-0">{{ dataService.isRtl() ? 'الملابس والإكسسوارات' : 'Clothing & Accessories' }}</a>
              <a href="#" class="h-[48px] flex items-center hover:text-[#0DAC57] transition shrink-0">{{ dataService.isRtl() ? 'إكسسوارات السيارات' : 'Car Accessories' }}</a>
            </nav>

            <!-- fluent:ios-arrow-24-filled chevron with linear-gradient background (width 21.6px, height 48px, vector 9.17px x 17.5px) -->
            <div 
              class="absolute end-0 top-0 h-[48px] w-[26px] flex items-center justify-end pointer-events-none" 
              [style.background]="dataService.isRtl() 
                ? 'linear-gradient(270deg, rgba(251, 251, 252, 0) 0%, #FCFBFC 35%, #FCFBFC 100%)' 
                : 'linear-gradient(90deg, rgba(251, 251, 252, 0) 0%, #FCFBFC 35%, #FCFBFC 100%)'"
            >
              <svg width="10" height="18" viewBox="0 0 10 18" fill="none" class="me-0.5 shrink-0" [class.rotate-180]="dataService.isRtl()" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 1.5L8 9L1.5 16.5" stroke="#57545B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>

          <!-- Right Promotional App Store Banner (width: 240px, height: 48px) -->
          <a href="#" class="w-[240px] h-[48px] flex items-center justify-end shrink-0 hover:opacity-95 transition">
            <img 
              src="assets/app.webp" 
              alt="Download Our App Now" 
              class="w-[240px] h-[48px] object-contain rounded-[4px]" 
            />
          </a>

        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {
  dataService: DataService = inject(DataService);

  onSearchInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.dataService.setSearchQuery(target.value);
  }
}
