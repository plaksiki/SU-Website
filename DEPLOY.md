# 🚀 Deployment Guide

## Production Environment

This setup is deployed on a production VM with the following details:

**VM Access:**

- **Host:** `10.93.26.192`
- **User:** `root`

## 📦 Deploy from Scratch

### Prerequisites

- Docker and Docker Compose installed
- Ports 80, 5432, 8080 available

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

### Perform this commands for additional Health test:

```markdown
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


echo ""
echo "⚙️ Backend API:"
curl -s -o /dev/null -w "HTTP %{http_code}\n" http://localhost:8080/actuator/health 2>/dev/null || echo "❌ Not reachable"

# PostgreSQL
echo ""
echo "🐘 PostgreSQL:"
docker ps --filter "name=db" --filter "status=running" --format "{{.Status}}" | grep -q "Up" && echo "✅ Up" || echo "❌ Not running"

echo ""
echo "==================================="
echo "✅ Health Check Complete"
```

**Example of Results:**



## Auto-Update (Cron)

- The VM automatically checks for updates every 5 minutes:
  
```bash
*/5 * * * * cd /root/SU-Website && /bin/bash update.sh >> /var/log/site-update.log 2>&1
```

### Manual Update

```bash
cd /SU-Website
./update.sh
```

### View Update Logs

```bash
tail -f /var/log/site-update.log
```