FROM node:18

WORKDIR /app

COPY package*.json ./

# Instala dependências
RUN npm install

# Corrige binários nativos do lightningcss
RUN npm rebuild lightningcss --force || true

COPY . .

# Usa webpack (mais estável que turbopack no docker)
ENV NEXT_TELEMETRY_DISABLED 1
ENV NEXT_SKIP_ENV_CHECK true

CMD ["npm", "run", "dev"]
