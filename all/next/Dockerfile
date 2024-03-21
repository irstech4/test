FROM node:20.9.0

WORKDIR /app

COPY package*.json  ./

COPY . .

RUN npm install 

RUN npm run build

EXPOSE 3000

# Run production server for efficiency
CMD [ "npm", "run", "start" ]