(1) Angular Web App
(1a) Sender's List packages (has mockup)
(1b) Create package form (has mockup)
- some extra field?
(1c) ShipmentCompany's List pending packages. Similar to (1a) but:
- instead of `Create package` button, has `Assign` button
- and has dropdown to select `ShipmentVehicle`
- 2 Tabs:
    - pending packages
    - check-out packages (packages in warehouse)
        - Has Dropdown select warehouse above packages list
(1d) ShipmentVehicle's List packages. Similar to (1a) but:
- doesn't have `Create package` button. Instead, have `Scan check-in` and `Scan deliver` link to scan page (1e)
- Each package row doesn't have checkbox (first column)
- Display all packages of current ShipmentVehicle
<!-- - 2 Tabs on the top: Pending, Checked-in, INSPECTED_OK
    - Each tab will display the list of packages but with status filtered as tab's name -->
(1e) scan package barcode page
* need mockup?
- `Back` link to go back to list packages page (1d or 1f depend on logged-in user)
(1f) Inspector's list packages page. (has mockup)
- Dropdown select ShipmentVehicle
- have `Scan` link to scan page (1e)
- List packages filtered by selected ShipmentVehicle
(1z) package details.
- realtime update changes to transfer history

Step 1:
Sender login into (1)
visit packages list page (1a)
API: get packages created by sender. Filterable by package id

Click `create package` button:
See (1b)
(khi create ra Package se co status la PENDING)
Redirect back to (1a)

Step 2:
ShipmentCompany login into (1)

visit packages list page (1c)
Click on PENDING Packages tab
API: get packages with status PENDING

Tick checkboxes of packages.
Click `Assign` button to load packages into vehicle
Ticked packages disappear from the list
API: packageTransfer to assign packages (push packages to vehicle, set status to ASSIGN,...)

Step 3:
ShipmentVehicle login into (1)
(physical) Drive to sender location to fetch assigned packages

Visit packages list page (1d)
API: get packages with status ASSIGN and is assigned to the current login ShipmentVehicle

Click `Checkin` button of a given package
Visit the scan package barcode page (1e)
Scan the barcode of package
Scanned package is checked-in for the vehicle
Repeat until done for all packages of the current sender
API: packageTransfer to update status of package to CHECK_IN

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
API: update packages of shipmentVehicle status to CHECK_OUT. missing packages set to INSPECTED_NOT_OK. Also remove packages from ShipmentVehicle, push packages to Warehouse

<!-- For each package:
- case INSPECTED_NOT_OK: flow stop there. Package details show that this package failed to deliver
- case INSPECTED_OK: continue the flow -->
<!--
- checkbox for each package row. button Report
- button Scan for each package row. scan page. ok/not_ok page
- button ok/not_ok for each package row. scan page
- scan page. ok/not_ok page
- scan page. default to ok. Button at packages list page, when clicked, all CHECK_IN packages set to NOT_OK.
- scan page. default to ok. note page, Done button. Button at packages list page, when clicked, all CHECK_IN packages set to NOT_OK.
-->

<!-- Step 4b:
ShipmentVehicle login into (1)
(physical) Inspector finished checking packages. Starting to check out packages

Visit list packages (1d)
Click on INSPECTED_OK tab -->

Step 5a:
(physical) ShipmentCompany see there are packages in a particular warehouse and dispatch another vehicle to pick them up
ShipmentCompany login into (1)

visit packages list page (1c)
Click on CHECK_OUT Packages tab.
Select warehouse from warehouse dropdown
API: get all packages in selected warehouse

Tick checkboxes of packages.
Click `Assign` button to load packages into vehicle
Ticked packages disappear from the list
API: packageTransfer to assign packages (push packages to vehicle, set status to ASSIGN,...)

Step 5b:
(physical) shipmentVehicle visit warehouse to pickup packages
Inspector login into (1) (inspector work for current warehouse)
Visit list packages page (1f)
Select ShipmentVehicle from dropdown. See all packages with status ASSIGN of selected vehicle

Click `scan` link. Visit scan package page.
Scan each package's barcode. Scan's package will have status CHECK_IN
Inspector go back to list packages page.
Click button `report`. Call api:
API: update scanned packages of shipmentVehicle status to CHECK_IN. not scanned packages set status to INSPECTED_NOT_OK. Also push packages to ShipmentVehicle, remove packages from Warehouse

Step 6:
(physical) shipmentVehicle visit receiver to finally deliver the package
(physical) receiver accepts package. sign into receipt
visit ShipmentVehicle's List packages page (1d)
click `Scan deliver` link
Scan package's barcode
Redirect to page to take picture of receipt uploading to ipfs.
-> Submit ShipmentDeliver transaction

API: ShipmentDeliver transaction

<!-- - digital signature: receiver sign into shipper's app
- take picture receipt's signature: upload to ipfs -->