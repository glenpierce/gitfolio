FROM node:20-bookworm-slim

WORKDIR /workspace

# Install dependencies first for better Docker layer caching.
COPY package.json package-lock.json ./
RUN npm i

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--hostname", "0.0.0.0", "--port", "3000"]
