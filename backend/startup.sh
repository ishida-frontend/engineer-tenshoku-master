#!/bin/sh
yarn prisma migrate dev
yarn prisma generate
# yarn prisma db seed
yarn run start
