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

.env.example をコピーし、.env ファイルを作成してください。

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

# Prisma Schema

Prisma のスキームを変更・追加する方法。

まず backend/prisma/schema.prisma を編集してください。

その後でターミナルの backend 側へ移動。

```bash
cd backend
```

以下を実行で schema を更新

```bash
npx prisma migrate dev --name init
```

backend/prisma/migrations にできている。

init から変更内容を表す名称に編集し完了。

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
