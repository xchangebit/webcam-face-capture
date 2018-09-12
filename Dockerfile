FROM node:9.1
WORKDIR /app
COPY package.json /app/package.json
RUN npm i
COPY src /app
CMD ["node", "/app/index.js"]