# Build stage
FROM node:current-alpine3.19 AS build

WORKDIR /build

COPY package*.json .

RUN npm ci

COPY . .

ARG API_URI
ENV BE_API_URI=${API_URI}
# Get static files using generate
RUN npm run generate

# PRODUCTION STAGE - Nginx serve
FROM nginx AS prod

COPY --from=build --chown=node:node /build/nginx.conf /etc/nginx/nginx.conf 
COPY --from=build --chown=node:node /build/dist /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]