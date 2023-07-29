#!/bin/bash
set -e

mysql -v -u root -p${MYSQL_ROOT_PASSWORD} <<-EOSQL
    GRANT CREATE, ALTER, DROP, REFERENCES ON *.* TO '${MYSQL_USER}'@'%';
    FLUSH PRIVILEGES;
EOSQL
