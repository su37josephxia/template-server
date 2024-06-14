docker-compose up -d
pm2 start process.yml
pm2 start ../builder-ssr/process.yml
pm2 start ../builder/process.yml
pm2 monit