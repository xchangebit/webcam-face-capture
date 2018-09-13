FROM node:9.1
WORKDIR /app
COPY package.json /app/package.json
RUN npm i
RUN openssl req -x509 -newkey rsa:2096 -keyout /app/key.pem -out /app/cert.pem -days 365 -nodes -subj "/C=UK/ST=Greater London/L=London /O=Webcam/OU=face/CN=development.example.com/emailAddress=development@example.com"
COPY src /app
ENV ENVIRONMENT PRODUCTION
CMD ["node", "/app/index.js"]