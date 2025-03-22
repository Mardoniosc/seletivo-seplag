import { HttpClientModule, HttpParams } from '@angular/common/http';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subject, takeUntil } from 'rxjs';
import { ETipoMensagem } from '../../../../shared/Models/enums/shared.enums';
import { MensagemService } from '../../../../shared/services/Mensagem.service';
import { CardDesaparecidoComponent } from '../../components/card-desaparecido/card-desaparecido.component';
import { DesaparecidosFacade } from '../../desaparecido.facade';
import { DesaparecidosState } from '../../desaparecido.state';
import {
  Desaparecido,
  ResponseDesaparecido,
} from '../../models/desaparecido.model';
import { DesaparecidosService } from '../../services/desaparecido.service';

@Component({
  selector: 'app-list-desaparecido',
  templateUrl: './list-desaparecido.component.html',
  styleUrl: './list-desaparecido.component.scss',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule,
    CardDesaparecidoComponent,
    MatRadioModule,
  ],
  providers: [DesaparecidosFacade, DesaparecidosState, DesaparecidosService],
})
export class ListDesaparecidosComponent implements OnInit, OnDestroy {
  private readonly _desaparecidosFacade = inject(DesaparecidosFacade);

  listaDesaparecidos: Desaparecido[] = [];
  carregando = true;

  length = 0;
  pageIndex = 0;
  pageSize = 20;
  pageEvent!: PageEvent;
  currentPage = 0;

  removeInscricao$ = new Subject<void>();

  //  filtros
  sexo: string = '';
  nome: string = '';
  status: string = '';
  idadeInicial: number = 0;
  idadeFinal: number = 0;

  parametros = new HttpParams()
    .set('pagina', this.pageIndex)
    .set('porPagina', this.pageSize);

  constructor(private _mensagemService: MensagemService) {}

  ngOnInit(): void {
    this._desaparecidosFacade.carregandoListaDesaparecidos$
      .pipe(takeUntil(this.removeInscricao$))
      .subscribe({
        next: (carregando) => (this.carregando = carregando),
      });

    this._desaparecidosFacade.listaDesaparecidos$
      .pipe(takeUntil(this.removeInscricao$))
      .subscribe({
        next: (listaDesaparecidos: ResponseDesaparecido) => {
          console.log(listaDesaparecidos);
          this.listaDesaparecidos = listaDesaparecidos.content;
          this.length = listaDesaparecidos.totalElements;
        },
      });

    this._desaparecidosFacade.carregaListaDesaparecidos(this.parametros);
  }

  paginacao(event: Event): void {
    this.pageSize = (event as any)['pageSize'];
    this.currentPage = (event as any)['pageIndex'];

    this.parametros = this.parametros
      .set('pagina', (event as any)['pageIndex'])
      .set('porPagina', this.pageSize);

    this._desaparecidosFacade.carregaListaDesaparecidos(this.parametros);
  }

  buscaDesaparecidos(): void {
    this.listaDesaparecidos = [];

    this.length = 0;
    this.pageIndex = 0;
    this.pageSize = 20;
    this.parametros = new HttpParams()
      .set('pagina', this.pageIndex)
      .set('porPagina', this.pageSize);

    if (this.sexo) {
      this.parametros = this.parametros.set('sexo', this.sexo);
    }

    if (this.nome) {
      this.parametros = this.parametros.set('nome', this.nome);
    }

    if (this.status) {
      this.parametros = this.parametros.set('status', this.status);
    }

    if (this.idadeInicial > 0) {
      if (
        this.idadeFinal > 0 &&
        Number(this.idadeInicial) > Number(this.idadeFinal)
      ) {
        this._mensagemService.mensagem(
          'A idade inicial não pode ser maior que a idade final',
          ETipoMensagem.INFO
        );
        return;
      }
      this.parametros = this.parametros.set(
        'faixaIdadeInicial',
        this.idadeInicial
      );
    }

    if (this.idadeFinal > 0) {
      this.parametros = this.parametros.set('faixaIdadeFinal', this.idadeFinal);
    }

    this._desaparecidosFacade.carregaListaDesaparecidos(this.parametros);
  }

  ngOnDestroy(): void {
    this.removeInscricao$.next();
    this.removeInscricao$.complete();
  }
}
