import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../../../environments/environment';
import {
  Desaparecido,
  ResponseDesaparecido,
} from '../models/desaparecido.model';

@Injectable({
  providedIn: 'root',
})
export class DesaparecidosService {
  readonly http = inject(HttpClient);

  listaDesaparecidos(parametros: HttpParams): Observable<ResponseDesaparecido> {
    return this.http.get<ResponseDesaparecido>(
      `${env.apiUrl}/pessoas/aberto/filtro`,
      { params: parametros }
    );
  }

  buscarDesaparecido(id: number): Observable<Desaparecido> {
    return this.http.get<Desaparecido>(`${env.apiUrl}/pessoas/${id}`);
  }

  salvarInformacoes(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      Accept: '*/*',
    });

    return this.http.post(
      `${env.apiUrl}/ocorrencias/informacoes-desaparecido`,
      formData,
      { headers }
    );
  }
}
