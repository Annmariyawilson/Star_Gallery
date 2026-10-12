import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '@shared/data-access';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="w-full max-w-[1512px] mx-auto min-h-[745px] bg-white text-[#222029] mt-8 md:mt-16 flex flex-col gap-[28px] rounded-b-[12px] overflow-hidden select-none">
      <!-- Feature highlights -->
      <div class="w-full max-w-[1512px] h-[132px] bg-[#F3F6F9] border-t border-b border-[#C2C1C9] shrink-0">
        <div class="w-full max-w-[1512px] h-[132px] mx-auto grid grid-cols-4 items-center">
          <div class="w-full max-w-[378px] h-[132px] py-[32px] px-[10px] flex flex-col items-center justify-center gap-[12px] text-center mx-auto">
            <div class="w-[26.67px] h-[21.33px] flex items-center justify-center shrink-0">
              <img src="assets/delivery-car-2.svg" alt="Fast Shipping" class="w-[26.67px] h-[21.33px] object-contain" />
            </div>
            <span class="w-[110px] h-[24px] flex items-center justify-center font-['Poppins',sans-serif] font-medium text-[16px] leading-[100%] text-[#000000] text-center whitespace-nowrap">
              {{ dataService.isRtl() ? 'شحن سريع' : 'Fast Shipping' }}
            </span>
          </div>

          <div class="w-full max-w-[378px] h-[132px] py-[32px] px-[10px] flex flex-col items-center justify-center gap-[12px] text-center mx-auto">
            <div class="w-[26.67px] h-[21.33px] flex items-center justify-center shrink-0">
              <img src="assets/package-hand.svg" alt="shipping methods" class="w-[26.67px] h-[21.33px] object-contain" />
            </div>
            <span class="h-[24px] flex items-center justify-center font-['Poppins',sans-serif] font-medium text-[16px] leading-[100%] text-[#000000] text-center whitespace-nowrap">
              {{ dataService.isRtl() ? 'طرق الشحن' : 'shipping methods' }}
            </span>
          </div>

          <div class="w-full max-w-[378px] h-[132px] py-[32px] px-[10px] flex flex-col items-center justify-center gap-[12px] text-center mx-auto">
            <div class="w-[26.67px] h-[21.33px] flex items-center justify-center shrink-0">
              <img src="assets/shield-check.svg" alt="Secure Transactions" class="w-[26.67px] h-[21.33px] object-contain" />
            </div>
            <span class="h-[24px] flex items-center justify-center font-['Poppins',sans-serif] font-medium text-[16px] leading-[100%] text-[#000000] text-center whitespace-nowrap">
              {{ dataService.isRtl() ? 'معاملات آمنة' : 'Secure Transactions' }}
            </span>
          </div>

          <div class="w-full max-w-[378px] h-[132px] py-[32px] px-[10px] flex flex-col items-center justify-center gap-[12px] text-center mx-auto">
            <div class="w-[26.67px] h-[21.33px] flex items-center justify-center shrink-0">
              <img src="assets/chat-support.svg" alt="Support" class="w-[26.67px] h-[21.33px] object-contain" />
            </div>
            <span class="h-[24px] flex items-center justify-center font-['Poppins',sans-serif] font-medium text-[16px] leading-[100%] text-[#000000] text-center whitespace-nowrap">
              {{ dataService.isRtl() ? 'دعم 24/7' : '24/7 Support' }}
            </span>
          </div>
        </div>
      </div>

      <!-- Mobile footer accordion & details -->
      <div class="md:hidden px-4 py-6 flex flex-col items-center text-center">
        <a href="#" class="select-none mb-3">
          <img src="assets/star-gallery-logo.svg" alt="Star Gallery" class="h-8 w-auto object-contain" />
        </a>

        <span class="text-[12px] font-bold text-black mb-2">
          {{ dataService.isRtl() ? 'تابعنا للحصول على عروض حصرية' : 'Follow us for exclusive deals' }}
        </span>

        <div class="flex items-center justify-center gap-2 mb-4">
          <a href="#" class="hover:scale-105 transition" title="Snapchat">
            <img src="assets/snapchat-icon.svg" alt="Snapchat" class="w-[30px] h-[30px] object-contain" />
          </a>
          <a href="#" class="hover:scale-105 transition" title="YouTube">
            <img src="assets/youtube-icon.svg" alt="YouTube" class="w-[30px] h-[30px] object-contain" />
          </a>
          <a href="#" class="hover:scale-105 transition" title="Instagram">
            <img src="assets/instagram-icon.svg" alt="Instagram" class="w-[30px] h-[30px] object-contain" />
          </a>
          <a href="#" class="hover:scale-105 transition" title="Facebook">
            <img src="assets/facebook-icon.svg" alt="Facebook" class="w-[30px] h-[30px] object-contain" />
          </a>
          <a href="#" class="hover:scale-105 transition" title="X (Twitter)">
            <img src="assets/x-icon.svg" alt="X" class="w-[30px] h-[30px] object-contain" />
          </a>
        </div>

        <span class="text-[13px] font-bold text-black mb-2">
          {{ dataService.isRtl() ? 'تسوق في أي وقت، من أي مكان!' : 'Shopping Anytime, Anywhere!' }}
        </span>

        <div class="flex items-center justify-center gap-2 mb-6">
          <a href="#" class="hover:opacity-85 transition">
            <img src="assets/Google_Play_Store_badge_EN.svg" alt="Google Play" class="h-[32px] w-auto" />
          </a>
          <a href="#" class="hover:opacity-85 transition">
            <img src="assets/App_Store_Badge.svg" alt="App Store" class="h-[32px] w-auto" />
          </a>
        </div>

        <!-- Accordion navigation -->
        <div class="w-full border-t border-gray-100 text-start divide-y divide-gray-100 mb-6">
          <div>
            <button 
              type="button"
              (click)="toggleElectronics()"
              class="w-full py-3 flex items-center justify-between text-[14px] font-bold text-black"
            >
              <span>{{ dataService.isRtl() ? 'إلكترونيات' : 'Electronics' }}</span>
              <i class="pi text-xs text-gray-500 transition-transform" [class.pi-chevron-down]="!isElectronicsOpen()" [class.pi-chevron-up]="isElectronicsOpen()"></i>
            </button>
            @if (isElectronicsOpen()) {
              <ul class="pb-3 space-y-1.5 text-[12.5px] text-[#68656E]">
                <li><a href="#">Mobile & Accessories</a></li>
                <li><a href="#">Tablets & Accessories</a></li>
                <li><a href="#">Computer & Accessories</a></li>
                <li><a href="#">TV & Monitors</a></li>
                <li><a href="#">Speakers And Microphones</a></li>
              </ul>
            }
          </div>

          <div>
            <button 
              type="button"
              (click)="toggleHome()"
              class="w-full py-3 flex items-center justify-between text-[14px] font-bold text-black"
            >
              <span>{{ dataService.isRtl() ? 'المنزل والمطبخ' : 'Home & Kitchen' }}</span>
              <i class="pi text-xs text-gray-500 transition-transform" [class.pi-chevron-down]="!isHomeOpen()" [class.pi-chevron-up]="isHomeOpen()"></i>
            </button>
            @if (isHomeOpen()) {
              <ul class="pb-3 space-y-1.5 text-[12.5px] text-[#68656E]">
                <li><a href="#">Kitchen Appliances</a></li>
                <li><a href="#">Home Appliances</a></li>
                <li><a href="#">Lights</a></li>
                <li><a href="#">Coffee & Tea</a></li>
              </ul>
            }
          </div>

          <div>
            <button 
              type="button"
              (click)="toggleCar()"
              class="w-full py-3 flex items-center justify-between text-[14px] font-bold text-black"
            >
              <span>{{ dataService.isRtl() ? 'إكسسوارات السيارات' : 'Car Accessories' }}</span>
              <i class="pi text-xs text-gray-500 transition-transform" [class.pi-chevron-down]="!isCarOpen()" [class.pi-chevron-up]="isCarOpen()"></i>
            </button>
            @if (isCarOpen()) {
              <ul class="pb-3 space-y-1.5 text-[12.5px] text-[#68656E]">
                <li><a href="#">Jump Starters</a></li>
                <li><a href="#">Car Video Receivers</a></li>
                <li><a href="#">Air Compressors</a></li>
                <li><a href="#">Car Electric Kettles</a></li>
              </ul>
            }
          </div>
        </div>

        <!-- Contact box (Mobile) -->
        <div class="w-full rounded-[14px] bg-[#0DAC57] p-4 text-white shadow-sm text-start mb-6">
          <h4 class="text-[15px] font-bold mb-3">{{ dataService.isRtl() ? 'تواصل معنا' : 'Connect With Us' }}</h4>
          
          <div class="space-y-2.5">
            <div class="flex items-center gap-3 bg-[#028F44] p-2.5 rounded-[8px]">
              <i class="pi pi-phone text-white text-base"></i>
              <div>
                <div class="text-[10.5px] font-medium text-white/90">{{ dataService.isRtl() ? 'رقم الهاتف' : 'Phone Number' }}</div>
                <a href="tel:+96600000000" class="text-[12.5px] font-semibold text-white dir-ltr inline-block">+96600000000</a>
              </div>
            </div>

            <div class="flex items-center gap-3 bg-[#028F44] p-2.5 rounded-[8px]">
              <i class="pi pi-envelope text-white text-base"></i>
              <div>
                <div class="text-[10.5px] font-medium text-white/90">{{ dataService.isRtl() ? 'البريد الإلكتروني' : 'E-Mail' }}</div>
                <a href="mailto:Example@Gmail.Com" class="text-[12px] font-semibold text-white">Example&#64;Gmail.Com</a>
              </div>
            </div>
          </div>
        </div>

        <div class="w-full flex flex-col items-center gap-2.5 mb-4">
          <div class="flex items-center justify-center gap-6">
            <img src="assets/cash-on-delivery.svg" alt="Card" class="h-[20px] w-auto object-contain" />
            <img src="assets/apple-pay-badge.svg" alt="Apple Pay" class="h-[20px] w-auto object-contain" />
            <img src="assets/mastercard-logo.svg" alt="Mastercard" class="h-[20px] w-auto object-contain" />
          </div>
          <div class="flex items-center justify-center gap-6">
            <img src="assets/visa-logo.svg" alt="VISA" class="h-[18px] w-auto object-contain" />
            <img src="assets/tabby-logo.svg" alt="Tabby" class="h-[18px] w-auto object-contain" />
            <img src="assets/tamara.svg" alt="Tamara" class="h-[18px] w-auto object-contain" />
          </div>
        </div>

        <div class="flex flex-col items-center justify-center gap-1.5 text-[11px] text-[#7F7B87] mb-3">
          <div class="flex items-center justify-center gap-4">
            <a href="#" class="hover:text-black">Contact Us</a>
            <a href="#" class="hover:text-black">Privacy Policy</a>
            <a href="#" class="hover:text-black">Terms & Conditions</a>
          </div>
          <div class="flex items-center justify-center gap-4">
            <a href="#" class="hover:text-black">Returns & Refunds</a>
            <a href="#" class="hover:text-black">Service & Warranty</a>
          </div>
        </div>

        <span class="text-[10.5px] text-[#A7A5AF]">
          © 2025 STAR GALLERY MART . All rights reserved
        </span>
      </div>

      <!-- Desktop footer middle navigation & contact -->
      <div class="hidden md:flex w-full max-w-[1512px] h-[235px] px-[80px] items-start gap-[20px] shrink-0">
        <div class="w-[829px] h-[235px] flex items-start gap-[49px] shrink-0">
          <!-- Column 1: Electronics -->
          <div class="w-[191px] h-[235px] flex flex-col gap-[16px] shrink-0">
            <h4 class="w-[91px] h-[24px] font-['Poppins',sans-serif] font-bold text-[16px] leading-[100%] text-[#000000] flex items-center">
              {{ dataService.isRtl() ? 'إلكترونيات' : 'Electronics' }}
            </h4>
            <ul class="w-[191px] h-[195px] flex flex-col gap-[15px] p-0 m-0 list-none">
              <li class="h-[20px] flex items-center">
                <a href="#" class="h-[20px] flex items-center font-['Poppins',sans-serif] font-normal text-[14px] leading-[140%] text-[#68656E] hover:text-[#0DAC57] capitalize transition truncate">
                  {{ dataService.isRtl() ? 'الهواتف وملحقاتها' : 'Mobile & Accessories' }}
                </a>
              </li>
              <li class="h-[20px] flex items-center">
                <a href="#" class="h-[20px] flex items-center font-['Poppins',sans-serif] font-normal text-[14px] leading-[140%] text-[#68656E] hover:text-[#0DAC57] capitalize transition truncate">
                  {{ dataService.isRtl() ? 'الأجهزة اللوحية' : 'Tablets & Accessories' }}
                </a>
              </li>
              <li class="h-[20px] flex items-center">
                <a href="#" class="h-[20px] flex items-center font-['Poppins',sans-serif] font-normal text-[14px] leading-[140%] text-[#68656E] hover:text-[#0DAC57] capitalize transition truncate">
                  {{ dataService.isRtl() ? 'الكمبيوتر ولوازمها' : 'Computer & Accessories' }}
                </a>
              </li>
              <li class="h-[20px] flex items-center">
                <a href="#" class="h-[20px] flex items-center font-['Poppins',sans-serif] font-normal text-[14px] leading-[140%] text-[#68656E] hover:text-[#0DAC57] capitalize transition truncate">
                  {{ dataService.isRtl() ? 'الشاشات والتلفزيونات' : 'TV & Monitors' }}
                </a>
              </li>
              <li class="h-[20px] flex items-center">
                <a href="#" class="h-[20px] flex items-center font-['Poppins',sans-serif] font-normal text-[14px] leading-[140%] text-[#68656E] hover:text-[#0DAC57] capitalize transition truncate">
                  {{ dataService.isRtl() ? 'السماعات ومكبرات الصوت' : 'Speakers And Microphones' }}
                </a>
              </li>
              <li class="h-[20px] flex items-center">
                <a href="#" class="h-[20px] flex items-center font-['Poppins',sans-serif] font-normal text-[14px] leading-[140%] text-[#68656E] hover:text-[#0DAC57] capitalize transition truncate">
                  {{ dataService.isRtl() ? 'الموازين الذكية' : 'Weight And Scales' }}
                </a>
              </li>
            </ul>
          </div>

          <!-- Column 2: Home & Kitchen -->
          <div class="w-[191px] h-[235px] flex flex-col gap-[16px] shrink-0">
            <h4 class="h-[24px] font-['Poppins',sans-serif] font-bold text-[16px] leading-[100%] text-[#000000] flex items-center">
              {{ dataService.isRtl() ? 'المنزل والمطبخ' : 'Home & Kitchen' }}
            </h4>
            <ul class="w-[191px] h-[195px] flex flex-col gap-[15px] p-0 m-0 list-none">
              <li class="h-[20px] flex items-center">
                <a href="#" class="h-[20px] flex items-center font-['Poppins',sans-serif] font-normal text-[14px] leading-[140%] text-[#68656E] hover:text-[#0DAC57] capitalize transition truncate">
                  {{ dataService.isRtl() ? 'أجهزة المطبخ' : 'Kitchen Appliances' }}
                </a>
              </li>
              <li class="h-[20px] flex items-center">
                <a href="#" class="h-[20px] flex items-center font-['Poppins',sans-serif] font-normal text-[14px] leading-[140%] text-[#68656E] hover:text-[#0DAC57] capitalize transition truncate">
                  {{ dataService.isRtl() ? 'الأجهزة المنزلية' : 'Home Appliances' }}
                </a>
              </li>
              <li class="h-[20px] flex items-center">
                <a href="#" class="h-[20px] flex items-center font-['Poppins',sans-serif] font-normal text-[14px] leading-[140%] text-[#68656E] hover:text-[#0DAC57] capitalize transition truncate">
                  {{ dataService.isRtl() ? 'الإضاءة الحديثة' : 'Lights' }}
                </a>
              </li>
              <li class="h-[20px] flex items-center">
                <a href="#" class="h-[20px] flex items-center font-['Poppins',sans-serif] font-normal text-[14px] leading-[140%] text-[#68656E] hover:text-[#0DAC57] capitalize transition truncate">
                  {{ dataService.isRtl() ? 'القهوة والشاي' : 'Coffee & Tea' }}
                </a>
              </li>
              <li class="h-[20px] flex items-center">
                <a href="#" class="h-[20px] flex items-center font-['Poppins',sans-serif] font-normal text-[14px] leading-[140%] text-[#68656E] hover:text-[#0DAC57] capitalize transition truncate">
                  {{ dataService.isRtl() ? 'أدوات ومعدات' : 'Tools & Equipment' }}
                </a>
              </li>
              <li class="h-[20px] flex items-center">
                <a href="#" class="h-[20px] flex items-center font-['Poppins',sans-serif] font-normal text-[14px] leading-[140%] text-[#68656E] hover:text-[#0DAC57] capitalize transition truncate">
                  {{ dataService.isRtl() ? 'مستلزمات الحمام' : 'Bathroom Fixtures' }}
                </a>
              </li>
            </ul>
          </div>

          <!-- Column 3: Car Accessories -->
          <div class="w-[191px] h-[235px] flex flex-col gap-[16px] shrink-0">
            <h4 class="h-[24px] font-['Poppins',sans-serif] font-bold text-[16px] leading-[100%] text-[#000000] flex items-center">
              {{ dataService.isRtl() ? 'إكسسوارات السيارات' : 'Car Accessories' }}
            </h4>
            <ul class="w-[191px] h-[195px] flex flex-col gap-[15px] p-0 m-0 list-none">
              <li class="h-[20px] flex items-center">
                <a href="#" class="h-[20px] flex items-center font-['Poppins',sans-serif] font-normal text-[14px] leading-[140%] text-[#68656E] hover:text-[#0DAC57] capitalize transition truncate">
                  {{ dataService.isRtl() ? 'شواحن بطاريات ومولدات' : 'Jump Starters' }}
                </a>
              </li>
              <li class="h-[20px] flex items-center">
                <a href="#" class="h-[20px] flex items-center font-['Poppins',sans-serif] font-normal text-[14px] leading-[140%] text-[#68656E] hover:text-[#0DAC57] capitalize transition truncate">
                  {{ dataService.isRtl() ? 'شاشات وكاميرات السيارات' : 'Car Video Receivers' }}
                </a>
              </li>
              <li class="h-[20px] flex items-center">
                <a href="#" class="h-[20px] flex items-center font-['Poppins',sans-serif] font-normal text-[14px] leading-[140%] text-[#68656E] hover:text-[#0DAC57] capitalize transition truncate">
                  {{ dataService.isRtl() ? 'منفاخ هواء الإطارات' : 'Air Compressors' }}
                </a>
              </li>
              <li class="h-[20px] flex items-center">
                <a href="#" class="h-[20px] flex items-center font-['Poppins',sans-serif] font-normal text-[14px] leading-[140%] text-[#68656E] hover:text-[#0DAC57] capitalize transition truncate">
                  {{ dataService.isRtl() ? 'غلايات كهربائية للسيارة' : 'Car Electric Kettles' }}
                </a>
              </li>
              <li class="h-[20px] flex items-center">
                <a href="#" class="h-[20px] flex items-center font-['Poppins',sans-serif] font-normal text-[14px] leading-[140%] text-[#68656E] hover:text-[#0DAC57] capitalize transition truncate">
                  {{ dataService.isRtl() ? 'حوامل هواتف للسيارات' : 'Car Mobile Holders' }}
                </a>
              </li>
              <li class="h-[20px] flex items-center">
                <a href="#" class="h-[20px] flex items-center font-['Poppins',sans-serif] font-normal text-[14px] leading-[140%] text-[#68656E] hover:text-[#0DAC57] capitalize transition truncate">
                  {{ dataService.isRtl() ? 'مجموعات تنظيف السيارات' : 'Car Cleaning Kits' }}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Connect With Us Card -->
        <div 
          class="w-[503px] h-[235px] rounded-[8px] pt-[16px] pb-[16px] px-[24px] flex flex-col gap-[24px] text-white shadow-sm shrink-0 box-border"
          style="background: linear-gradient(202.92deg, #0DAC57 0%, #006E33 100%);"
        >
          <div class="w-[455px] h-[28px] flex items-center shrink-0">
            <h4 class="h-[28px] font-['Poppins',sans-serif] font-bold text-[16px] leading-[28px] tracking-[0px] text-white flex items-center">
              {{ dataService.isRtl() ? 'تواصل معنا' : 'Connect With Us' }}
            </h4>
          </div>
          
          <div class="w-[455px] h-[139.22px] flex flex-col justify-between shrink-0">
            <!-- Phone Number Card -->
            <div class="w-[455px] h-[56.56px] rounded-[6.52px] py-[6.52px] px-[16.3px] flex items-center gap-[13.04px] bg-[#FFFFFF1A] shrink-0 box-border">
              <div class="w-[16.85px] h-[21.74px] flex items-center justify-center shrink-0">
                <svg width="17" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-[16.85px] h-[21.74px]">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div class="w-[108px] h-[43.52px] flex flex-col justify-center gap-[6.52px] shrink-0">
                <div class="w-[108px] h-[20px] font-['Poppins',sans-serif] font-bold text-[14px] leading-[140%] text-white capitalize flex items-center whitespace-nowrap">
                  {{ dataService.isRtl() ? 'رقم الهاتف' : 'Phone Number' }}
                </div>
                <a href="tel:+97165779360" class="w-[85px] h-[17px] font-['Poppins',sans-serif] font-normal text-[12px] leading-[140%] text-[#F5F8FF] capitalize flex items-center dir-ltr whitespace-nowrap">
                  +97165779360
                </a>
              </div>
            </div>

            <!-- E-Mail Card -->
            <div class="w-[455px] h-[56.56px] rounded-[6.52px] py-[6.52px] px-[16.3px] flex items-center gap-[13.04px] bg-[#FFFFFF1A] shrink-0 box-border">
              <div class="w-[16.85px] h-[21.74px] flex items-center justify-center shrink-0">
                <svg width="17" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-[16.85px] h-[21.74px]">
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
              </div>
              <div class="h-[43.52px] flex flex-col justify-center gap-[6.52px] shrink-0">
                <div class="h-[20px] font-['Poppins',sans-serif] font-bold text-[14px] leading-[140%] text-white capitalize flex items-center whitespace-nowrap">
                  {{ dataService.isRtl() ? 'البريد الإلكتروني' : 'E-Mail' }}
                </div>
                <a href="mailto:support@stargallery.ae" class="h-[17px] font-['Poppins',sans-serif] font-normal text-[12px] leading-[140%] text-[#F5F8FF] hover:underline flex items-center whitespace-nowrap">
                  support@stargallery.ae
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Desktop branding, app downloads, and social links -->
      <div class="hidden md:flex w-full max-w-[1512px] h-[142px] px-[80px] items-center justify-between shrink-0 box-border">
        <div class="w-[251.29px] h-[142px] flex flex-col justify-between shrink-0">
          <a href="#" class="w-[205px] h-[61px] flex items-center select-none shrink-0">
            <img src="assets/star-gallery-logo.svg" alt="Star Gallery" class="w-[205px] h-[61px] object-contain object-left" />
          </a>
          <span class="w-[247px] h-[22px] font-['Poppins',sans-serif] font-semibold text-[16px] leading-[140%] text-[#0A142F] flex items-center whitespace-nowrap shrink-0">
            {{ dataService.isRtl() ? 'تسوق في أي وقت، من أي مكان!' : 'Shopping Anytime, Anywhere!' }}
          </span>
          <div class="w-[251.29px] h-[35px] flex items-center gap-[16px] shrink-0">
            <a href="#" class="w-[117.65px] h-[35px] hover:opacity-85 transition inline-block shrink-0">
              <img src="assets/Google_Play_Store_badge_EN.svg" alt="Google Play" class="w-[117.65px] h-[35px] object-contain" />
            </a>
            <a href="#" class="w-[117.65px] h-[35px] hover:opacity-85 transition inline-block shrink-0">
              <img src="assets/App_Store_Badge.svg" alt="App Store" class="w-[117.65px] h-[35px] object-contain" />
            </a>
          </div>
        </div>

        <div class="w-[275px] h-[142px] flex flex-col justify-center items-start gap-[4px] shrink-0">
          <span class="w-[229px] h-[22px] font-['Poppins',sans-serif] font-semibold text-[16px] leading-[140%] text-[#0A142F] flex items-center whitespace-nowrap">
            {{ dataService.isRtl() ? 'تابعنا للحصول على عروض حصرية' : 'Follow us for exclusive deals' }}
          </span>
          <div class="w-[275px] h-[43px] flex items-center gap-[15px] shrink-0">
            <a href="#" class="w-[43px] h-[43px] hover:scale-105 transition inline-block shrink-0" title="Snapchat">
              <img src="assets/snapchat-icon.svg" alt="Snapchat" class="w-[43px] h-[43px] object-contain" />
            </a>
            <a href="#" class="w-[43px] h-[43px] hover:scale-105 transition inline-block shrink-0" title="YouTube">
              <img src="assets/youtube-icon.svg" alt="YouTube" class="w-[43px] h-[43px] object-contain" />
            </a>
            <a href="#" class="w-[43px] h-[43px] hover:scale-105 transition inline-block shrink-0" title="Instagram">
              <img src="assets/instagram-icon.svg" alt="Instagram" class="w-[43px] h-[43px] object-contain" />
            </a>
            <a href="#" class="w-[43px] h-[43px] hover:scale-105 transition inline-block shrink-0" title="Facebook">
              <img src="assets/facebook-icon.svg" alt="Facebook" class="w-[43px] h-[43px] object-contain" />
            </a>
            <a href="#" class="w-[43px] h-[43px] hover:scale-105 transition inline-block shrink-0" title="X (Twitter)">
              <img src="assets/x-icon.svg" alt="X" class="w-[43px] h-[43px] object-contain" />
            </a>
          </div>
        </div>
      </div>

      <!-- Payment badges & legal footer -->
      <div class="hidden md:flex w-full max-w-[1512px] h-[152px] bg-[#F3F6F9] py-[16px] px-[60px] flex-col items-center justify-center gap-[22px] shrink-0">
        <div class="w-[320px] h-[26px] flex items-center justify-center gap-[14px]">
          <img src="assets/mastercard-logo.svg" alt="Mastercard" class="h-[26px] w-auto object-contain" />
          <img src="assets/tabby-logo.svg" alt="Tabby" class="h-[20px] w-auto object-contain" />
          <img src="assets/visa-logo.svg" alt="VISA" class="h-[20px] w-auto object-contain" />
          <img src="assets/tamara.svg" alt="Tamara" class="h-[20px] w-auto object-contain" />
          <img src="assets/apple-pay-badge.svg" alt="Apple Pay" class="h-[20px] w-auto object-contain" />
          <img src="assets/cash-on-delivery.svg" alt="Cash on Delivery" class="h-[22px] w-auto object-contain" />
        </div>

        <div class="w-[1020px] h-[29px] flex items-center justify-center gap-[14px] text-[14px] text-[#68656E] font-['Poppins',sans-serif] font-normal leading-[100%] whitespace-nowrap">
          <a href="#" class="hover:text-black transition">{{ dataService.isRtl() ? 'اتصل بنا' : 'Contact Us' }}</a>
          <a href="#" class="hover:text-black transition">{{ dataService.isRtl() ? 'المؤثرون' : 'Social Media Influencers' }}</a>
          <a href="#" class="hover:text-black transition">{{ dataService.isRtl() ? 'سياسة الخصوصية' : 'Privacy Policy' }}</a>
          <a href="#" class="hover:text-black transition">{{ dataService.isRtl() ? 'الشروط والأحكام' : 'Terms & Conditions' }}</a>
          <a href="#" class="hover:text-black transition">{{ dataService.isRtl() ? 'الإرجاع والاسترداد' : 'Returns & Refunds' }}</a>
          <a href="#" class="hover:text-black transition">{{ dataService.isRtl() ? 'الخدمة والضمان' : 'Service & Warranty' }}</a>
          <a href="#" class="hover:text-black transition">{{ dataService.isRtl() ? 'سياسة عروض الأسعار' : 'Bulk Qutation Policy' }}</a>
        </div>

        <span class="font-['Poppins',sans-serif] font-normal text-[14px] leading-[100%] text-[#C2C1C9] text-center">
          © 2025 star gallery mart . All rights reserved
        </span>
      </div>
    </footer>
  `
})
export class FooterComponent {
  readonly dataService = inject(DataService);

  readonly isElectronicsOpen = signal<boolean>(false);
  readonly isHomeOpen = signal<boolean>(false);
  readonly isCarOpen = signal<boolean>(false);

  toggleElectronics() {
    this.isElectronicsOpen.update(v => !v);
  }

  toggleHome() {
    this.isHomeOpen.update(v => !v);
  }

  toggleCar() {
    this.isCarOpen.update(v => !v);
  }
}
