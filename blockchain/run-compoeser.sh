
echo composer archive create --sourceType dir --sourceName . --archiveFile bitship@0.0.18.bna

echo 
composer network install --card PeerAdmin@hlfv1 --archiveFile bitship@0.0.18.bna

echo
composer network start --networkName bitship --networkVersion 0.0.18 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1

# echo
# composer network upgrade --networkName bitship --networkVersion 0.0.15 --card PeerAdmin@hlfv1