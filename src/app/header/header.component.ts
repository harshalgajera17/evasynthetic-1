import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router'
import { filter, Subscription, take } from 'rxjs';
import { LangDefinition, TranslocoModule, TranslocoService } from "@jsverse/transloco";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterModule, TranslocoModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isHomePage: boolean = false;
  service = inject(TranslocoService);
  availableLangs = this.service.getAvailableLangs() as LangDefinition[];
  private subscription: Subscription | any;
  languageDirection: string = 'ltr';

  constructor(private router: Router, private translocoService: TranslocoService) { }

  ngOnInit(): void {

    // Subscribe to router events to detect route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Check if the current route is the homepage
        this.isHomePage = event.urlAfterRedirects === '/' || event.urlAfterRedirects === '/home';
        // Collapse navbar on route change
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          (navbarCollapse as HTMLElement).classList.remove('show');
        }
      });

    this.translocoService.langChanges$.subscribe(lang => {
      this.languageDirection = lang === 'ar' ? 'rtl' : 'ltr';
    });
  }

  get activeLang() {
    return this.service.getActiveLang();
  }

  changeLang(lang: string) {
    // Ensure new active lang is loaded
    this.subscription?.unsubscribe();
    this.subscription = this.service
      .load(lang)
      .pipe(take(1))
      .subscribe((res: any) => {
        localStorage.setItem('lang', lang ? lang : 'en');
        this.languageDirection = res.directions;
        this.service.setActiveLang(lang ? lang : 'en');
      });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.subscription = null;
  }

}
