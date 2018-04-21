VERSION=$(cat blockchain/package.json | jq ".version" | sed "s/\"//g")
echo
echo "VERSION: $VERSION"

composer archive create --sourceType dir --sourceName ./blockchain --archiveFile bitship@$VERSION.bna
composer network install --card PeerAdmin@hlfv1 --archiveFile bitship\@$VERSION.bna
composer network upgrade --networkName bitship --networkVersion $VERSION --card PeerAdmin@hlfv1
