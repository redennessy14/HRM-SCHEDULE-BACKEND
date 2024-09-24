FROM node:18.16.0-alpine AS development

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

CMD yarn start:${BUILD_ENV:-dev}
