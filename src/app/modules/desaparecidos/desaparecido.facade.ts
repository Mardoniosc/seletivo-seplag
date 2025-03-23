import { HttpParams } from '@angular/common/http';
import { inject, Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ETipoMensagem } from '../../shared/Models/enums/shared.enums';
import { MensagemService } from '../../shared/services/Mensagem.service';
import { DesaparecidosState } from './desaparecido.state';
import {
  Desaparecido,
  ResponseDesaparecido,
} from './models/desaparecido.model';
import { DesaparecidosService } from './services/desaparecido.service';

@Injectable({
  providedIn: 'root',
})
export class DesaparecidosFacade implements OnDestroy {
  private readonly _router = inject(Router);
  private readonly _desaparecidoService = inject(DesaparecidosService);
  private readonly _mensagemService = inject(MensagemService);
  private readonly _desaparecidoState = inject(DesaparecidosState);

  removeInscricao$ = new Subject<void>();

  listaDesaparecidos$: Observable<ResponseDesaparecido>;
  carregandoListaDesaparecidos$: Observable<boolean>;

  parametros = new HttpParams().set('page', 0).set('size', 10);

  constructor() {
    this.listaDesaparecidos$ = this._desaparecidoState.listaDesaparecidos$;
    this.carregandoListaDesaparecidos$ =
      this._desaparecidoState.carregandoListaDesaparecidos$;
  }

  carregaListaDesaparecidos(parametros: HttpParams) {
    this._desaparecidoState.carregandoListaDesaparecidos = true;

    this._desaparecidoService
      .listaDesaparecidos(parametros)
      .pipe(takeUntil(this.removeInscricao$))
      .subscribe({
        next: (res: ResponseDesaparecido) => {
          this._desaparecidoState.listaDesaparecidos = res;
        },
        error: (erro) => {
          if (erro?.error?.message) {
            this._mensagemService.mensagem(
              erro?.error?.message,
              ETipoMensagem.ERROR
            );
          } else {
            this._mensagemService.mensagem(
              'Erro ao carregar a lista de Desaparecidos!',
              ETipoMensagem.ERROR
            );
          }

          this._desaparecidoState.carregandoListaDesaparecidos = false;
        },
        complete: () =>
          (this._desaparecidoState.carregandoListaDesaparecidos = false),
      });
  }

  zeraListaDesaparecidosBuscados() {
    this._desaparecidoState.listaDesaparecidos = {
      size: 0,
      content: [],
      totalPages: 0,
      totalElements: 0,
      pageable: {
        sort: { empty: true, sorted: false, unsorted: true },
        offset: 0,
        pageNumber: 0,
        pageSize: 0,
        paged: false,
        unpaged: true,
      },
      number: 0,
      numberOfElements: 0,
      empty: true,
      first: false,
      last: true,
      sort: { empty: true, sorted: false, unsorted: true },
    };
  }

  getDesaparecido(idDesaparecido: number): Desaparecido | null {
    console.log(this._desaparecidoState.listaDesaparecidos);
    console.log(this._desaparecidoState.carregandoListaDesaparecidos);
    if (this._desaparecidoState.listaDesaparecidos.content) {
      const desaparecido =
        this._desaparecidoState.listaDesaparecidos.content.find(
          (c) => c.id === idDesaparecido
        );

      if (desaparecido) return desaparecido;
    }

    return null;
  }

  ngOnDestroy(): void {
    this.removeInscricao$.next();
    this.removeInscricao$.complete();
  }
}
