import { TestBed } from '@angular/core/testing';
import { AlertService } from '../../core/alert/alert.service';
import { ETipoMensagem } from '../Models/enums/shared.enums';
import { MensagemService } from './Mensagem.service';

describe('MensagemService', () => {
  let service: MensagemService;
  let alertServiceSpy: jasmine.SpyObj<AlertService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('AlertService', [
      'info',
      'success',
      'error',
      'warning',
    ]);

    TestBed.configureTestingModule({
      providers: [MensagemService, { provide: AlertService, useValue: spy }],
    });

    service = TestBed.inject(MensagemService);
    alertServiceSpy = TestBed.inject(
      AlertService
    ) as jasmine.SpyObj<AlertService>;
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve chamar alertService.info para mensagens do tipo INFO', () => {
    service.mensagem('Mensagem de informação', ETipoMensagem.INFO);
    expect(alertServiceSpy.info).toHaveBeenCalledWith('Mensagem de informação');
  });

  it('deve chamar alertService.success para mensagens do tipo SUCCESS', () => {
    service.mensagem('Mensagem de sucesso', ETipoMensagem.SUCCESS);
    expect(alertServiceSpy.success).toHaveBeenCalledWith('Mensagem de sucesso');
  });

  it('deve chamar alertService.error para mensagens do tipo ERROR', () => {
    service.mensagem('Mensagem de erro', ETipoMensagem.ERROR);
    expect(alertServiceSpy.error).toHaveBeenCalledWith('Mensagem de erro');
  });

  it('deve chamar alertService.warning para mensagens do tipo WARNING', () => {
    service.mensagem('Mensagem de aviso', ETipoMensagem.WARNING);
    expect(alertServiceSpy.warning).toHaveBeenCalledWith('Mensagem de aviso');
  });

  it('deve chamar alertService.info para mensagens com tipo desconhecido', () => {
    service.mensagem('Mensagem padrão', null as unknown as ETipoMensagem);
    expect(alertServiceSpy.info).toHaveBeenCalledWith('Mensagem padrão');
  });

  it('deve tratar erro e exibir mensagem de erro vinda do backend', () => {
    const erroBackend = {
      status: 400,
      error: {
        message: 'Erro do backend',
      },
    };

    const errorHandler = service.mensagemDeError('Mensagem de erro padrão');
    errorHandler(erroBackend);

    expect(alertServiceSpy.error).toHaveBeenCalledWith('400: Erro do backend');
  });

  it('deve tratar erro e exibir mensagens de erro dos campos, se existirem', () => {
    const erroBackend = {
      status: 422,
      error: {
        message: 'Erro de validação',
        fields: [
          { message: 'Campo obrigatório' },
          { message: 'Valor inválido' },
        ],
      },
    };

    const errorHandler = service.mensagemDeError('Mensagem de erro padrão');
    errorHandler(erroBackend);

    expect(alertServiceSpy.error).toHaveBeenCalledWith(
      '422: Campo obrigatório'
    );
    expect(alertServiceSpy.error).toHaveBeenCalledWith('422: Valor inválido');
  });

  it('deve exibir mensagem de erro padrão se não houver detalhes no backend', () => {
    const erroSimples = { status: 500 };

    const errorHandler = service.mensagemDeError('Erro desconhecido');
    errorHandler(erroSimples);

    expect(alertServiceSpy.error).toHaveBeenCalledWith(
      '500: Erro desconhecido'
    );
  });
});
