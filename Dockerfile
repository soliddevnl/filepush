FROM node:14.17.0-alpine as base

WORKDIR /app
COPY package*.json .env ./
RUN mkdir /files

FROM base as production
ENV NODE_ENV=production
RUN npm ci
RUN npm run build
COPY ./dist dist
CMD ["node", "dist/main"]

FROM base as dev
ENV NODE_ENV=development
RUN npm install
COPY . /
CMD ["npm", "start:dev"]
