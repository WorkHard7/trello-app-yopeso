build:
	docker-compose build

cleanup:
	docker-compose down

hard-cleanup: cleanup
	docker rmi -f $(docker-compose images -q)

migrate:
	docker-compose run --entrypoint "/backend/rest_api/bin/console" backend doctrine:migrations:migrate --no-interaction

composer-install:
	docker-compose run --entrypoint "composer" backend install

up: cleanup build composer-install migrate
	docker-compose up -d
