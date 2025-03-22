import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Desaparecido } from '../../models/desaparecido.model';

@Component({
  selector: 'app-card-desaparecido',
  templateUrl: './card-desaparecido.component.html',
  styleUrls: ['./card-desaparecido.component.css'],
  standalone: true,
  imports: [NgClass],
})
export class CardDesaparecidoComponent implements OnInit {
  @Input() desaparecido!: Desaparecido;

  constructor() {}

  ngOnInit() {}
}
