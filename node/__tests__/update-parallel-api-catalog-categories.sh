#!/bin/bash

echo "Script Name: $0"

initialTime=$(date +%s)

/bin/bash api-catalog-category-test.sh &
/bin/bash api-catalog-category-test.sh &
/bin/bash api-catalog-category-test.sh &
/bin/bash api-catalog-category-test.sh &
/bin/bash api-catalog-category-test.sh &
wait

finalTime=$(date +%s)
TestTime=$(($finalTime - $initialTime))

echo 'All 5 complete'
echo "Executed in $TestTime seconds"
