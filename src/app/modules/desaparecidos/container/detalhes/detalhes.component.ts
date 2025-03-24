import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonCompartilharComponent } from '../../../../shared/components/button-compartilhar/button-compartilhar.component';
import { MensagemService } from '../../../../shared/services/Mensagem.service';
import { CardCartazComponent } from '../../components/card-cartaz/card-cartaz.component';
import { CardDesaparecidoComponent } from '../../components/card-desaparecido/card-desaparecido.component';
import { FormInformacoesComponent } from '../../components/form-informacoes/form-informacoes.component';
import { OcorrenciasComponent } from '../../components/ocorrencias/ocorrencias.component';
import { DesaparecidosFacade } from '../../desaparecido.facade';
import { DesaparecidosState } from '../../desaparecido.state';
import { Desaparecido, Ocorrencia } from '../../models/desaparecido.model';
import { DesaparecidosService } from '../../services/desaparecido.service';

@Component({
  selector: 'app-detalhes',
  imports: [
    HttpClientModule,
    CardDesaparecidoComponent,
    CardCartazComponent,
    OcorrenciasComponent,
    ButtonCompartilharComponent,
    MatDialogModule,
    RouterLink,
  ],
  templateUrl: './detalhes.component.html',
  styleUrl: './detalhes.component.scss',
  standalone: true,
  providers: [DesaparecidosFacade, DesaparecidosState, DesaparecidosService],
})
export class DetalhesComponent implements OnInit {
  idDesaparecido: number = 0;

  desaparecido!: Desaparecido;

  ocorrencias: Ocorrencia[] = [];

  readonly dialog = inject(MatDialog);

  constructor(
    private _desaparecidosService: DesaparecidosService,
    private _mensagemService: MensagemService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._carregaIdDesaparecido();
  }

  adicionarInformacoes() {
    const ref = this.dialog.open(FormInformacoesComponent, {
      data: this.desaparecido,
    });

    ref.afterClosed().subscribe({
      next: (result) => this._carregaUltimasOcorrencias(),
    });
  }

  private _carregaIdDesaparecido() {
    this.route.params.subscribe((params) => {
      this.idDesaparecido = Number(params['id']);
      this._carregaDadosDesaparecido();
    });
  }

  private _carregaDadosDesaparecido() {
    this._desaparecidosService
      .buscarDesaparecido(this.idDesaparecido)
      .subscribe({
        next: (response) => {
          if (response) this.desaparecido = response;
          this._carregaUltimasOcorrencias();
        },
        error: this._mensagemService.mensagemDeError(
          'Erro ao buscar detalhes do desaparecido!!!'
        ),
      });
  }

  private _carregaUltimasOcorrencias() {
    this._desaparecidosService
      .buscarOcorrencias(this.desaparecido.ultimaOcorrencia.ocoId)
      .subscribe({
        next: (response) => (this.ocorrencias = response),
        error: this._mensagemService.mensagemDeError(
          'Erro ao buscar ultimas ocorrencias!!!'
        ),
      });
  }
}
