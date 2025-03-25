# Etapa 1: Construção do Angular
FROM node:18 AS builder
WORKDIR /app

# Copia os arquivos de dependências e instala usando Yarn
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copia o código-fonte e constrói o Angular
COPY . .
RUN yarn build

# Etapa 2: Servindo com Nginx
FROM nginx:1.23
COPY --from=builder /app/dist/seletivo-seplag/* /usr/share/nginx/html

# Copia o arquivo de configuração do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80
EXPOSE 80

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]
