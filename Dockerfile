# Etapa 1: Construção do Angular
FROM node:18 AS builder
WORKDIR /app

# Copia o package.json e instala dependências
COPY package*.json ./
RUN npm install

# Copia o código-fonte e constrói o Angular
COPY . .
RUN npm run build --prod

# Etapa 2: Servindo com Nginx
FROM nginx:1.23
COPY --from=builder /app/dist/* /usr/share/nginx/html

# Copia o arquivo de configuração do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80
EXPOSE 80

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]
