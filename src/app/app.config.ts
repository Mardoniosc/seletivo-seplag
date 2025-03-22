import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    provideToastr({
      closeButton: true,
      timeOut: 5000,
      newestOnTop: true,
      tapToDismiss: true,
      preventDuplicates: true,
    }),
  ],
};
