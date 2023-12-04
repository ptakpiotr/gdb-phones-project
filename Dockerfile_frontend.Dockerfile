FROM node:18-alpine
WORKDIR /app
COPY /common /app/common
COPY /server /app/server
COPY /client /app/client
WORKDIR /app/client
RUN npm install
RUN npm run build
CMD [ "npm", "run", "preview" ]