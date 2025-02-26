FROM node:18-alpine3.17

RUN apk add --no-cache supervisor

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install -g typescript

COPY . .
RUN npm run build
RUN npx prisma generate 

COPY supervisord.conf /etc/supervisord.conf

EXPOSE 4000

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]