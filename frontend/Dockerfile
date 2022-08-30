FROM node:18
RUN apt-get update -y && \
    apt-get install git -y

COPY package*.json ./

RUN npm install

COPY . .

ENTRYPOINT ["npm", "run", "start"]
