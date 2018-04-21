# BitShip

### What business problem is being solved?

Create a platform that contains reliable source of shipment status data that people can see and trust.
  
### For each participant, what are their actions in the network?
  * Sender: entrust the package(s) delivery to the shipper
  * Receiver: view the shipment status
  * Inspector: verify the content of the shipment
  * Shipper: deliver the package(s)
  '
### What are the main inefficiencies/problems in this process today?
* No transparency:
  - Delegate to another intermediate
  - Waste of time to verify packages by papers 
* Trust status of packages 
* Trust the fee from intermediate

### How does blockchain benefit/address these problems
* Transparency:
  - Information of the package
  - Information of the shipper
* No trust to another intermediate
* Save time to verify packages
* Secure the data

#### Better flow of information?
- more or less
#### More trust?
- yes
#### Fewer intermediaries?
- yes
#### Creates new businesses/services?
- yes

### What are the network's:
#### Participants:
* Sender:
  * Example: Company, Supplier, Retailer, Seller
  * Properties: sender_id, name, email, phone, address, company_name.
  * Properties: sender_id, name, email, phone, address, type(person|company).
* Receiver:
  * Example: Company, Buyer
  * Properties: receiver_id, first_name, last_name, email, phone, address, type(person|company).
* Inspector:
  * Example: Warehouse, Customs
  * Properties: inspector_id, name
* ShipmentCompany
  * shipment_company_id, name
* ShipperVehicle:
  * Example: Company
  * Properties: shipper_vehicle_id, shipment_company_id, name, type(car|motobike), license_plate
* Shipper
  * shipper_id, shipment_company_id, name

* Shipper:
  * Example: Company
  * Properties: shipper_id, name, type(car|motobike), license_plate


Assets - the entities that need to be created/modified/transferred by transactions
* Package
  * package_id, barcode, sender_id, receiver_id, status(pending|shipping|warehouse|lost|delivered), created_at

Transactions - the updates that happen inside the network
* ShipmentSession
  * Properties: shipper_vehicle_id, shipper_id, package_ids, status{in_progress|done} location{lat, lon}
* Inspection
  * inspection_id, place(string), location{lat, lon}, inspector_id, shipment_id, ok

What are the contractual obligations or conditions before/after the transaction?
* Only Sender can create Package
* Only ShipmentCompany can create ShipmentSession
* Only Inspector can create Inspection
* Inspection cannot be updated by anyone

### Who are the participants to your business network?

* How many different types of participants?
  * *See above*
* How will they access/interact with the blockchain? Will they need their own peer nodes? Do you need web / mobile apps?
  * Web for:
    * sender to create package
    * shipmentCompany to distribute packages to shipperVehicle
    * shipmentCompany to assign shipper to shipperVehicle
   * Mobile app for:
    * Inspector to create inspection
    * Sender checkIn/checkOut packages 
* Integration with other systems?
  * No
Do they need to integrate with external data sources?
Who will operate the blockchain?
Who will regulate the blockchain?

### What types of transaction processes need to take place?

Invoke actions - add / delete / change / transfer
Queries - read-only queries for data on the blockchain
Do you need to control access to these functions based on participant types?
Under what conditions should transactions occur?
regulatory conditions?
contractual agreements?

## Development

### Blockchain network deployment

First, make sure fabric development started with `./startFabric.sh` from fabric-tools
And PeerAdmin@hlfv1 created with `./createPeerAdminCard.sh`

`cd` to project root directory

Deploy blockchain network:

```bash
composer archive create --sourceType dir --sourceName ./blockchain
composer network install --card PeerAdmin@hlfv1 --archiveFile bitship\@0.0.1.bna
composer network start --networkName bitship --networkVersion 0.0.1 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1
composer card import -f admin\@bitship.card
composer network ping -c admin\@bitship
```

Update blockchain network:

Up version in `blockchain/package.json`. Then

```bash
composer archive create --sourceType dir --sourceName ./blockchain --archiveFile bitship@0.0.2.bna
composer network install --card PeerAdmin@hlfv1 --archiveFile bitship\@0.0.2.bna
composer network upgrade --networkName bitship --networkVersion 0.0.2 --card PeerAdmin@hlfv1
```

### Start backend-rest server

`cd backend-test`

`npm start`
