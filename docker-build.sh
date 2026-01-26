#!/bin/bash

VERSION=0.3.1

DOCKER_NAME=registry.ferris.place/concert-list

VERSION_TAG="$DOCKER_NAME:$VERSION"
LATEST_TAG="$DOCKER_NAME:latest"

# Enable BuildKit for faster builds and cache mounts
export DOCKER_BUILDKIT=1

docker build -t $VERSION_TAG -t $LATEST_TAG .

docker push $VERSION_TAG
docker push $LATEST_TAG
