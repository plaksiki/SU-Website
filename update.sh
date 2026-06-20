#!/bin/bash

echo "🔄 Начинаю обновление сайта..."

# Переходим в папку проекта
cd ~/SU-Website

# Стягиваем последние изменения
git pull origin main

# Пересобираем и перезапускаем контейнеры
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d --build

# Очищаем старые образы
docker system prune -f

echo "✅ Сайт обновлен!"
