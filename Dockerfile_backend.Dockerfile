FROM node:18-alpine
WORKDIR /app
COPY /common /app/common
COPY /server /app/server
WORKDIR /app/server
RUN npm install
RUN npm run build
CMD [ "npm", "run", "start" ]