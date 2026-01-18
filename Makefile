.PHONY: help build dev prod up down logs clean restart shell

# Variables
COMPOSE=docker-compose
COMPOSE_PROD=docker-compose -f docker-compose.prod.yml
APP_NAME=talkhub

help: ## Show this help message
	@echo "TalkHub Docker Commands"
	@echo "======================="
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

build: ## Build Docker images
	$(COMPOSE) build

dev: ## Run in development mode (standard docker-compose)
	$(COMPOSE) up --build

prod: ## Run in production mode (with nginx)
	$(COMPOSE_PROD) up --build -d

up: ## Start containers (detached)
	$(COMPOSE) up -d

down: ## Stop and remove containers
	$(COMPOSE) down

logs: ## View container logs
	$(COMPOSE) logs -f

clean: ## Remove containers, images, and volumes
	$(COMPOSE) down -v --rmi all

restart: ## Restart containers
	$(COMPOSE) restart

shell: ## Access container shell
	docker exec -it $(APP_NAME)-app sh

health: ## Check container health
	docker inspect --format='{{.State.Health.Status}}' $(APP_NAME)-app

stats: ## Show container stats
	docker stats $(APP_NAME)-app

pull: ## Pull latest images
	docker pull node:18-alpine
	docker pull nginx:alpine

# Production specific commands
prod-up: ## Start production containers
	$(COMPOSE_PROD) up -d

prod-down: ## Stop production containers
	$(COMPOSE_PROD) down

prod-logs: ## View production logs
	$(COMPOSE_PROD) logs -f

prod-restart: ## Restart production containers
	$(COMPOSE_PROD) restart

# Utility commands
prune: ## Clean up Docker system
	docker system prune -af

install: ## Install dependencies (without Docker)
	npm install

test-build: ## Test build locally (without Docker)
	npm run build

init: install build ## Initialize project (install + build)