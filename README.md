# engineer-tenshoku-master

エンジニア転職マスター講座

"エンジニア転職マスター講座"とはエンジニア転職希望者が最短で開発スキルを習得できる動画講座です。

# DEMO

追加予定

# Features

エンジニアになりたい方のために講師の石田さんが最短最速でエンジニアになる方法を伝えています。

石田さんは現役でフリーランスのフロントエンドエンジニアであり、様々な開発現場を経験されています。

今の流行りや業界の動向を抑えた上で、初心者が身につけるべき技術や開発スピードアップの方法もレクチャーしてくれます。

# Requirement

- node 18.16.0
- mysql 8.0.32
- docker-compose-up

# Installation

- Docker の環境構築
  Docker のインストール方法を説明します。

frontend フォルダと backend フォルダに.env,example ファイルがあることを確認してください。

frontend にある.env.example をコピーし、.env ファイルを作成してください。

backend 側も同様に行ってください。

MYSQL_ROOT_PASSWORD, MYSQL_USER, MYSQL_PASSWORD の値を設定してください。

※backend 側の.env には AWS の設定が必要です。詳しくはエンジニアに質問してください。

ターミナルで以下を実行

```bash
docker-compose up
```

VSCode にあるターミナルを起動。

```bash
cd backend
```

で backend フォルダに移動。

以下のローカルホストの URL を ⌘+左クリック

もしくは Chrome などのブラウザで検索

```bash
api  | Example app listening at http://localhost:8000
```

以下が画面に表示されれば Docker の設定完了です。

```bash
Hello world !
```

# Server

サーバーの立ち上げ方です。

```bash
cd frontend
```

でフロントエンド側に移動してください。

以下を実行してブラウザ側のサーバー立ち上げ。

```bash
yarn dev
```

event compiled client and server successfully

が表示されたら OK。

次に＋ボタンでターミナルを複製し

```bash
cd backend
```

でバックエンド側に移動してください。

以下を実行して API 側のサーバー立ち上げ

```bash
docker-compose up build --no-cache
```

そして

```bash
docker-compose up
```

api | Example app listening at http://localhost:8000

が表示されたら OK

# husky の設定

自動で deploy する設定方法

VSCode 上でなく、Macのターミナル(Windows ならコマンドプロンプト)を開く。

ターミナル開いたディレクトリ上で以下を実行

```bash
echo "export PATH=\"$(dirname $(which node)):\$PATH\"" > ~/.huskyrc
```

<img width="1110" alt="スクリーンショット 2023-09-18 14 33 20" src="https://github.com/ishida-frontend/engineer-tenshoku-master/assets/61638997/93c16c59-98a8-4162-9a7b-1115ee3083e7">

次に、project のルートディレクトリで以下を実行

```bash
yarn
```

<img width="961" alt="スクリーンショット 2023-09-18 14 33 52" src="https://github.com/ishida-frontend/engineer-tenshoku-master/assets/61638997/e34e1de9-4ecb-40bf-b92b-be02940795e1">

以上で husky の設定は終わりです。

git コマンドおよび SourceTree でコミットする際にエラーがあるか自動で検出してくれます。

# Prisma Schema

Prisma のスキームを変更・追加する方法。

まず backend/prisma/schema.prisma を編集してください。

その後でターミナルの backend 側へ移動。

```bash
cd backend
```

```bash
yarn prisma migrate dev --create-only
```

コマンドでどういうSQLが作成されるか確認。
今回の対応で関係ないものが含まれていないか確認してください。
確認が済んだら

以下を実行で schema を更新

```bash
npx prisma migrate dev --name {ファイル名}
```

backend/prisma/migrations 配下にファイルが新規で作成されている。

# Usage

DEMO の実行方法など、"エンジニア転職マスター講座"の基本的な使い方を説明する

```bash
今後追加予定
```

# Note

注意点などがあれば書く

```bash
今後追加予定
```

# Author

- 作成者
  Ishida, Sakai, Fumi, Dai, Sano
- 所属
  Engineer Learning Team
- E-mail
  (今後追加予定)

# License

"エンジニア転職マスター講座" is under [MIT license](https://).

"エンジニア転職マスター講座" is Confidential.
aaaaaa
