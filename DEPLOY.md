# 🚀 Deployment Guide

## Production Environment
This setup is deployed on a production VM with the following details:

**VM Access:**
- **Host:** `10.93.26.192`
- **User:** `root`


## 📦 Deploy from Scratch

### Prerequisites
- Docker and Docker Compose installed
- Ports 80, 5432, 6379, 8888 available

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
NAME            STATUS
su-frontend     Up
su-postgres     Up
su-redis        Up
su-thumbor      Up
```

5. **Open your browser and go to:** http://your-vm-ip


### **Performe this commands for additional Health test:**
```


echo "==================================="
echo "🔍 Health Check: SU Website"
echo "==================================="

# Container status
echo "📦 Container Status:"
docker compose -f docker-compose.prod.yml ps --format "table {{.Name}}\t{{.Status}}"

# Frontend
echo ""
echo "🌐 Frontend:"
curl -s -o /dev/null -w "HTTP %{http_code}\n" http://localhost

# PostgreSQL
echo ""
echo "🐘 PostgreSQL:"
docker exec su-postgres pg_isready -U postgres 2>/dev/null && echo "✅ Ready" || echo "❌ Not ready"

# Redis
echo ""
echo "📦 Redis:"
docker exec su-redis redis-cli ping 2>/dev/null && echo "✅ PONG" || echo "❌ Not responding"

# Thumbor
echo ""
echo "🖼️ Thumbor:"
curl -s -o /dev/null -w "HTTP %{http_code}\n" http://localhost:8888/health

echo ""
echo "==================================="
echo "✅ Health Check Complete"
<img width="599" height="611" alt="image" src="https://github.com/user-attachments/assets/27bd28b7-9c37-42c9-958a-203d8baae959" />
```

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