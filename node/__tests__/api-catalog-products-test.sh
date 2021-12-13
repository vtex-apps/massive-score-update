#!/bin/bash

echo "Script Name: $0"

initialTime=$(date +%s)

counter=100

for ((i = 1; i <= $counter; i++)); do
    response=$(
        curl --location --request GET 'https://vtexarg.vtexcommercestable.com.br/api/catalog/pvt/product/2' \
            --header 'Accept: application/json' \
            --header 'Content-Type: application/json' \
            --header 'VtexIdclientAutCookie: '
    ) \
        echo 'Response: ' $response

    curl --location --request PUT 'https://vtexarg.vtexcommercestable.com.br/api/catalog/pvt/product/2' \
        --header 'Accept: application/json' \
        --header 'Content-Type: application/json' \
        --header 'VtexIdclientAutCookie: ' \
        --data-raw '{
    "Id": 2,
    "Name": "EXM Larston Advanced Extra Comfort Guido Salcedo",
    "DepartmentId": 1,
    "CategoryId": 4,
    "BrandId": 2000001,
    "LinkId": "AdvancedExtraComfort",
    "RefId": "",
    "IsVisible": true,
    "Description": "EXM Larston Advanced Extra Comfort Guido Salcedo",
    "DescriptionShort": "",
    "ReleaseDate": "2021-07-26T00:00:00",
    "KeyWords": "",
    "Title": "EXM Larston Advanced Extra Comfort Guido Salcedo",
    "IsActive": true,
    "TaxCode": "",
    "MetaTagDescription": "EXM Larston Advanced Extra Comfort Guido Salcedo",
    "SupplierId": null,
    "ShowWithoutStock": false,
    "AdWordsRemarketingCode": null,
    "LomadeeCampaignCode": null,
    "Score": 10
}'

done
finalTime=$(date +%s)
TestTime=$(($finalTime - $initialTime))

echo
# echo "Executed in $TestTime seconds"
