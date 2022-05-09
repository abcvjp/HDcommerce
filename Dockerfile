FROM node:16-alpine3.11
WORKDIR /app
COPY ./package.json /app
RUN npm install
RUN npm config set unsafe-perm true
RUN chmod 777 /app/node_modules
ENV CHOKIDAR_USEPOLLING=true
CMD ["npm", "start"]