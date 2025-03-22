import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResponseDesaparecido } from './models/desaparecido.model';

@Injectable({
  providedIn: 'root',
})
export class DesaparecidosState {
  private readonly _listaDesaparecidos$ =
    new BehaviorSubject<ResponseDesaparecido>({} as ResponseDesaparecido);

  private readonly _carregandoListaDesaparecidos$ =
    new BehaviorSubject<boolean>(false);

  constructor() {}

  //
  // _listaDesaparecidos$
  //

  get listaDesaparecidos$(): Observable<ResponseDesaparecido> {
    return this._listaDesaparecidos$.asObservable();
  }

  set listaDesaparecidos(listaDesaparecidos: ResponseDesaparecido) {
    this._listaDesaparecidos$.next(listaDesaparecidos);
  }

  get listaDesaparecidos(): ResponseDesaparecido {
    return this._listaDesaparecidos$.value;
  }

  //
  // _carregandoListaDesaparecidos$
  //

  get carregandoListaDesaparecidos$(): Observable<boolean> {
    return this._carregandoListaDesaparecidos$.asObservable();
  }

  set carregandoListaDesaparecidos(carregando: boolean) {
    this._carregandoListaDesaparecidos$.next(carregando);
  }

  get carregandoListaDesaparecidos(): boolean {
    return this._carregandoListaDesaparecidos$.value;
  }
}
