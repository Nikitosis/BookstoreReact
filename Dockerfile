# Use an official node runtime as a parent image
FROM node:12.2.0-alpine

WORKDIR /app/

COPY . /app/

EXPOSE 3000