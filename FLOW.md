Step 1:
Sender login into (1)
visit packages list page (1a)
API(1): get packages created by sender. Filterable by package id

Click `create package` button:
See (1b)
(khi create ra Package se co status la PENDING)
Redirect back to (1a)

Step 2:
ShipmentCompany login into (1)

visit packages list page (1c)
Click on PENDING Packages tab
API(2): get packages with status PENDING

Tick checkboxes of packages.
Click `Assign` button to load packages into vehicle
Ticked packages disappear from the list
API(3): call ShipmentTransfer transaction to assign packages (push packages to vehicle, set status to ASSIGN,...)

Step 3:
ShipmentVehicle login into (1)
(physical) Drive to sender's address to fetch assigned packages

Visit packages list page (1d)
API(4): get packages with status ASSIGN and is assigned to the current login ShipmentVehicle

Click `Checkin` button of a given package
Visit the scan package barcode page (1e)
Scan the barcode of package
Scanned package is checked-in for the vehicle
Repeat until done for all packages of the current sender
Click button to sumit scanned packages.
API(5): call ShipmentTransfer transaction to update status of scanned packages to CHECK_IN

(physical) Vehicle will now on their way to deliver these packages to warehouse (optional), then to receiver

Step 4:
(physical) ShipmentVehicle visit warehouse to unload packages
Inspector login into (1) (inspector work for current warehouse)
Visit list packages page (1f)
Select ShipmentVehicle from dropdown. See all packages of selected ShipmentVehicle

Click button Scan package. Visit scan package page.
Each time scan a package's barcode. Scan's package will have status CHECK_OUT
(low priority) Each time scan a package's barcode. Display page with Note field (textarea), Submit button.
Inspector go back to list packages page.
Click button `report`. Call api:
API(6): update packages of shipmentVehicle status to CHECK_OUT. missing packages set to INSPECTED_NOT_OK. Also remove packages from ShipmentVehicle, push packages to Warehouse

Step 5a:
(physical) ShipmentCompany see there are packages in a particular warehouse and dispatch another vehicle to pick them up
ShipmentCompany login into (1)

visit packages list page (1c)
Click on CHECK_OUT Packages tab.
API(7): get all packages with status CHECK_OUT

Tick checkboxes of packages.
Click `Assign` button to load packages into vehicle
Ticked packages disappear from the list
API(8): packageTransfer to assign packages (push packages to vehicle, set status to ASSIGN,...)

Step 5b:
(physical) shipmentVehicle visit warehouse to pickup packages
Inspector login into (1) (inspector work for current warehouse)
Visit list packages page (1f)
Select ShipmentVehicle from dropdown. See all packages with status ASSIGN of selected vehicle

Click `scan` link. Visit scan package page.
Scan each package's barcode. Scan's package will have status CHECK_IN
Inspector go back to list packages page.
Click button `report`. Call api:
API(9): update scanned packages of shipmentVehicle status to CHECK_IN. not scanned packages set status to INSPECTED_NOT_OK. Also push packages to ShipmentVehicle, remove packages from Warehouse

Step 6:
(physical) shipmentVehicle visit receiver to finally deliver the package
(physical) receiver accepts package. sign into receipt
visit ShipmentVehicle's List packages page (1d)
click `Scan deliver` link
Scan package's barcode
Redirect to page to take picture of receipt uploading to ipfs.
-> Submit ShipmentDeliver transaction

API(10): ShipmentDeliver transaction
