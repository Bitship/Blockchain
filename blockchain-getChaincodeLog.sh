#!/bin/bash

echo ""
echo "***************** Docker ps -a **************************"
docker ps -a
echo "*********************************************************"
echo ""

LATEST_DEV_CONTAINER=$(docker ps -a --filter="name=dev-*" | tail -n +2  | awk '{printf("%s\n", $1)}' | head -1)
echo "Lastest dev container: $LATEST_DEV_CONTAINER"

docker logs -f $LATEST_DEV_CONTAINER
