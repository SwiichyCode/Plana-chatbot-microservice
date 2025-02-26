#!/bin/sh

echo "🚀 Lancement des migrations Prisma..."
npx prisma migrate deploy

echo "🔄 Démarrage de l'application..."
exec /usr/bin/supervisord -c /etc/supervisord.conf