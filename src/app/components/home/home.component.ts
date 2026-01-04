import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { ProductListComponent } from "../product-list/product-list.component";
import { TestimonialComponent } from "../testimonial/testimonial.component";
import { TeamListComponent } from "../team-list/team-list.component";
import { CommonModule } from '@angular/common';
import { ProductsCategoryComponent } from "../products-category/products-category.component";
import { ProcessWorkComponent } from "../process-work/process-work.component";
import { LangDefinition, TranslocoService, TranslocoModule } from '@jsverse/transloco';
import { HomeHeaderComponent } from "../home-header/home-header.component"; // ✅ Import TranslocoModule


// Declare jQuery
declare var $: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductListComponent, TestimonialComponent, TeamListComponent, CommonModule, TranslocoModule, ProductsCategoryComponent, ProcessWorkComponent, HomeHeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit, OnInit {
  infoEmail = 'info@evasynthetic.com';
  // private subscription: Subscription | any;
  service = inject(TranslocoService);
  availableLangs = this.service.getAvailableLangs() as LangDefinition[];
  languageDirection: string = 'ltr';

  constructor(private translocoService: TranslocoService) {

  }

  ngOnInit(): void {
    // this.translocoService.langChanges$.subscribe(lang => {
    //   this.languageDirection = lang === 'ar' ? 'rtl' : 'ltr';
    //   setTimeout(() => {
    //     this.manageClouser();
    //   }, 50);
    // });

    this.translocoService.langChanges$.subscribe(lang => {
      this.languageDirection = lang === 'ar' ? 'rtl' : 'ltr';
    });
  }

  ngAfterViewInit() {
    $('.owl-header').owlCarousel({
      loop: true,
      margin: 0,
      nav: true,
      autoplay: true,
      // autoplayHoverPause: true,
      autoplayTimeout: 4000,
      autoplaySpeed: 1000,
      fluidSpeed: true,
      dots: false,
      responsive: {
        0: { items: 1 },
        600: { items: 1 },
        1000: { items: 1 }
      }
    });
    $('.owl-testimonials').owlCarousel({
      loop: true,
      margin: 0,
      nav: false,
      autoplay: true,
      // autoplayHoverPause: true,
      autoplayTimeout: 4000,
      autoplaySpeed: 1000,
      fluidSpeed: true,
      dots: false,
      responsive: {
        0: { items: 1 },
        600: { items: 1 },
        1000: { items: 1 }
      }
    });
    $('.owl-hint').owlCarousel({
      loop: true,
      margin: 0,
      nav: false,
      autoplay: true,
      // autoplayHoverPause: true,
      autoplayTimeout: 1500,
      autoplaySpeed: 1000,
      fluidSpeed: true,
      dots: false,
      responsive: {
        0: { items: 1 },
        1250: { items: 1 }
      }
    });
  }

  manageClouser() {
  }

  // this.router.events.subscribe(event => {
  //   if (event instanceof NavigationEnd) {
  //     setTimeout(() => {
  //       $('.owl-carousel').trigger('refresh.owl.carousel');
  //     }, 0);
  //   }
  // });
}
