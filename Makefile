.PHONY: default
default: up;

build:
	docker-compose build

cleanup:
	docker-compose down

hard-cleanup: cleanup
	docker rmi -f $(docker-compose images -q)

start:
	docker-compose up -d

restart: cleanup start

migrate:
	docker-compose run --entrypoint "/backend/rest_api/bin/console" backend doctrine:migrations:migrate --no-interaction

composer-install:
	docker-compose run --entrypoint "composer" backend install

npm-install:
	docker-compose run --entrypoint "npm" ui install

up: cleanup build npm-install composer-install migrate start
