import { HttpParams } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ETipoMensagem } from '../../shared/Models/enums/shared.enums';
import { MensagemService } from '../../shared/services/Mensagem.service';
import { DesaparecidosFacade } from './desaparecido.facade';
import { DesaparecidosState } from './desaparecido.state';
import { ResponseDesaparecido } from './models/desaparecido.model';
import { DesaparecidosService } from './services/desaparecido.service';
import {
  MOCK_DESAPARECIDO,
  MOCK_RESPONSE_DESAPARECIDO,
} from './services/mock-desaparecidos';

describe('DesaparecidosFacade', () => {
  let service: DesaparecidosFacade;
  let desaparecidosServiceMock: jasmine.SpyObj<DesaparecidosService>;
  let mensagemServiceMock: jasmine.SpyObj<MensagemService>;
  let desaparecidosStateMock: jasmine.SpyObj<DesaparecidosState>;

  beforeEach(() => {
    desaparecidosServiceMock = jasmine.createSpyObj('DesaparecidosService', [
      'listaDesaparecidos',
    ]);
    mensagemServiceMock = jasmine.createSpyObj('MensagemService', ['mensagem']);
    desaparecidosStateMock = jasmine.createSpyObj('DesaparecidosState', [], {
      listaDesaparecidos$: of({} as ResponseDesaparecido),
      carregandoListaDesaparecidos$: of(false),
    });

    TestBed.configureTestingModule({
      providers: [
        DesaparecidosFacade,
        { provide: DesaparecidosService, useValue: desaparecidosServiceMock },
        { provide: MensagemService, useValue: mensagemServiceMock },
        { provide: DesaparecidosState, useValue: desaparecidosStateMock },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate']),
        },
      ],
    });

    service = TestBed.inject(DesaparecidosFacade);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve carregar a lista de desaparecidos com sucesso', () => {
    desaparecidosServiceMock.listaDesaparecidos.and.returnValue(
      of(MOCK_RESPONSE_DESAPARECIDO)
    );

    service.carregaListaDesaparecidos(new HttpParams());

    expect(desaparecidosServiceMock.listaDesaparecidos).toHaveBeenCalled();
  });

  it('deve exibir mensagem de erro ao falhar ao carregar a lista', () => {
    const erroMock = { error: { message: 'Erro ao buscar dados' } };

    desaparecidosServiceMock.listaDesaparecidos.and.returnValue(
      throwError(() => erroMock)
    );

    service.carregaListaDesaparecidos(new HttpParams());

    expect(mensagemServiceMock.mensagem).toHaveBeenCalledWith(
      'Erro ao buscar dados',
      ETipoMensagem.ERROR
    );
  });

  it('deve limpar a lista de desaparecidos', () => {
    service.zeraListaDesaparecidosBuscados();

    expect(desaparecidosStateMock.listaDesaparecidos).toEqual({
      size: 0,
      content: [],
      totalPages: 0,
      totalElements: 0,
      pageable: {
        sort: { empty: true, sorted: false, unsorted: true },
        offset: 0,
        pageNumber: 0,
        pageSize: 0,
        paged: false,
        unpaged: true,
      },
      number: 0,
      numberOfElements: 0,
      empty: true,
      first: false,
      last: true,
      sort: { empty: true, sorted: false, unsorted: true },
    });
  });

  it('deve retornar um desaparecido pelo ID', () => {
    desaparecidosStateMock.listaDesaparecidos = MOCK_RESPONSE_DESAPARECIDO;

    expect(service.getDesaparecido(1)).toEqual(MOCK_DESAPARECIDO);
    expect(service.getDesaparecido(2)).toBeNull();
  });

  it('deve chamar o ngOnDestroy e completar o Subject', () => {
    spyOn(service.removeInscricao$, 'next');
    spyOn(service.removeInscricao$, 'complete');

    service.ngOnDestroy();

    expect(service.removeInscricao$.next).toHaveBeenCalled();
    expect(service.removeInscricao$.complete).toHaveBeenCalled();
  });
});
