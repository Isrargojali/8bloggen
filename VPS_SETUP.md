# Hostinger VPS Setup Guide

## 1. Initial VPS Setup

SSH into your VPS:
```bash
ssh root@your-vps-ip
```

Update system and install dependencies:
```bash
apt update && apt upgrade -y
apt install -y nginx git curl
```

## 2. Install Node.js (v20)

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt install -y nodejs
```

## 3. Install PM2 (Process Manager)

```bash
npm install -g pm2
```

## 4. Install MongoDB

```bash
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] http://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
apt update
apt install -y mongodb-org
systemctl start mongod
systemctl enable mongod
```

## 5. Clone the Repository

```bash
mkdir -p /var/www
cd /var/www
git clone https://github.com/Isrargojali/8bloggen.git
cd 8bloggen
```

## 6. Setup Environment Variables

```bash
cd /var/www/8bloggen/server
nano .env
```

Add:
```
MONGO_URI=mongodb://localhost:27017/8bloggen
PORT=3000
JWT_SECRET=your-super-secret-jwt-key-change-this
COHERE_API_KEY=your-cohere-api-key
```

## 7. Install Dependencies & Build

```bash
# Client
cd /var/www/8bloggen/client
npm install
npm run build

# Server
cd /var/www/8bloggen/server
npm install
```

## 8. Start Server with PM2

```bash
cd /var/www/8bloggen/server
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## 9. Configure Nginx

```bash
nano /etc/nginx/sites-available/8bloggen
```

Copy content from `nginx.conf.example` and update `yourdomain.com` with your domain.

```bash
ln -s /etc/nginx/sites-available/8bloggen /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

## 10. Setup SSL (Let's Encrypt)

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## 11. Setup GitHub Actions Secrets

Go to: https://github.com/Isrargojali/8bloggen/settings/secrets/actions

Add these secrets:

| Secret | Value |
|--------|-------|
| `VPS_HOST` | Your VPS IP address |
| `VPS_USERNAME` | `root` (or your SSH user) |
| `VPS_SSH_KEY` | Your private SSH key (full content) |
| `VPS_PORT` | `22` (or custom SSH port) |
| `VITE_BACKEND_URL` | `https://yourdomain.com` |

## 12. Generate SSH Key for GitHub Actions

On your local machine:
```bash
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_actions
```

Add public key to VPS:
```bash
ssh-copy-id -i ~/.ssh/github_actions.pub root@your-vps-ip
```

Copy private key content for `VPS_SSH_KEY` secret:
```bash
cat ~/.ssh/github_actions
```

## Done!

Every push to `master` will auto-deploy to your VPS.
