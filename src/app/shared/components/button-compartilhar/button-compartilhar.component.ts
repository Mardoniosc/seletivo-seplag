import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button-compartilhar',
  imports: [],
  templateUrl: './button-compartilhar.component.html',
  styleUrl: './button-compartilhar.component.scss',
})
export class ButtonCompartilharComponent {
  @Input() url: string = '';

  constructor(private router: Router) {
    if (!this.url) this.url = window.location.origin + this.router.url;
  }
}
