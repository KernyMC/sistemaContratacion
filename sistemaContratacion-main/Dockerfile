FROM node:alpine
WORKDIR /sistemaContratacion-main
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
CMD ["npm", "run", "start"]