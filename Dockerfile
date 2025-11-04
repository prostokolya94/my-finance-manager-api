# Dockerfile

# Этап 1: Сборка (builder)
FROM node:18 AS builder
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем исходники и tsconfig
COPY src ./src
COPY tsconfig.json ./

# Компилируем TypeScript
RUN npx tsc

# Этап 2: Финальный образ (без devDependencies)
FROM node:18-alpine
WORKDIR /app

# Копируем только production-зависимости
COPY package*.json ./
RUN npm install --production

# Копируем скомпилированный код из builder
COPY --from=builder /app/dist ./dist

# Открываем порт (ваш сервер слушает 8000)
EXPOSE 8000

# Запускаем приложение
CMD ["node", "dist/server.js"]