/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, Injectable } from '@angular/core';
import { ActiveToast, IndividualConfig, ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AlertService {
  readonly _toastr = inject(ToastrService);

  info(message: string, title?: string): ActiveToast<any> {
    return this._toastr.info(message, title ?? 'Informação');
  }

  success(message: string, title?: string): ActiveToast<any> {
    return this._toastr.success(message, title ?? 'Sucesso');
  }

  error(message: string, title?: string): ActiveToast<any> {
    return this._toastr.error(message, title ?? 'Erro');
  }

  warning(
    message: string,
    title?: string,
    toastConfig?: Partial<IndividualConfig<any>>
  ): ActiveToast<any> {
    return this._toastr.warning(message, title ?? 'Atenção', toastConfig);
  }
}
