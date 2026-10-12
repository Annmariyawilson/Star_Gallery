import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '@shared/data-access';
import { 
  HeaderComponent, 
  CategorySliderComponent, 
  BannerSliderComponent, 
  FooterComponent 
} from '@shared/ui';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    CategorySliderComponent,
    BannerSliderComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  dataService = inject(DataService);

  ngOnInit() {
    this.dataService.loadInitialData();
  }
}
