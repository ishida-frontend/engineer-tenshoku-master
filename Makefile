.PHONY: setup up d b ps node

COMPOSE_FILE = -f ./backend/compose.yml
COMPOSE = docker-compose $(COMPOSE_FILE)

setup:
	@make up
	@make ps
d:
	$(COMPOSE) down
up:
	$(COMPOSE)  up
ps:
	$(COMPOSE)  ps
