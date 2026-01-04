import { Component } from '@angular/core';
import { ProductListComponent } from "../product-list/product-list.component";

// Declare jQuery
declare var $: any;

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [ProductListComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {

  ngAfterViewInit() {
    $('.owl-p1').owlCarousel({
      loop: true,
      margin: 20,
      nav: false,
      autoplay: true,
      // autoplayHoverPause: true,
      autoplayTimeout: 4000,
      autoplaySpeed: 1000,
      fluidSpeed:true,
      dots: false,
      responsive: {
        0: { items: 1 },
        600: { items: 2 },
        1000: { items: 3 }
      }
    });
  }
}
