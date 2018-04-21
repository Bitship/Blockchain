
echo "--------- Start to create new customer"

echo "POST create Tam Tran customer."
echo
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
   "$class": "org.bitship.Customer", 
   "customerId": "tam4",
   "firstName": "Tam",
   "lastName": "Tran", 
   "phone": "31321311",
   "address": "88 Xo Viet Nghe Tinh"
 }' 'http://localhost:3000/api/org.bitship.Customer'

echo 
echo

echo "POST create Tinh Ngo customer."
echo
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
    "$class": "org.bitship.Customer",
    "customerId": "tinh3",
    "firstName": "Tinh",
    "lastName": "Ngo",
    "phone": "093131213123",
    "address": "123 Cong Hoa"
  }' 'http://localhost:3000/api/org.bitship.Customer'

echo 
echo

echo "POST create Thang Cao customer."
echo
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
    "$class": "org.bitship.Customer",
    "customerId": "thang3",
    "firstName": "Thang",
    "lastName": "Cao",
    "phone": "0933840682",
    "address": "77 Tran Ke Xuong"
  }' 'http://localhost:3000/api/org.bitship.Customer'


echo "--------- Create Shipper ----------"

echo "Create Shipper Cuong Le"
echo
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
        "$class": "org.bitship.Shipper",
        "shipperId": "cuongshipper1",
        "firstName": "Cuong",
        "lastName": "Le"
    }' 'http://localhost:3000/api/org.bitship.Shipper'

echo "Create Phat Sipper"

echo
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
        "$class": "org.bitship.Shipper",
        "shipperId": "phatshipper1",
        "firstName": "Phat",
        "lastName": "Nguyen"
    }' 'http://localhost:3000/api/org.bitship.Shipper'

echo
echo "------- Create Inspector -------"
echo "Create Duy Inspector"
echo
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
       "$class": "org.bitship.Inspector",
        "inspectorId": "duyinspector1",
        "name": "Duy Tran"
    }' 'http://localhost:3000/api/org.bitship.Inspector'
echo 
echo


echo "------Create Shipper Vehicle -------"
echo "Create First Shipment Vehicle"
echo
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
        "$class": "org.bitship.ShipmentVehicle",
        "shipmentVehicleId": "vehiclecompany1",
        "packages": [],
        "location": {
            "$class": "org.bitship.Location",
            "lat": 3123213,
            "lon": 3213131,
            "id": "newlocation"
        },
        "driver": "cuongshipper1"
    }' 'http://localhost:3000/api/org.bitship.ShipmentVehicle'


echo "---- Create warhouse ----- "

echo "Create first warhouse"
echo 
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
        "$class": "org.bitship.Warehouse",
        "warehouseId": "warhouse1",
        "packages": [],
        "location": {
            "$class": "org.bitship.Location",
            "lat": 0,
            "lon": 0,
            "id": "newlocation"
        }
    }' 'http://localhost:3000/api/org.bitship.Warehouse' 







 