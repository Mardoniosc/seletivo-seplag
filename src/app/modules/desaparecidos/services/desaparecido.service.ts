import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../../../environments/environment';
import { ResponseDesaparecido } from '../models/desaparecido.model';

@Injectable({
  providedIn: 'root',
})
export class DesaparecidosService {
  constructor(private http: HttpClient) {}

  listaDesaparecidos(parametros: HttpParams): Observable<ResponseDesaparecido> {
    return this.http.get<ResponseDesaparecido>(
      `${env.apiUrl}/pessoas/aberto/filtro`,
      { params: parametros }
    );
  }
}
