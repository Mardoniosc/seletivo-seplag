import { HttpClientModule, HttpParams } from '@angular/common/http';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subject, takeUntil } from 'rxjs';
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
  ],
  providers: [DesaparecidosFacade, DesaparecidosState, DesaparecidosService],
})
export class ListDesaparecidosComponent implements OnInit, OnDestroy {
  private readonly _desaparecidosFacade = inject(DesaparecidosFacade);

  listaDesaparecidos: Desaparecido[] = [];
  carregando = true;

  length = 0;
  pageIndex = 0;
  pageSize = 10;
  pageEvent!: PageEvent;
  currentPage = 0;

  protocolo: string = '';

  removeInscricao$ = new Subject<void>();

  parametros = new HttpParams()
    .set('page', this.pageIndex)
    .set('size', this.pageSize);

  constructor(private _matDialog: MatDialog) {
    console.warn('LISTA DESAPARECIDOS');
  }

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
      .set('page', (event as any)['pageIndex'])
      .set('size', this.pageSize);

    this._desaparecidosFacade.carregaListaDesaparecidos(this.parametros);
  }

  buscaDesaparecidos(): void {
    this.listaDesaparecidos = [];

    this.length = 0;
    this.pageIndex = 0;
    this.pageSize = 10;

    if (this.protocolo !== '') {
      this.parametros = this.parametros
        .set('page', this.pageIndex)
        .set('size', this.pageSize);
    }

    this._desaparecidosFacade.carregaListaDesaparecidos(this.parametros);
  }

  ngOnDestroy(): void {
    this.removeInscricao$.next();
    this.removeInscricao$.complete();
  }
}
