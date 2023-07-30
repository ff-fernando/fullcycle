FROM node:18

ENV WAIT_VERSION 2.7.2
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait

WORKDIR /usr/src/app

COPY . .

EXPOSE 3000

CMD [ "node","index.js" ]