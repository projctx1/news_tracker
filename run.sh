#!/bin/bash

set -a
source .env
set +a

echo "Creating Docker network: $DOCKER_NETWORK"
docker network create $DOCKER_NETWORK || echo "Network $DOCKER_NETWORK already exists or could not be created."

# 🧠 Start MySQL container if not already running
if [ "$(docker ps -a -q -f name=^/${MYSQL_HOST}$)" ]; then
    echo "MySQL container '$MYSQL_HOST' already exists. Skipping creation."
    docker start $MYSQL_HOST
else
    echo "Starting MySQL container: $MYSQL_HOST"
    docker run -d \
      --name $MYSQL_HOST \
      --network $DOCKER_NETWORK \
      -e MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD \
      -e MYSQL_USER=$MYSQL_USER \
      -e MYSQL_PASSWORD=$MYSQL_PASSWORD \
      -e MYSQL_DATABASE=$MYSQL_DATABASE \
      mysql:8.0
fi

# 🕐 Wait for MySQL to be ready
echo "Waiting for MySQL to be ready..."
until docker exec $MYSQL_HOST mysql -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" -e "SELECT 1;" > /dev/null 2>&1; do
    echo -n "."; sleep 2
done
echo "MySQL is ready!"

echo "Connecting containers to all additional Docker networks..."

for net in $(docker network ls --filter "driver=bridge" --format "{{.Name}}" | grep -vE 'bridge|host|none|^'$DOCKER_NETWORK'$'); do
    echo "Processing network: $net"
    
    if ! docker network inspect "$net" | grep -q "$MYSQL_HOST"; then
        echo "Connecting $MYSQL_HOST to $net"
        docker network connect "$net" "$MYSQL_HOST"
    fi
done


echo "Starting Docker containers with build..."
docker compose -p "$DOCKER_NETWORK" up --build -d