import { Component, inject, Injectable } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { filter } from 'rxjs';
import WOW from 'wowjs';
import { TranslocoService } from '@jsverse/transloco';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

@Injectable({
  providedIn: 'root'
})

export class AppComponent {
  service:any = inject(TranslocoService);

  title = 'evasynthetic';


  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {
    if (localStorage.getItem('lang')) {
      this.service.setActiveLang(localStorage.getItem('lang'));
    } else {
      this.service.setActiveLang('en');
      localStorage.setItem('lang', 'en');
    }
  }


  ngOnInit(): void {
    // Subscribe to router events
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // Scroll to top of the page
        this.viewportScroller.scrollToPosition([0, 0]);
      });
    new WOW.WOW().init();
  }

}
