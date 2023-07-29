-- Prisma用にDBユーザー権限を付与する（https://polidog.jp/2023/05/03/prisma-mysql/）
GRANT CREATE, ALTER, DROP, REFERENCES ON database.* TO '${MYSQL_USER}'@'%';
