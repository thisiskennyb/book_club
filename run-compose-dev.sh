# Need to add api key and url environment variables?

export SECRET_KEY=abc123
export DEBUG=True
export POSTGRES_DB=book_db
export POSTGRES_USER=postgres
export POSTGRES_PASSWORD=postgres



COMPOSE_DOCKER_CLI_BUILD=0 DOCKER_BUILDKIT=0 docker compose -f docker-compose.dev.yml up -d --build

# make sure the postgres container is ready, then run migrations
sleep 10
docker exec book_club-api-1 python /src/manage.py makemigrations 
docker exec book_club-api-1  python /src/manage.py migrate
