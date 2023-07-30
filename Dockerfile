FROM node:18.16.0

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

EXPOSE 8000

# DBコンテナでDBユーザー権限付与するまで待つ
CMD sleep 45s; ./startup.sh
