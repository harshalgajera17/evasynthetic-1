import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LangDefinition, TranslocoService, TranslocoModule } from '@jsverse/transloco'; // ✅ Import TranslocoModule

// Declare jQuery
declare var $: any;

@Component({
  selector: 'app-testimonial',
  standalone: true,
  imports: [RouterLink, TranslocoModule],
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.css'
})
export class TestimonialComponent implements OnInit {

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
