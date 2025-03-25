import { TestBed } from '@angular/core/testing';
import { DesaparecidosState } from './desaparecido.state';
import { ResponseDesaparecido } from './models/desaparecido.model';
import { MOCK_RESPONSE_DESAPARECIDO } from './services/mock-desaparecidos';

describe('DesaparecidosState', () => {
  let service: DesaparecidosState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DesaparecidosState],
    });

    service = TestBed.inject(DesaparecidosState);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve atualizar e emitir a lista de desaparecidos corretamente', (done) => {
    const listaMock: ResponseDesaparecido = MOCK_RESPONSE_DESAPARECIDO;
    service.listaDesaparecidos = listaMock;

    service.listaDesaparecidos$.subscribe((lista: any) => {
      expect(lista).toEqual(listaMock);
      done();
    });
  });

  it('deve retornar a lista de desaparecidos diretamente via getter', () => {
    const listaMock = MOCK_RESPONSE_DESAPARECIDO;

    service.listaDesaparecidos = listaMock;

    expect(service.listaDesaparecidos).toEqual(listaMock);
  });

  it('deve atualizar e emitir o estado de carregamento corretamente', (done) => {
    service.carregandoListaDesaparecidos = true;
    service.carregandoListaDesaparecidos$.subscribe((status: any) => {
      expect(status).toBe(true);
      done();
    });
  });

  it('deve retornar o estado de carregamento diretamente via getter', () => {
    service.carregandoListaDesaparecidos = false;

    expect(service.carregandoListaDesaparecidos).toBeFalse();

    service.carregandoListaDesaparecidos = true;

    expect(service.carregandoListaDesaparecidos).toBeTrue();
  });
});
