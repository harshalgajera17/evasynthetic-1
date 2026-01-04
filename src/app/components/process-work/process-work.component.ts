import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LangDefinition, TranslocoService, TranslocoModule } from '@jsverse/transloco'; // ✅ Import TranslocoModule

@Component({
  selector: 'app-process-work',
  standalone: true,
  imports: [RouterLink, TranslocoModule],
  templateUrl: './process-work.component.html',
  styleUrl: './process-work.component.css'
})
export class ProcessWorkComponent implements OnInit { // ✅ Add OnInit here

  service = inject(TranslocoService);
  availableLangs = this.service.getAvailableLangs() as LangDefinition[];
  languageDirection: string = 'ltr';

  constructor(private router: Router, private translocoService: TranslocoService) {}

  ngOnInit(): void {
    this.translocoService.langChanges$.subscribe(lang => {
      this.languageDirection = lang === 'ar' ? 'rtl' : 'ltr';
    });
  }
}