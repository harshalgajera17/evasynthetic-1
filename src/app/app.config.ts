import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideTransloco } from "@jsverse/transloco";
import { routes } from './app.routes';
import { TranslocoHttpLoader } from "../../transloco-loader";
import { provideTranslocoLocale } from "@jsverse/transloco-locale";
import { provideTranslocoMessageformat } from "@jsverse/transloco-messageformat";
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),    
    provideTransloco({
      loader: TranslocoHttpLoader,
      config: {
        availableLangs: [
          { id: "en", label: "English" },
          { id: "ar", label: "Arabic" },
          { id: "ru", label: "Russian" },
          { id: "es", label: "Spanish" },
        ],
        reRenderOnLangChange: true,
        fallbackLang: "ar",
        defaultLang: "en",
        missingHandler: {
          useFallbackTranslation: false,
        },
      },
    }),
    provideTranslocoMessageformat(),
    provideTranslocoLocale({
      langToLocaleMapping: {
        en: "en",
        ar: "ar",
        ru: "ru",
        es: "es",
      },
    }),
    provideAnimationsAsync(),
  ]
};
