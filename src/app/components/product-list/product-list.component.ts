import { Component, ElementRef, ViewChild, AfterViewInit, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LangDefinition, TranslocoService, TranslocoModule } from '@jsverse/transloco'; // ✅ Import TranslocoModule


import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lightGallery from 'lightgallery';

// Declare jQuery for Owl Carousel
declare var $: any;

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, TranslocoModule, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements AfterViewInit {
  activeTab = 'tab1';
  gallery: any;
  setActive(tab: string) {
    this.activeTab = tab;
  }

  service = inject(TranslocoService);
  availableLangs = this.service.getAvailableLangs() as LangDefinition[];
  languageDirection: string = 'ltr';

  constructor(private router: Router, private translocoService: TranslocoService) { }

  ngOnInit(): void {
    this.translocoService.langChanges$.subscribe(lang => {
      this.languageDirection = lang === 'ar' ? 'rtl' : 'ltr';
    });
  }

  ngAfterViewInit(): void {
    // LightGallery init
    const gallery = document.querySelector('.my-gallery') as HTMLElement;
    if (gallery) {
      lightGallery(gallery, {
        selector: 'a',
        plugins: [lgThumbnail, lgZoom],
        speed: 500,
        thumbnail: true,
        zoom: true
      });
    }

    // Owl Carousel init
    $('.owl-p1').owlCarousel({
      loop: true,
      margin: 10,
      nav: false,
      autoplay: true,
      autoplayTimeout: 2500,
      autoplaySpeed: 1000,
      dots: false,
      responsive: {
        0: { items: 1 },
        600: { items: 2 },
        1000: { items: 3 },
        1500: { items: 4 }
      }
    });
  }

  // openGallery(event: Event, index: number): void {
  //   event.preventDefault();
  //   this.gallery.openGallery(index);
  // }
}
