#!/bin/sh
set -e

echo "Esperando banco de dados..."
sleep 5

echo "Rodando migrations..."
php artisan migrate --force

echo "Iniciando supervisord..."
exec supervisord -c /etc/supervisor/conf.d/supervisord.conf
