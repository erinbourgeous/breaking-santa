#!/bin/bash

docker run --name christmas-bourgeous \
  --expose 8080 \
  -d \
  -e VIRTUAL_HOST=christmas.bourgeous.com \
  -e VIRTUAL_PORT=8080 \
  -e MYSQL_USER='root' \
  -e MYSQL_DB='bourgeous' \
breaking-santa

