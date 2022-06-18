FROM node:16.14.2

#Create app directory
WORKDIR /usr/src/app

#Install dependecies
#Wildcard for all packeges in package.json and package-lock.json
COPY package*.json ./

RUN npm install


#insall dependecies for production.
#RUN npm ci --only=production

#Bundle app sorce
COPY . .
EXPOSE 8080

CMD ["node", "src/server.js"]
