# 🚀 Deployment Guide

**Last Update: 2026-07-17.**

## Table of Contents

- [🚀 Deployment Guide](#-deployment-guide)
  - [Table of Contents](#table-of-contents)
  - [Production Environment](#production-environment)
  - [📦 Deploy from Scratch](#-deploy-from-scratch)
    - [Prerequisites](#prerequisites)
    - [Steps](#steps)
  - [🔒 Security Notes](#-security-notes)
  - [🔄 Update Deployed Version](#-update-deployed-version)
  - [Health test](#health-test)
  - [Connection DB to Spring Boot](#connection-db-to-spring-boot)
  - [🛑 Stop / Restart](#-stop--restart)
  - [Troubleshooting](#troubleshooting)
    - [Port conflicts](#port-conflicts)
    - [Check Logs](#check-logs)
    - [Database connection failed](#database-connection-failed)
    - [Container exits immediately](#container-exits-immediately)
    - [Nuclear option — FULL RESET](#nuclear-option--full-reset)

---

## Production Environment

This setup is currently deployed on a production VM with the following details:

**VM Access:**

- **Host:** `10.93.26.192`
- **User:** `root`

---

## 📦 Deploy from Scratch

**First-time setup on a clean VM.**

### Prerequisites

- Docker and Docker Compose installed
- Ports 80, 8080, 8888 available externally
- Port 5432 used internally only (see Security Notes below)

## 🔒 Security Notes
- PostgreSQL port (5432) must not be exposed to the public internet.
  In `docker-compose.prod.yml`, it should either be bound to 
  `127.0.0.1:5432:5432`, or not published at all — the backend connects 
  to the database via the internal Docker network name `db:5432`.
- Before deploying, verify: `curl your-vm-ip:5432` from an external 
  machine should fail/hang.

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

---

## 🔄 Update Deployed Version

**Apply latest code changes.**

```bash
git pull origin main
docker compose -f docker-compose.prod.yml down
docker compose -f docker-compose.prod.yml up -d --build
```

---

## Health test

**Verify all services are running.**

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
===================================
```

---

## Connection DB to Spring Boot

```properties

  spring.datasource.url=jdbc:postgresql://{DB_IP-ADRES}:{DB_PORT(usually 5432)}/{DB_NAME}
  spring.datasource.username={DB_LOGIN (usually postgres or admin)}
  spring.datasource.password={DB_PASSWORD}
```

---

## 🛑 Stop / Restart

**Manage the running services.**

```bash
# Stop everything
docker compose -f docker-compose.prod.yml down

# Restart
docker compose -f docker-compose.prod.yml restart
```

---

## Troubleshooting

**Resolve common issues.**

### Port conflicts

```bash
# Find what's using the port
sudo lsof -i :80
sudo lsof -i :8080
sudo lsof -i :8888

# Kill the process or change port in docker-compose.prod.yml
```

### Check Logs

```bash
# All services
docker compose -f docker-compose.prod.yml logs

# Specific service
docker compose -f docker-compose.prod.yml logs backend
docker compose -f docker-compose.prod.yml logs frontend
docker compose -f docker-compose.prod.yml logs db

# Follow logs (real-time)
docker compose -f docker-compose.prod.yml logs -f backend
```

### Database connection failed

**Symptoms:** Backend fails to start, logs show "Connection refused"

**Solution:**

```bash
# Check if DB is running
docker compose -f docker-compose.prod.yml ps db

# Check DB logs
docker compose -f docker-compose.prod.yml logs db

# Verify environment DB variables in .env
cat .env

# Restart DB
docker compose -f docker-compose.prod.yml restart db
```

### Container exits immediately

**Symptoms:** `docker ps` shows "Exited (1)" or similar

**Solution:**

```bash
# Check logs for the failing container
docker compose -f docker-compose.prod.yml logs backend

# Check if image exists
docker images | grep su-backend

# Rebuild without cache
docker compose -f docker-compose.prod.yml build --no-cache backend
docker compose -f docker-compose.prod.yml up -d
```

### Nuclear option — FULL RESET

**If nothing works, completely reset the deployment:**

```bash
# Stop everything and remove volumes (WARNING: deletes data!)
docker compose -f docker-compose.prod.yml down -v

# Remove images
docker rmi su-backend su-frontend

# Rebuild from scratch
docker compose -f docker-compose.prod.yml up -d --build
```
