# Projeto Angular 19 com Testes e Docker (Teste prativo frontend seletivo seplag)

Este repositório contém um projeto desenvolvido em Angular 19, incluindo testes unitários, testes de ponta a ponta (E2E) e suporte para execução via Docker.

# DADOS INSCRIÇÃO
 + Nome e Email
    - Mardonio Silva da Costa
    - Mardonio@live.com

## Requisitos

Certifique-se de ter os seguintes requisitos instalados em seu ambiente:

- Node.js (versão recomendada: 18+)

- Angular CLI (versão recomendada: 19+)

- Docker

## Instalação

Clone o repositório:
```
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```
## Instale as dependências:
```
npm install
```
## Executando o Projeto

Para iniciar o projeto localmente, utilize o comando:
```
ng serve
```
O aplicativo estará disponível em http://localhost:4200/.

## Testes

### Testes Unitários

Para rodar os testes unitários com Karma, utilize:
```
ng test
```
### Testes E2E (End-to-End)

Para executar os testes E2E com Cypress ou Protractor:
```
ng e2e
```
## Executando com Docker

Construir a imagem Docker:
```
docker build -t angular-app .
```
Rodar o container:
```
docker run -p 4200:80 angular-app
```

O projeto estará acessível em http://localhost:4200/.

## Estrutura do Projeto
```
/SELETIVO-SEPLAG
├── src/                  # Código-fonte do Angular
│   ├── app/              # Componentes e serviços
│        ├── core         # Tudo que aplicação precisa para executar
│        ├── modules      # Partes do sistema divido em modulos
│        ├── shared       # Partes do sistema compartilhada entre modulos
│   ├── assets/           # Arquivos estáticos
│   ├── environments/     # Configuração de ambientes
│   ├── themes/           # Configuração de tailwindcss
│   ├── main.ts           # Ponto de entrada
│   └── styles.scss       # Estilos globais
├── e2e/                  # Testes end-to-end
├── docker/               # Configuração do Docker
├── angular.json          # Configuração do Angular
├── package.json          # Dependências do projeto
├── README.md             # Documentação
└── Dockerfile            # Arquivo para construção do container
```
## Licença

Este projeto é distribuído sob a licença MIT. Sinta-se à vontade para usá-lo e modificá-lo conforme necessário.
