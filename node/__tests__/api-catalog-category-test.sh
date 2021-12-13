#!/bin/bash

echo "Script Name: $0"

initialTime=$(date +%s)

counter=100

for ((i = 1; i <= $counter; i++)); do

    curl --location --request GET 'https://gsalcedo.vtexcommercestable.com.br/api/catalog/pvt/category/2' \
        --header 'Accept: application/json' \
        --header 'Content-Type: application/json' \
        --header 'VtexIdclientAutCookie: '

    curl --location --request PUT 'https://gsalcedo.vtexcommercestable.com.br/api/catalog/pvt/category/2' \
        --header 'Accept: application/json' \
        --header 'Content-Type: application/json' \
        --header 'VtexIdclientAutCookie: ' \
        --data-raw '{
    "Id": 2,
    "Name": "EXM Moda Guido Salcedo",
    "FatherCategoryId": 1,
    "Title": "test",
    "Description": "test",
    "Keywords": "test",
    "IsActive": true,
    "LomadeeCampaignCode": null,
    "AdWordsRemarketingCode": null,
    "ShowInStoreFront": false,
    "ShowBrandFilter": false,
    "ActiveStoreFrontLink": false,
    "GlobalCategoryId": 1,
    "StockKeepingUnitSelectionMode": "RADIO",
    "Score": 4,
    "LinkId": "EXM-Moda-Guido-Salcedo",
    "HasChildren": true
}'

done

finalTime=$(date +%s)
TestTime=$(($finalTime - $initialTime))

echo
# echo "Executed in $TestTime seconds"
