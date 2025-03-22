import { DatePipe, NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Desaparecido } from '../../models/desaparecido.model';

@Component({
  selector: 'app-card-desaparecido',
  templateUrl: './card-desaparecido.component.html',
  styleUrls: ['./card-desaparecido.component.css'],
  standalone: true,
  imports: [NgClass, DatePipe, MatTooltipModule],
})
export class CardDesaparecidoComponent implements OnInit {
  @Input() desaparecido!: Desaparecido;

  dataLocalizacao: string | null = null;

  constructor() {}

  ngOnInit() {
    this.dataLocalizacao =
      this.desaparecido.ultimaOcorrencia.dataLocalizacao ?? null;
  }
}
