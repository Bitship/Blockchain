#!/bin/bash

promptyn () {
    while true; do
        read -p "$1 " yn
        case $yn in
            [Yy]* ) return 0;;
            [Nn]* ) return 1;;
            * ) echo "Please answer yes or no.";;
        esac
    done
}

set -x

# Stop and clear the generated images, container...
echo "Stoping all container"
docker stop $(docker ps -a -q)
echo "Remove all suspended container"
docker rm $(docker ps -a -q)
echo "Remove all dev-* docker-images"
docker rmi $(docker images dev-* -q)

# Remove generated bna, card files
rm -i *.bna
rm -i *.card

# If install fabric-tools to another folder, plese specify to FABRIC_TOOLS_PATH
# ex, export FABRIC_TOOLS_PATH=/path/to/fabric-tools
if [ "$FABRIC_TOOLS_PATH" == "" ]; then
	FABRIC_TOOLS_PATH="$HOME/fabric-tools/"
fi

set +x

# Stop the fabric network
cd $FABRIC_TOOLS_PATH
./stopFabric.sh && ./teardownFabric.sh

# Ask for restart the network
if promptyn "Do you want to restart the fabric-network ?"; then
	echo "Restarting the fabric-network"
	./startFabric.sh && ./createPeerAdminCard.sh
fi

echo "Finish cleaning up fabric-network"
