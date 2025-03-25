import {
  Desaparecido,
  Ocorrencia,
  ResponseDesaparecido,
} from '../models/desaparecido.model';

export const MOCK_DESAPARECIDO: Desaparecido = {
  id: 1,
  nome: 'João da Silva',
  idade: 30,
  sexo: 'Masculino',
  vivo: true,
  urlFoto: 'https://example.com/foto.jpg',
  ultimaOcorrencia: {
    dtDesaparecimento: '2024-03-10',
    dataLocalizacao: '2024-03-15',
    encontradoVivo: true,
    localDesaparecimentoConcat: 'Centro, São Paulo - SP',
    ocorrenciaEntrevDesapDTO: {
      informacao: 'Última vez visto em um shopping',
      vestimentasDesaparecido: 'Camiseta azul e calça jeans',
    },
    listaCartaz: [
      { urlCartaz: 'https://example.com/cartaz1.jpg', tipoCartaz: 'Oficial' },
    ],
    ocoId: 123,
  },
};

export const MOCK_OCORRENCIAS: Ocorrencia[] = [
  {
    ocoId: 123,
    informacao: 'Ocorrência sobre desaparecimento',
    data: new Date('2024-03-10'),
    id: 1,
    anexos: ['https://example.com/anexo1.pdf'],
  },
];

export const MOCK_RESPONSE_DESAPARECIDO: ResponseDesaparecido = {
  totalPages: 1,
  totalElements: 1,
  pageable: {
    paged: true,
    pageNumber: 0,
    pageSize: 10,
    unpaged: false,
    offset: 0,
    sort: {
      sorted: true,
      unsorted: false,
      empty: false,
    },
  },
  numberOfElements: 1,
  first: true,
  last: true,
  size: 10,
  content: [MOCK_DESAPARECIDO],
  number: 0,
  sort: {
    sorted: true,
    unsorted: false,
    empty: false,
  },
  empty: false,
};
