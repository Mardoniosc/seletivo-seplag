import { Component, Input } from '@angular/core';
import { Ocorrencia } from '../../models/desaparecido.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ocorrencias',
  imports: [DatePipe],
  templateUrl: './ocorrencias.component.html',
  styleUrl: './ocorrencias.component.scss',
})
export class OcorrenciasComponent {
  @Input() ocorrencia!: Ocorrencia;
}
