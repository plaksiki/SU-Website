#!/bin/bash

echo "==================================="
echo "🔍 Health Check: SU Website"
echo "==================================="

# Container status
echo "📦 Container Status:"
docker compose -f docker-compose.prod.yml ps --format "table {{.Name}}\t{{.Status}}"

# Frontend
echo ""
echo "🌐 Frontend:"
curl -s -o /dev/null -w "HTTP %{http_code}\n" http://localhost || echo "❌ Not reachable"

# Backend
echo ""
echo "⚙️ Backend API:"
curl -s -o /dev/null -w "HTTP %{http_code}\n" http://localhost:8080/actuator/health 2>/dev/null || echo "❌ Not reachable"

# Thumbor
echo ""
echo "🖼️  Thumbor:"
curl -s -o /dev/null -w "HTTP %{http_code}\n" http://localhost:8888/healthcheck 2>/dev/null || echo "❌ Not reachable"

# PostgreSQL
echo ""
echo "🐘 PostgreSQL:"
docker ps --filter "name=db" --filter "status=running" --format "{{.Status}}" | grep -q "Up" && echo "✅ Up" || echo "❌ Not running"

echo ""
echo "==================================="
echo "✅ Health Check Complete"
echo "==================================="