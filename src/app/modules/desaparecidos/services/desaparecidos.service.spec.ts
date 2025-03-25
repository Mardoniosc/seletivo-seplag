import { HttpParams } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment as env } from '../../../../environments/environment';
import { DesaparecidosService } from './desaparecido.service';
import {
  MOCK_DESAPARECIDO,
  MOCK_OCORRENCIAS,
  MOCK_RESPONSE_DESAPARECIDO,
} from './mock-desaparecidos';

describe('DesaparecidosService', () => {
  let service: DesaparecidosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DesaparecidosService],
    });

    service = TestBed.inject(DesaparecidosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Garante que não há requisições pendentes
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve listar desaparecidos', () => {
    const parametros = new HttpParams().set('nome', 'Joao');

    service.listaDesaparecidos(parametros).subscribe((res) => {
      expect(res).toEqual(MOCK_RESPONSE_DESAPARECIDO);
    });

    const req = httpMock.expectOne(
      `${env.apiUrl}/pessoas/aberto/filtro?nome=Joao`
    );
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_RESPONSE_DESAPARECIDO);
  });

  it('deve buscar ocorrências de um desaparecido', () => {
    service.buscarOcorrencias(123).subscribe((res) => {
      expect(res).toEqual(MOCK_OCORRENCIAS);
    });

    const req = httpMock.expectOne(
      `${env.apiUrl}/ocorrencias/informacoes-desaparecido?ocorrenciaId=123`
    );
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_OCORRENCIAS);
  });

  it('deve buscar um desaparecido pelo ID', () => {
    service.buscarDesaparecido(1).subscribe((res) => {
      expect(res).toEqual(MOCK_DESAPARECIDO);
    });

    const req = httpMock.expectOne(`${env.apiUrl}/pessoas/1`);
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_DESAPARECIDO);
  });

  it('deve salvar informações sobre um desaparecido', () => {
    const formData = new FormData();
    formData.append('descricao', 'Informação teste');

    service.salvarInformacoes(formData).subscribe((res) => {
      expect(res).toEqual({ sucesso: true });
    });

    const req = httpMock.expectOne(
      `${env.apiUrl}/ocorrencias/informacoes-desaparecido`
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(formData);
    req.flush({ sucesso: true });
  });
});
