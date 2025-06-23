#!/bin/sh
echo "Waiting for PostgreSQL to start..."
while ! nc -z postgres 5432; do
  sleep 1
done

echo "Running migrations..."
npx prisma migrate dev --name init