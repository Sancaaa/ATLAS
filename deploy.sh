#!/bin/bash

# TalkHub Docker Deployment Script
# Automated setup and deployment helper

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}ℹ ${NC}$1"
}

log_success() {
    echo -e "${GREEN}✓ ${NC}$1"
}

log_warning() {
    echo -e "${YELLOW}⚠ ${NC}$1"
}

log_error() {
    echo -e "${RED}✗ ${NC}$1"
}

# Check if Docker is installed
check_docker() {
    log_info "Checking Docker installation..."
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed!"
        log_info "Install Docker: https://docs.docker.com/get-docker/"
        exit 1
    fi
    log_success "Docker is installed ($(docker --version))"
}

# Check if Docker Compose is installed
check_docker_compose() {
    log_info "Checking Docker Compose installation..."
    if ! command -v docker-compose &> /dev/null; then
        log_error "Docker Compose is not installed!"
        log_info "Install Docker Compose: https://docs.docker.com/compose/install/"
        exit 1
    fi
    log_success "Docker Compose is installed ($(docker-compose --version))"
}

# Check if Docker daemon is running
check_docker_running() {
    log_info "Checking if Docker daemon is running..."
    if ! docker info &> /dev/null; then
        log_error "Docker daemon is not running!"
        log_info "Start Docker: sudo systemctl start docker"
        exit 1
    fi
    log_success "Docker daemon is running"
}

# Build Docker image
build_image() {
    log_info "Building Docker image..."
    docker-compose build
    log_success "Docker image built successfully"
}

# Start containers
start_containers() {
    MODE=$1
    if [ "$MODE" = "prod" ]; then
        log_info "Starting containers in production mode..."
        docker-compose -f docker-compose.prod.yml up -d
    else
        log_info "Starting containers in development mode..."
        docker-compose up -d
    fi
    log_success "Containers started"
}

# Check health
check_health() {
    log_info "Waiting for application to start..."
    sleep 5
    
    MAX_RETRIES=30
    RETRY_COUNT=0
    
    while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
        if curl -s http://localhost:3000 > /dev/null; then
            log_success "Application is healthy and running!"
            return 0
        fi
        RETRY_COUNT=$((RETRY_COUNT + 1))
        echo -n "."
        sleep 2
    done
    
    log_error "Application failed to start within timeout"
    log_info "Check logs: docker-compose logs"
    return 1
}

# Show logs
show_logs() {
    log_info "Showing application logs (Ctrl+C to exit)..."
    docker-compose logs -f
}

# Stop containers
stop_containers() {
    log_info "Stopping containers..."
    docker-compose down
    log_success "Containers stopped"
}

# Clean up
cleanup() {
    log_warning "This will remove all containers, images, and volumes!"
    read -p "Are you sure? (y/N) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        log_info "Cleaning up..."
        docker-compose down -v --rmi all
        log_success "Cleanup complete"
    else
        log_info "Cleanup cancelled"
    fi
}

# Main menu
show_menu() {
    echo ""
    echo "================================="
    echo "   TalkHub Deployment Script"
    echo "================================="
    echo ""
    echo "1) Quick Start (Build + Run)"
    echo "2) Production Start (with Nginx)"
    echo "3) Build Docker image"
    echo "4) Start containers"
    echo "5) Stop containers"
    echo "6) View logs"
    echo "7) Check health"
    echo "8) Clean up"
    echo "9) Run checks only"
    echo "0) Exit"
    echo ""
}

# Quick start
quick_start() {
    echo ""
    log_info "Starting TalkHub deployment..."
    echo ""
    
    check_docker
    check_docker_compose
    check_docker_running
    
    echo ""
    build_image
    
    echo ""
    start_containers "dev"
    
    echo ""
    if check_health; then
        echo ""
        log_success "TalkHub is running at http://localhost:3000"
        echo ""
        log_info "Next steps:"
        echo "  - View logs: docker-compose logs -f"
        echo "  - Stop app: docker-compose down"
        echo "  - Access shell: docker exec -it talkhub-app sh"
        echo ""
    fi
}

# Production start
production_start() {
    echo ""
    log_info "Starting TalkHub in production mode..."
    echo ""
    
    check_docker
    check_docker_compose
    check_docker_running
    
    echo ""
    build_image
    
    echo ""
    start_containers "prod"
    
    echo ""
    if check_health; then
        echo ""
        log_success "TalkHub is running in production mode"
        log_success "HTTP: http://localhost"
        log_success "App: http://localhost:3000"
        echo ""
        log_info "Next steps:"
        echo "  - Configure SSL in nginx.conf"
        echo "  - Set up domain DNS"
        echo "  - View logs: docker-compose -f docker-compose.prod.yml logs -f"
        echo ""
    fi
}

# Run checks only
run_checks() {
    echo ""
    log_info "Running system checks..."
    echo ""
    
    check_docker
    check_docker_compose
    check_docker_running
    
    echo ""
    log_success "All checks passed!"
    echo ""
}

# Interactive mode
if [ $# -eq 0 ]; then
    while true; do
        show_menu
        read -p "Select option: " choice
        
        case $choice in
            1)
                quick_start
                ;;
            2)
                production_start
                ;;
            3)
                check_docker
                check_docker_compose
                check_docker_running
                build_image
                ;;
            4)
                check_docker_running
                read -p "Start in production mode? (y/N) " -n 1 -r
                echo
                if [[ $REPLY =~ ^[Yy]$ ]]; then
                    start_containers "prod"
                else
                    start_containers "dev"
                fi
                ;;
            5)
                stop_containers
                ;;
            6)
                show_logs
                ;;
            7)
                check_health
                ;;
            8)
                cleanup
                ;;
            9)
                run_checks
                ;;
            0)
                log_info "Goodbye!"
                exit 0
                ;;
            *)
                log_error "Invalid option"
                ;;
        esac
    done
else
    # Command-line mode
    case $1 in
        start)
            quick_start
            ;;
        prod)
            production_start
            ;;
        stop)
            stop_containers
            ;;
        logs)
            show_logs
            ;;
        check)
            run_checks
            ;;
        clean)
            cleanup
            ;;
        *)
            echo "Usage: $0 {start|prod|stop|logs|check|clean}"
            echo ""
            echo "  start - Quick start in development mode"
            echo "  prod  - Start in production mode with nginx"
            echo "  stop  - Stop all containers"
            echo "  logs  - View application logs"
            echo "  check - Run system checks"
            echo "  clean - Clean up everything"
            echo ""
            echo "Run without arguments for interactive menu"
            exit 1
            ;;
    esac
fi