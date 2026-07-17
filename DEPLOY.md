# 🚀 Deployment Guide

## Production Environment

This setup is deployed on a production VM with the following details:

**VM Access:**

- **Host:** `10.93.26.192`
- **User:** `root`

## 📦 Deploy from Scratch

### Prerequisites

- Docker and Docker Compose installed
- Ports 80, 5432, 8080, 8888 available

### Steps

1. **Clone the repository**

```bash
git clone https://github.com/plaksiki/SU-Website.git
cd SU-Website
```

2. **Copy environment variables**

```bash
cp .env.example .env
# Edit .env with your values
```

3. **Start all services**

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

4. **Verify everything works**

```bash
docker compose -f docker-compose.prod.yml ps
```

**Expected output:**

```markdown

NAME                     STATUS
su-website-backend-1     Up
su-website-db-1          Up
su-website-frontend-1    Up
```

5. **Open your browser and go to:** `http://your-vm-ip`

## 🔄 Update Deployed Version

```bash
git pull origin main
docker compose -f docker-compose.prod.yml down
docker compose -f docker-compose.prod.yml up -d --build
```

### Health test

1. **Perform this in project directory:**

```bash
chmod +x healthcheck.sh
./healthcheck.sh
```

   **Or this:**

```bash
bash healthcheck.sh
```

2. **Or perform this commands instead:**

```bash
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

# PostgreSQL
echo ""
echo "🐘 PostgreSQL:"
docker ps --filter "name=db" --filter "status=running" --format "{{.Status}}" | grep -q "Up" && echo "✅ Up" || echo "❌ Not running"

# Thumbor
echo ""
echo "🖼️  Thumbor:"
curl -s -o /dev/null -w "HTTP %{http_code}\n" http://localhost:8888/healthcheck 2>/dev/null || echo "❌ Not reachable"

echo ""
echo "==================================="
echo "✅ Health Check Complete"
echo "==================================="
```

**Example of Results:**

```markdown
===================================
🔍 Health Check: SU Website
===================================
📦 Container Status:
NAME                    STATUS
su-thumbor              Up 3 minutes
su-website-backend-1    Up 3 minutes
su-website-db-1         Up 3 minutes (healthy)
su-website-frontend-1   Up 3 minutes

🌐 Frontend:
HTTP 200

⚙️ Backend API:
HTTP 404

🐘 PostgreSQL:
✅ Up

🖼️  Thumbor:
HTTP 200

===================================
✅ Health Check Complete
```

## Connection DB to Spring Boot

```properties

  spring.datasource.url=jdbc:postgresql://{DB_IP-ADRES}:{DB_PORT(usually 5432)}/{DB_NAME}
  spring.datasource.username={DB_LOGIN (usually postgres or admin)}
  spring.datasource.password={DB_PASSWORD}
```
