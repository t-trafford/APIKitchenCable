#!/bin/bash
docker build -t lokeshboran/god-of-mischief-api .
docker push lokeshboran/god-of-mischief-api

ssh deploy@$DEPLOY_SERVER << EOF
docker pull lokeshboran/god-of-mischief-api
docker stop api-boilerplate || true
docker rm api-boilerplate || true
docker rmi lokeshboran/god-of-mischief-api:current || true
docker tag lokeshboran/god-of-mischief-api:latest lokeshboran/god-of-mischief-api:current
docker run -d --restart always --name api-boilerplate -p 3000:3000 lokeshboran/god-of-mischief-api:current
EOF
