FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=desafio_estevao
ENV MYSQL_USER=estev


COPY ./database/schema.sql /docker-entrypoint-initdb.d/schema.sql

EXPOSE 3306
