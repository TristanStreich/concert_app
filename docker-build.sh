#!/bin/bash

VERSION=0.1.0

DOCKER_NAME=registry.ferris.place/concert-list

VERSION_TAG="$DOCKER_NAME:$VERSION"
LATEST_TAG="$DOCKER_NAME:latest"

docker build -t $VERSION_TAG -t $LATEST_TAG .

docker push $VERSION_TAG
docker push $LATEST_TAG