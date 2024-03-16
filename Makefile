SHELL = /bin/bash

.PHONY: build
build:
	docker compose build


.PHONY: down
down:
	docker compose down


.PHONY: frontend
frontend:
	cd app && npm run start
	

.PHONY: prod
prod: down build
	docker compose up


.PHONY: help
help:
	@echo		"Commands:"
	@echo		"frontend:			Runs app dev environment."
	@echo		"prod:					Simulates production environment."
	@echo		"build:					Build docker images."
	@echo		"down:					Takes down docker compose containers."
