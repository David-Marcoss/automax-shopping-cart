FROM node:latest

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 5000

CMD ["npm", "run", "production","--host", "0.0.0.0"]
