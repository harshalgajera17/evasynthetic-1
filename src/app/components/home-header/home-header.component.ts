import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LangDefinition, TranslocoService, TranslocoModule } from '@jsverse/transloco'; // ✅ Import TranslocoModule

// Declare jQuery
declare var $: any;

@Component({
  selector: 'app-home-header',
  standalone: true,
  imports: [RouterLink, TranslocoModule],
  templateUrl: './home-header.component.html',
  styleUrl: './home-header.component.css'
})
export class HomeHeaderComponent {
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
  }
}
