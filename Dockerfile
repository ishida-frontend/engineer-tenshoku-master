FROM node:18.16.0

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

EXPOSE 8000

CMD ["./startup.sh"]
