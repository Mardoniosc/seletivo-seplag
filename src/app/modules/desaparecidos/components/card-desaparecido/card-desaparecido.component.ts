import { DatePipe, NgClass } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { Desaparecido } from '../../models/desaparecido.model';

@Component({
  selector: 'app-card-desaparecido',
  templateUrl: './card-desaparecido.component.html',
  styleUrls: ['./card-desaparecido.component.css'],
  standalone: true,
  imports: [NgClass, DatePipe, MatTooltipModule, RouterLink, HttpClientModule],
})
export class CardDesaparecidoComponent implements OnInit {
  @Input() desaparecido!: Desaparecido;

  @Input() completo: boolean = false;

  dataLocalizacao: string | null = null;

  ngOnInit() {
    this.dataLocalizacao =
      this.desaparecido.ultimaOcorrencia.dataLocalizacao ?? null;
  }
}
