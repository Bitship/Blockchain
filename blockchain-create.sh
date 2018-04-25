VERSION=$(cat blockchain/package.json | jq ".version" | sed "s/\"//g")
echo
echo "VERSION: $VERSION"

composer card delete --card admin@bitship
composer archive create --sourceType dir --sourceName ./blockchain
composer network install --card PeerAdmin@hlfv1 --archiveFile bitship\@$VERSION.bna
composer network start --networkName bitship --networkVersion $VERSION --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1
composer card import -f admin\@bitship.card
composer network ping -c admin\@bitship
