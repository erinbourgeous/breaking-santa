#!/bin/bash

mkdir -p /etc/nginx

docker run --security-opt=label:type:docker_t -p 80:80 -d \
  -v /etc/nginx/.htpasswd:/etc/nginx/htpasswd/bourgeous.com \
  -v /var/run/docker.sock:/tmp/docker.sock:ro \
  -e HTTPS_METHOD=noredirect \
  --name nginx \
jwilder/nginx-proxy


#  -v /etc/ssl/control_center:/etc/nginx/certs \
