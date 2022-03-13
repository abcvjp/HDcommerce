FROM node:16-alpine3.11
ENV NODE_ENV=development
WORKDIR /workdir
COPY . ./
RUN yarn install
CMD ["yarn", "start:dev"]