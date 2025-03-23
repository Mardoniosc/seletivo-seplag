import { inject, Injectable } from '@angular/core';
import { AlertService } from '../../core/alert/alert.service';
import { ETipoMensagem } from '../Models/enums/shared.enums';

@Injectable({
  providedIn: 'root',
})
export class MensagemService {
  readonly _alert = inject(AlertService);

  mensagem(mensagem: string, tipo: ETipoMensagem): void {
    if (ETipoMensagem.INFO === tipo) {
      this._alert.info(mensagem);

      return;
    }

    if (ETipoMensagem.SUCCESS === tipo) {
      this._alert.success(mensagem);
      return;
    }

    if (ETipoMensagem.ERROR === tipo) {
      this._alert.error(mensagem);

      return;
    }

    if (ETipoMensagem.WARNING === tipo) {
      this._alert.warning(mensagem);

      return;
    }

    this._alert.info(mensagem);
  }

  mensagemDeError(msg: string): (error: any) => void {
    return (error) => {
      // valida se tem uma mensagem enviado pelo backen
      if (error?.status && error?.error?.message) {
        // valida se tem uma lista de mensagem de erro de formulario
        if (error?.error?.fields?.length > 0) {
          error?.error?.fields.forEach((element: any) => {
            this._alert.error(error.status + ': ' + element.message);
          });
          return;
        }
        this._alert.error(`${error.status}: ${error.error.message}`);
        return;
      }

      // mostra mensagem padrao
      this._alert.error(error.status + ': ' + msg);
    };
  }
}
