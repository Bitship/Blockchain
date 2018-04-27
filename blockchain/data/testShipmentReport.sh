echo "------------------- Create package 1 -----------------------------"
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
   "$class": "org.bitship.Package",
   "sender": "alice",
   "barcode": "package1",
   "weight": 10,
   "location": {
     "$class": "org.bitship.Location",
     "lat": 10.1,
     "lon": 20.2,
     "id": "package1"
   },
   "status": "PENDING",
   "receiverAddress": "receive_add",
   "receiverPhone": "receive_phone",
   "receiverName": "receive_name"
 }' 'http://localhost:3000/api/org.bitship.Package' | jq

echo
echo "------------------- Create package 2 -----------------------------"
echo
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
   "$class": "org.bitship.Package",
   "sender": "alice",
   "barcode": "package2",
   "weight": 11,
   "location": {
     "$class": "org.bitship.Location",
     "lat": 12.1,
     "lon": 22.2
   },
   "status": "PENDING",
   "receiverAddress": "receive_add",
   "receiverPhone": "receive_phone",
   "receiverName": "receive_name"
 }
 ' 'http://localhost:3000/api/org.bitship.Package' | jq

echo
echo "------------------- Create package 3 -----------------------------"
echo
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
   "$class": "org.bitship.Package",
   "sender": "alice",
   "barcode": "package3",
   "weight": 13,
   "location": {
     "$class": "org.bitship.Location",
     "lat": 13.1,
     "lon": 23.2
   },
   "status": "PENDING",
   "receiverAddress": "receive_add",
   "receiverPhone": "receive_phone",
   "receiverName": "receive_name"
 }
 ' 'http://localhost:3000/api/org.bitship.Package' | jq

echo
echo "------------------- Assign package to ShipmentVehicle ------------"
echo
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
   "$class": "org.bitship.ShipmentTransfer",
   "vehicle": "toyotaTruck",
   "packages": [
     "package1",
     "package2",
     "package3"
   ],
   "status": "ASSIGN"
 }' 'http://localhost:3000/api/org.bitship.ShipmentTransfer' | jq

echo
echo "------------------- ShipmentVehicle pick up packages -------------"
echo
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
   "$class": "org.bitship.ShipmentTransfer",
   "vehicle": "toyotaTruck",
   "packages": [
     "package1",
     "package2",
     "package3"
   ],
   "status": "IN_VEHICLE"
 }' 'http://localhost:3000/api/org.bitship.ShipmentTransfer' | jq

echo
echo "---------- vehicle goes to warehouse and checked by inspector ----"
echo
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
   "$class": "org.bitship.ShipmentVehicleReport",
   "inspector": "duyinspector1",
   "vehicle": "toyotaTruck",
   "packages": [
     "package1",
     "package2"
   ],
   "note": "string"
 }' 'http://localhost:3000/api/org.bitship.ShipmentVehicleReport' | jq

echo
echo "-------- Package1, package2 should be in warehouse, package3 should be LOST"
echo
curl -X GET --header 'Accept: application/json' 'http://localhost:3000/api/org.bitship.Package' | jq
