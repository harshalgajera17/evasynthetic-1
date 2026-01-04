import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LangDefinition, TranslocoService, TranslocoModule } from '@jsverse/transloco'; // ✅ Import TranslocoModule

import emailjs from 'emailjs-com';
import { UntypedFormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule, Validators, } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, TranslocoModule, RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  service = inject(TranslocoService);
  availableLangs = this.service.getAvailableLangs() as LangDefinition[];
  languageDirection: string = 'ltr';

  constructor(private router: Router, private translocoService: TranslocoService) { }

  private _formBuilder = inject(UntypedFormBuilder);
  helloEmail = "hello@archin.co"
  contactForm: any;

  ngOnInit(): void {
    this.translocoService.langChanges$.subscribe(lang => {
      this.languageDirection = lang === 'ar' ? 'rtl' : 'ltr';
    });

    this.contactForm = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      message: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }


  sendEmail(formElement: HTMLFormElement) {
    debugger
    emailjs.sendForm('service_emezwm4', 'template_tb1zoja', formElement, 'yr29sEcPv2d3XUbrX')
      .then((result) => {
        console.log('Email sent!', result.text);
        alert('Message sent successfully!');
      }, (error) => {
        console.error('Email failed to send.', error.text);
        alert('Failed to send message.');
      });
  }

}
