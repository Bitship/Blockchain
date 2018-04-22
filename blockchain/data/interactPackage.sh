
echo "-------- CREATE THANG CAO PACKAGE ----------"
echo
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ 
    "$class": "org.bitship.Package",
    "sender": "thang1",
    "barcode": "thangpackage123", 
    "weight": 8.5,
    "location": { 
      "$class": "org.bitship.Location",
      "lat": 31321,
      "lon": 312321,
      "id": "string"
    }, \ 
    "status": "PENDING",
    "receiverAddress": "123 Cong Hoa",
    "receiverPhone": "31321313",
    "receiverName": "Tinh Ngo"
  }' 'http://localhost:3000/api/org.bitship.Package'
 
 echo
 echo 