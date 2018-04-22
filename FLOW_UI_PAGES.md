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
(1d) ShipmentVehicle's List packages. Similar to (1a) but:
- doesn't have `Create package` button. Instead, have `Scan check-in` and `Scan deliver` link to scan page (1e)
- Each package row doesn't have checkbox (first column)
- Display all packages of current ShipmentVehicle
(1e) scan package barcode page
* need mockup?
- `Back` link to go back to list packages page (1d or 1f depend on logged-in user)
(1f) Inspector's list packages page. (has mockup)
- Dropdown select ShipmentVehicle
- have `Scan` link to scan page (1e)
- List packages filtered by selected ShipmentVehicle
(1z) package details.
- realtime update changes to transfer history
- API(11): get package details
- API(12): get package transfer history
