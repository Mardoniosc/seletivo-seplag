import { Component, Input } from '@angular/core';
import { Cartaz } from '../../models/desaparecido.model';

@Component({
  selector: 'app-card-cartaz',
  imports: [],
  templateUrl: './card-cartaz.component.html',
  styleUrl: './card-cartaz.component.scss',
})
export class CardCartazComponent {
  @Input() cartaz!: Cartaz;

  teste: Cartaz = {
    tipoCartaz: 'PDF',
    urlCartaz: 'https://www.google.com',
  };
}
