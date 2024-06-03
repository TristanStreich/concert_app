FROM node:22

WORKDIR /usr/src

COPY . .

RUN npm i
RUN npm run build

CMD ["npm", "start"]