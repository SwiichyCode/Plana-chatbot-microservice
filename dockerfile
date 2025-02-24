FROM node:18-alpine

RUN apk add --no-cache supervisor

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install -g typescript

COPY . .
RUN npm run build

COPY supervisord.conf /etc/supervisord.conf

EXPOSE 4000

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]