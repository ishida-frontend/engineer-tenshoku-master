###############
#     dev     #
###############
# docker-composeでコードを共有する前提
# 実行ステージ（開発環境）
# 開発用のイメージをビルドするステージ
FROM node:18.16.0-alpine AS development

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./
COPY prisma ./prisma/

RUN yarn install

EXPOSE 8000

# DBコンテナでDBユーザー権限付与するまで待つ
CMD sleep 45s; ./startup.sh

###############
#    build    #
###############
# ソースコードをビルドする
# 基本的なベースイメージを設定し、アプリケーションのビルドを行う
FROM node:18.16.0-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./
COPY prisma ./prisma/

RUN yarn install --only=production

COPY . .

# TypeScriptをJavaScriptにコンパイル
RUN yarn run build

###############
#    prod     #
###############
# 実行ステージ（本番環境）
# 本番環境用のイメージをビルドするステージ
FROM node:18.16.0-alpine AS production
ENV NODE_ENV=production

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
# ビルドステージでコンパイルされたJavaScriptファイルをコピー
COPY --from=build /app/dist ./dist
# ECSタスクでDBマイグレーションを行うために必要
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/prisma ./prisma/

EXPOSE 8000

# アプリケーションの起動
CMD ["node", "dist/app.js"]
