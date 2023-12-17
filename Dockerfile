FROM node:21.2.0-alpine

WORKDIR /crypto-nuxt

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD [ "npm", "run", "start" ]