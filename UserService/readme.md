to start server: npm start

migrations:
npx knex migrate:latest
npx knex migrate:rollback
NODE_ENV=testing npx knex migrate:latest

create migration:
knex migrate:make migration_create_table

minio run:
minio server '/Users/silchenko/server-data' --console-address ":9001"

redis:
redis-server

docker build . -t silchenko/node-web-app
docker run -p 3000:3000 -d silchenko/node-web-app

docker-compose build
docker-compose up
docker-compose down

docker-compose -f docker-compose.yml -f docker-compose-dev.yml up -d

add config for minio to run with docker:
mc config host add local http://minio:9000 minioadmin minioadmin --api S3v4 --lookup auto
