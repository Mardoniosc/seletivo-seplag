import { JsonPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MensagemService } from '../../../../shared/services/Mensagem.service';
import { CardDesaparecidoComponent } from '../../components/card-desaparecido/card-desaparecido.component';
import { DesaparecidosFacade } from '../../desaparecido.facade';
import { DesaparecidosState } from '../../desaparecido.state';
import { Desaparecido } from '../../models/desaparecido.model';
import { DesaparecidosService } from '../../services/desaparecido.service';
import { CardCartazComponent } from '../../components/card-cartaz/card-cartaz.component';

@Component({
  selector: 'app-detalhes',
  imports: [HttpClientModule, CardDesaparecidoComponent, CardCartazComponent],
  templateUrl: './detalhes.component.html',
  styleUrl: './detalhes.component.scss',
  standalone: true,
  providers: [DesaparecidosFacade, DesaparecidosState, DesaparecidosService],
})
export class DetalhesComponent implements OnInit {
  idDesaparecido: number = 0;

  desaparecido!: Desaparecido;

  constructor(
    private _desaparecidosService: DesaparecidosService,
    private route: ActivatedRoute,
    private _mensagemService: MensagemService
  ) {}

  ngOnInit(): void {
    this._carregaIdDesaparecido();
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
        },
        error: this._mensagemService.mensagemDeError(
          'Erro ao buscar detalhes do desaparecido!!!'
        ),
      });
  }
}
