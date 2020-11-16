#!/bin/bash

docker run --name breaking-santa-bourgeous \
  -d \
  -v /opt/breaking-santa:/go/src/breaking-santa \
  -w /go/src/breaking-santa \
  --network="host"
  --expose 8080 -p 8080:8080 \
  --env MYSQL_DB=bourgeous \
  --env PORT=8080 \
breaking-santa

docker run --name breaking-santa-fisher \
  -d \
  -v /opt/breaking-santa:/go/src/breaking-santa \
  -w /go/src/breaking-santa \
  --network="host"
  --expose 8081 -p 8081:8081 \
  --env MYSQL_DB=fisher \
  --env PORT=8081 \
breaking-santa
