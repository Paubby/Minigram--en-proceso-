FROM node:24.21-alpine3.24

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build --prod
RUN npm install http-server -g

EXPOSE 4200

CMD http-server dist/frontend/browser -p 4200 -a 0.0.0.0
