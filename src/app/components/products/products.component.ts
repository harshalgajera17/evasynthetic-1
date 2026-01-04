import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LangDefinition, TranslocoService, TranslocoModule } from '@jsverse/transloco'; // ✅ Import TranslocoModule
import { ProductListComponent } from "../product-list/product-list.component";
import { TestimonialComponent } from "../testimonial/testimonial.component";
import { ProductsCategoryComponent } from "../products-category/products-category.component";
import { ProcessWorkComponent } from "../process-work/process-work.component";

// Declare jQuery
declare var $: any;

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [TranslocoModule, ProductListComponent, TestimonialComponent, ProductsCategoryComponent, ProcessWorkComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  service = inject(TranslocoService);
  availableLangs = this.service.getAvailableLangs() as LangDefinition[];
  languageDirection: string = 'ltr';

  constructor(private router: Router, private translocoService: TranslocoService) { }

  ngOnInit(): void {
    this.translocoService.langChanges$.subscribe(lang => {
      this.languageDirection = lang === 'ar' ? 'rtl' : 'ltr';
    });
  }
}