module.exports = {
  apps: [
    {
      name: '8bloggen-server',
      script: 'index.js',
      cwd: '/var/www/8bloggen/server',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
};
