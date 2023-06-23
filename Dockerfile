# Pulling node js baseimage from dockerhub
FROM node:14.2.0-alpine3.11
# Maintainer and email
MAINTAINER Aravind aravind.u@taskmo.com
#Installing packages
RUN apk add --update nodejs npm && \
  apk add --update npm
# Run as a node user 
RUN mkdir -p "/home/app" && \
  chown node:node /home/app -R
#Copy Projet file to Working dir
COPY . /home/app/
WORKDIR /home/app
#Building the App and install the pm2 for start up
RUN npm install
USER node
COPY --chown=node:node . /home/app
# Expose to port
EXPOSE 8023
#Specifying the entry point to start the application
ENTRYPOINT [ "npm", "start" ]