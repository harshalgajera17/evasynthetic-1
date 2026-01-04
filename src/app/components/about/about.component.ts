import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LangDefinition, TranslocoService, TranslocoModule } from '@jsverse/transloco'; // ✅ Import TranslocoModule
import { TestimonialComponent } from "../testimonial/testimonial.component";

// Declare jQuery
declare var $: any;

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TestimonialComponent, RouterLink, TranslocoModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  infoEmail = 'info@evasynthetic.com';

  service = inject(TranslocoService);
  availableLangs = this.service.getAvailableLangs() as LangDefinition[];
  languageDirection: string = 'ltr';

  constructor(private router: Router, private translocoService: TranslocoService) { }

  ngOnInit(): void {
    this.translocoService.langChanges$.subscribe(lang => {
      this.languageDirection = lang === 'ar' ? 'rtl' : 'ltr';
    });
  }

  ngAfterViewInit() {
    $('.owl-p1').owlCarousel({
      loop: true,
      margin: 20,
      nav: false,
      autoplay: true,
      // autoplayHoverPause: true,
      autoplayTimeout: 4000,
      autoplaySpeed: 1000,
      fluidSpeed: true,
      dots: false,
      responsive: {
        0: { items: 1 },
        600: { items: 2 },
        1000: { items: 3 },
        1500: { items: 4 }
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
  }

}
