echo "---- Create warehouse ----- "

echo "Create first warehouse"
echo 
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
        "$class": "org.bitship.Warehouse",
        "warehouseId": "warhouse1",
        "location": {
            "$class": "org.bitship.Location",
            "lat": 10.8020702,
            "lon": 106.6907701,
            "id": "warhouseLocation"
        }
    }' 'http://localhost:3000/api/org.bitship.Warehouse' 

echo
echo "------Create ShipmentCompany -------"
echo
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
        "$class": "org.bitship.ShipmentCompany",
        "shipmentCompanyId": "no1Delivery",
        "name": "No 1 Delivery"
    }' 'http://localhost:3000/api/org.bitship.ShipmentCompany'

echo
echo

echo "------Create Shipper Vehicle toyotaTruck -------"
echo
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
        "$class": "org.bitship.ShipmentVehicle",
        "shipmentVehicleId": "toyotaTruck",
        "shipmentCompany": "no1Delivery",
        "location": {
            "$class": "org.bitship.Location",
            "lat": 10.802962,
            "lon": 106.663421,
            "id": "shipmentVehicleLocation"
        }
    }' 'http://localhost:3000/api/org.bitship.ShipmentVehicle'

echo
echo

echo "------Create Shipper Vehicle yamahaTruck -------"
echo
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
        "$class": "org.bitship.ShipmentVehicle",
        "shipmentVehicleId": "yamahaTruck",
        "shipmentCompany": "no1Delivery",
        "location": {
            "$class": "org.bitship.Location",
            "lat": 11.802962,
            "lon": 107.663421,
            "id": "shipmentVehicleLocation"
        }
    }' 'http://localhost:3000/api/org.bitship.ShipmentVehicle'

echo
echo

echo "--------- Start to create new customer-------"
echo "POST create Tam Tran customer."
echo
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
   "$class": "org.bitship.Customer", 
   "customerId": "tam1",
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
    "customerId": "tinh1",
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
    "customerId": "thang1",
    "firstName": "Thang",
    "lastName": "Cao",
    "phone": "0933840682",
    "address": "77 Tran Ke Xuong"
  }' 'http://localhost:3000/api/org.bitship.Customer'

echo
echo

echo "------- Create Inspector -------"
echo "Create Duy Inspector"
echo
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
       "$class": "org.bitship.Inspector",
        "warehouse": "warhouse1",
        "inspectorId": "duyinspector1",
        "name": "Duy Tran"
    }' 'http://localhost:3000/api/org.bitship.Inspector'
echo 
echo













 