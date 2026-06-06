FROM node:24.16.0

WORKDIR /app

COPY backend/package*.json .

RUN npm install

COPY backend .

EXPOSE 5000

CMD ["node", "server.js", "--", "--host", "0.0.0.0"]