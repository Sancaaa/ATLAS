# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Expose Next.js dev port
EXPOSE 3000

# Run Next.js in dev mode
CMD ["npm", "run", "dev"]
