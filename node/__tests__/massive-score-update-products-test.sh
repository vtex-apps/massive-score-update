#!/bin/bash
# Massive score update

echo "Script Name: $0"

initialTime=$(date +%s)

curl --location --request PUT 'https://test03--gsalcedo.myvtex.com/_v/massive/product/score/update' \
    --header 'VtexIdClientAutCookie: ' \
    --header 'Content-Type: application/json' \
    --data-raw '[
    {
        "id": 1,
        "score": 6
    },
    {
        "id": 2,
        "score": 6
    },
    {
        "id": 3,
        "score": 6
    },
    {
        "id": 4,
        "score": 6
    },
    {
        "id": 5,
        "score": 6
    },
    {
        "id": 6,
        "score": 6
    },
    {
        "id": 7,
        "score": 6
    },
    {
        "id": 8,
        "score": 6
    },
    {
        "id": 9,
        "score": 6
    },
    {
        "id": 10,
        "score": 6
    },
       {
        "id": 11,
        "score": 6
    },
    {
        "id": 12,
        "score": 6
    },
    {
        "id": 13,
        "score": 6
    },
    {
        "id": 14,
        "score": 6
    },
    {
        "id": 15,
        "score": 6
    },
    {
        "id": 16,
        "score": 6
    },
    {
        "id": 17,
        "score": 6
    },
    {
        "id": 18,
        "score": 6
    },
    {
        "id": 19,
        "score": 6
    },
    {
        "id": 20,
        "score": 6
    },
      {
        "id": 1,
        "score": 6
    },
    {
        "id": 2,
        "score": 6
    },
    {
        "id": 3,
        "score": 6
    },
    {
        "id": 4,
        "score": 6
    },
    {
        "id": 5,
        "score": 6
    },
    {
        "id": 6,
        "score": 6
    },
    {
        "id": 7,
        "score": 6
    },
    {
        "id": 8,
        "score": 6
    },
    {
        "id": 9,
        "score": 6
    },
    {
        "id": 10,
        "score": 6
    },
       {
        "id": 11,
        "score": 6
    },
    {
        "id": 12,
        "score": 6
    },
    {
        "id": 13,
        "score": 6
    },
    {
        "id": 14,
        "score": 6
    },
    {
        "id": 15,
        "score": 6
    },
    {
        "id": 16,
        "score": 6
    },
    {
        "id": 17,
        "score": 6
    },
    {
        "id": 18,
        "score": 6
    },
    {
        "id": 19,
        "score": 6
    },
    {
        "id": 20,
        "score": 6
    },
      {
        "id": 1,
        "score": 6
    },
    {
        "id": 2,
        "score": 6
    },
    {
        "id": 3,
        "score": 6
    },
    {
        "id": 4,
        "score": 6
    },
    {
        "id": 5,
        "score": 6
    },
    {
        "id": 6,
        "score": 6
    },
    {
        "id": 7,
        "score": 6
    },
    {
        "id": 8,
        "score": 6
    },
    {
        "id": 9,
        "score": 6
    },
    {
        "id": 10,
        "score": 6
    },
       {
        "id": 11,
        "score": 6
    },
    {
        "id": 12,
        "score": 6
    },
    {
        "id": 13,
        "score": 6
    },
    {
        "id": 14,
        "score": 6
    },
    {
        "id": 15,
        "score": 6
    },
    {
        "id": 16,
        "score": 6
    },
    {
        "id": 17,
        "score": 6
    },
    {
        "id": 18,
        "score": 6
    },
    {
        "id": 19,
        "score": 6
    },
    {
        "id": 20,
        "score": 6
    },
      {
        "id": 1,
        "score": 6
    },
    {
        "id": 2,
        "score": 6
    },
    {
        "id": 3,
        "score": 6
    },
    {
        "id": 4,
        "score": 6
    },
    {
        "id": 5,
        "score": 6
    },
    {
        "id": 6,
        "score": 6
    },
    {
        "id": 7,
        "score": 6
    },
    {
        "id": 8,
        "score": 6
    },
    {
        "id": 9,
        "score": 6
    },
    {
        "id": 10,
        "score": 6
    },
       {
        "id": 11,
        "score": 6
    },
    {
        "id": 12,
        "score": 6
    },
    {
        "id": 13,
        "score": 6
    },
    {
        "id": 14,
        "score": 6
    },
    {
        "id": 15,
        "score": 6
    },
    {
        "id": 16,
        "score": 6
    },
    {
        "id": 17,
        "score": 6
    },
    {
        "id": 18,
        "score": 6
    },
    {
        "id": 19,
        "score": 6
    },
    {
        "id": 20,
        "score": 6
    },
      {
        "id": 1,
        "score": 6
    },
    {
        "id": 2,
        "score": 6
    },
    {
        "id": 3,
        "score": 6
    },
    {
        "id": 4,
        "score": 6
    },
    {
        "id": 5,
        "score": 6
    },
    {
        "id": 6,
        "score": 6
    },
    {
        "id": 7,
        "score": 6
    },
    {
        "id": 8,
        "score": 6
    },
    {
        "id": 9,
        "score": 6
    },
    {
        "id": 10,
        "score": 6
    },
       {
        "id": 11,
        "score": 6
    },
    {
        "id": 12,
        "score": 6
    },
    {
        "id": 13,
        "score": 6
    },
    {
        "id": 14,
        "score": 6
    },
    {
        "id": 15,
        "score": 6
    },
    {
        "id": 16,
        "score": 6
    },
    {
        "id": 17,
        "score": 6
    },
    {
        "id": 18,
        "score": 6
    },
    {
        "id": 19,
        "score": 6
    },
    {
        "id": 20,
        "score": 6
    },
        {
        "id": 1,
        "score": 6
    },
    {
        "id": 2,
        "score": 6
    },
    {
        "id": 3,
        "score": 6
    },
    {
        "id": 4,
        "score": 6
    },
    {
        "id": 5,
        "score": 6
    },
    {
        "id": 6,
        "score": 6
    },
    {
        "id": 7,
        "score": 6
    },
    {
        "id": 8,
        "score": 6
    },
    {
        "id": 9,
        "score": 6
    },
    {
        "id": 10,
        "score": 6
    },
       {
        "id": 11,
        "score": 6
    },
    {
        "id": 12,
        "score": 6
    },
    {
        "id": 13,
        "score": 6
    },
    {
        "id": 14,
        "score": 6
    },
    {
        "id": 15,
        "score": 6
    },
    {
        "id": 16,
        "score": 6
    },
    {
        "id": 17,
        "score": 6
    },
    {
        "id": 18,
        "score": 6
    },
    {
        "id": 19,
        "score": 6
    },
    {
        "id": 20,
        "score": 6
    },
      {
        "id": 1,
        "score": 6
    },
    {
        "id": 2,
        "score": 6
    },
    {
        "id": 3,
        "score": 6
    },
    {
        "id": 4,
        "score": 6
    },
    {
        "id": 5,
        "score": 6
    },
    {
        "id": 6,
        "score": 6
    },
    {
        "id": 7,
        "score": 6
    },
    {
        "id": 8,
        "score": 6
    },
    {
        "id": 9,
        "score": 6
    },
    {
        "id": 10,
        "score": 6
    },
       {
        "id": 11,
        "score": 6
    },
    {
        "id": 12,
        "score": 6
    },
    {
        "id": 13,
        "score": 6
    },
    {
        "id": 14,
        "score": 6
    },
    {
        "id": 15,
        "score": 6
    },
    {
        "id": 16,
        "score": 6
    },
    {
        "id": 17,
        "score": 6
    },
    {
        "id": 18,
        "score": 6
    },
    {
        "id": 19,
        "score": 6
    },
    {
        "id": 20,
        "score": 6
    },
      {
        "id": 1,
        "score": 6
    },
    {
        "id": 2,
        "score": 6
    },
    {
        "id": 3,
        "score": 6
    },
    {
        "id": 4,
        "score": 6
    },
    {
        "id": 5,
        "score": 6
    },
    {
        "id": 6,
        "score": 6
    },
    {
        "id": 7,
        "score": 6
    },
    {
        "id": 8,
        "score": 6
    },
    {
        "id": 9,
        "score": 6
    },
    {
        "id": 10,
        "score": 6
    },
       {
        "id": 11,
        "score": 6
    },
    {
        "id": 12,
        "score": 6
    },
    {
        "id": 13,
        "score": 6
    },
    {
        "id": 14,
        "score": 6
    },
    {
        "id": 15,
        "score": 6
    },
    {
        "id": 16,
        "score": 6
    },
    {
        "id": 17,
        "score": 6
    },
    {
        "id": 18,
        "score": 6
    },
    {
        "id": 19,
        "score": 6
    },
    {
        "id": 20,
        "score": 6
    },
      {
        "id": 1,
        "score": 6
    },
    {
        "id": 2,
        "score": 6
    },
    {
        "id": 3,
        "score": 6
    },
    {
        "id": 4,
        "score": 6
    },
    {
        "id": 5,
        "score": 6
    },
    {
        "id": 6,
        "score": 6
    },
    {
        "id": 7,
        "score": 6
    },
    {
        "id": 8,
        "score": 6
    },
    {
        "id": 9,
        "score": 6
    },
    {
        "id": 10,
        "score": 6
    },
       {
        "id": 11,
        "score": 6
    },
    {
        "id": 12,
        "score": 6
    },
    {
        "id": 13,
        "score": 6
    },
    {
        "id": 14,
        "score": 6
    },
    {
        "id": 15,
        "score": 6
    },
    {
        "id": 16,
        "score": 6
    },
    {
        "id": 17,
        "score": 6
    },
    {
        "id": 18,
        "score": 6
    },
    {
        "id": 19,
        "score": 6
    },
    {
        "id": 20,
        "score": 6
    },
      {
        "id": 1,
        "score": 6
    },
    {
        "id": 2,
        "score": 6
    },
    {
        "id": 3,
        "score": 6
    },
    {
        "id": 4,
        "score": 6
    },
    {
        "id": 5,
        "score": 6
    },
    {
        "id": 6,
        "score": 6
    },
    {
        "id": 7,
        "score": 6
    },
    {
        "id": 8,
        "score": 6
    },
    {
        "id": 9,
        "score": 6
    },
    {
        "id": 10,
        "score": 6
    },
       {
        "id": 11,
        "score": 6
    },
    {
        "id": 12,
        "score": 6
    },
    {
        "id": 13,
        "score": 6
    },
    {
        "id": 14,
        "score": 6
    },
    {
        "id": 15,
        "score": 6
    },
    {
        "id": 16,
        "score": 6
    },
    {
        "id": 17,
        "score": 6
    },
    {
        "id": 18,
        "score": 6
    },
    {
        "id": 19,
        "score": 6
    },
    {
        "id": 20,
        "score": 6
    },
        {
        "id": 1,
        "score": 6
    },
    {
        "id": 2,
        "score": 6
    },
    {
        "id": 3,
        "score": 6
    },
    {
        "id": 4,
        "score": 6
    },
    {
        "id": 5,
        "score": 6
    },
    {
        "id": 6,
        "score": 6
    },
    {
        "id": 7,
        "score": 6
    },
    {
        "id": 8,
        "score": 6
    },
    {
        "id": 9,
        "score": 6
    },
    {
        "id": 10,
        "score": 6
    },
       {
        "id": 11,
        "score": 6
    },
    {
        "id": 12,
        "score": 6
    },
    {
        "id": 13,
        "score": 6
    },
    {
        "id": 14,
        "score": 6
    },
    {
        "id": 15,
        "score": 6
    },
    {
        "id": 16,
        "score": 6
    },
    {
        "id": 17,
        "score": 6
    },
    {
        "id": 18,
        "score": 6
    },
    {
        "id": 19,
        "score": 6
    },
    {
        "id": 20,
        "score": 6
    },
      {
        "id": 1,
        "score": 6
    },
    {
        "id": 2,
        "score": 6
    },
    {
        "id": 3,
        "score": 6
    },
    {
        "id": 4,
        "score": 6
    },
    {
        "id": 5,
        "score": 6
    },
    {
        "id": 6,
        "score": 6
    },
    {
        "id": 7,
        "score": 6
    },
    {
        "id": 8,
        "score": 6
    },
    {
        "id": 9,
        "score": 6
    },
    {
        "id": 10,
        "score": 6
    },
       {
        "id": 11,
        "score": 6
    },
    {
        "id": 12,
        "score": 6
    },
    {
        "id": 13,
        "score": 6
    },
    {
        "id": 14,
        "score": 6
    },
    {
        "id": 15,
        "score": 6
    },
    {
        "id": 16,
        "score": 6
    },
    {
        "id": 17,
        "score": 6
    },
    {
        "id": 18,
        "score": 6
    },
    {
        "id": 19,
        "score": 6
    },
    {
        "id": 20,
        "score": 6
    },
      {
        "id": 1,
        "score": 6
    },
    {
        "id": 2,
        "score": 6
    },
    {
        "id": 3,
        "score": 6
    },
    {
        "id": 4,
        "score": 6
    },
    {
        "id": 5,
        "score": 6
    },
    {
        "id": 6,
        "score": 6
    },
    {
        "id": 7,
        "score": 6
    },
    {
        "id": 8,
        "score": 6
    },
    {
        "id": 9,
        "score": 6
    },
    {
        "id": 10,
        "score": 6
    },
       {
        "id": 11,
        "score": 6
    },
    {
        "id": 12,
        "score": 6
    },
    {
        "id": 13,
        "score": 6
    },
    {
        "id": 14,
        "score": 6
    },
    {
        "id": 15,
        "score": 6
    },
    {
        "id": 16,
        "score": 6
    },
    {
        "id": 17,
        "score": 6
    },
    {
        "id": 18,
        "score": 6
    },
    {
        "id": 19,
        "score": 6
    },
    {
        "id": 20,
        "score": 6
    },
      {
        "id": 1,
        "score": 6
    },
    {
        "id": 2,
        "score": 6
    },
    {
        "id": 3,
        "score": 6
    },
    {
        "id": 4,
        "score": 6
    },
    {
        "id": 5,
        "score": 6
    },
    {
        "id": 6,
        "score": 6
    },
    {
        "id": 7,
        "score": 6
    },
    {
        "id": 8,
        "score": 6
    },
    {
        "id": 9,
        "score": 6
    },
    {
        "id": 10,
        "score": 6
    },
       {
        "id": 11,
        "score": 6
    },
    {
        "id": 12,
        "score": 6
    },
    {
        "id": 13,
        "score": 6
    },
    {
        "id": 14,
        "score": 6
    },
    {
        "id": 15,
        "score": 6
    },
    {
        "id": 16,
        "score": 6
    },
    {
        "id": 17,
        "score": 6
    },
    {
        "id": 18,
        "score": 6
    },
    {
        "id": 19,
        "score": 6
    },
    {
        "id": 20,
        "score": 6
    },
      {
        "id": 1,
        "score": 6
    },
    {
        "id": 2,
        "score": 6
    },
    {
        "id": 3,
        "score": 6
    },
    {
        "id": 4,
        "score": 6
    },
    {
        "id": 5,
        "score": 6
    },
    {
        "id": 6,
        "score": 6
    },
    {
        "id": 7,
        "score": 6
    },
    {
        "id": 8,
        "score": 6
    },
    {
        "id": 9,
        "score": 6
    },
    {
        "id": 10,
        "score": 6
    },
       {
        "id": 11,
        "score": 6
    },
    {
        "id": 12,
        "score": 6
    },
    {
        "id": 13,
        "score": 6
    },
    {
        "id": 14,
        "score": 6
    },
    {
        "id": 15,
        "score": 6
    },
    {
        "id": 16,
        "score": 6
    },
    {
        "id": 17,
        "score": 6
    },
    {
        "id": 18,
        "score": 6
    },
    {
        "id": 19,
        "score": 6
    },
    {
        "id": 20,
        "score": 6
    },
        {
        "id": 1,
        "score": 6
    },
    {
        "id": 2,
        "score": 6
    },
    {
        "id": 3,
        "score": 6
    },
    {
        "id": 4,
        "score": 6
    },
    {
        "id": 5,
        "score": 6
    },
    {
        "id": 6,
        "score": 6
    },
    {
        "id": 7,
        "score": 6
    },
    {
        "id": 8,
        "score": 6
    },
    {
        "id": 9,
        "score": 6
    },
    {
        "id": 10,
        "score": 6
    },
       {
        "id": 11,
        "score": 6
    },
    {
        "id": 12,
        "score": 6
    },
    {
        "id": 13,
        "score": 6
    },
    {
        "id": 14,
        "score": 6
    },
    {
        "id": 15,
        "score": 6
    },
    {
        "id": 16,
        "score": 6
    },
    {
        "id": 17,
        "score": 6
    },
    {
        "id": 18,
        "score": 6
    },
    {
        "id": 19,
        "score": 6
    },
    {
        "id": 20,
        "score": 6
    },
      {
        "id": 1,
        "score": 6
    },
    {
        "id": 2,
        "score": 6
    },
    {
        "id": 3,
        "score": 6
    },
    {
        "id": 4,
        "score": 6
    },
    {
        "id": 5,
        "score": 6
    },
    {
        "id": 6,
        "score": 6
    },
    {
        "id": 7,
        "score": 6
    },
    {
        "id": 8,
        "score": 6
    },
    {
        "id": 9,
        "score": 6
    },
    {
        "id": 10,
        "score": 6
    },
       {
        "id": 11,
        "score": 6
    },
    {
        "id": 12,
        "score": 6
    },
    {
        "id": 13,
        "score": 6
    },
    {
        "id": 14,
        "score": 6
    },
    {
        "id": 15,
        "score": 6
    },
    {
        "id": 16,
        "score": 6
    },
    {
        "id": 17,
        "score": 6
    },
    {
        "id": 18,
        "score": 6
    },
    {
        "id": 19,
        "score": 6
    },
    {
        "id": 20,
        "score": 6
    },
      {
        "id": 1,
        "score": 6
    },
    {
        "id": 2,
        "score": 6
    },
    {
        "id": 3,
        "score": 6
    },
    {
        "id": 4,
        "score": 6
    },
    {
        "id": 5,
        "score": 6
    },
    {
        "id": 6,
        "score": 6
    },
    {
        "id": 7,
        "score": 6
    },
    {
        "id": 8,
        "score": 6
    },
    {
        "id": 9,
        "score": 6
    },
    {
        "id": 10,
        "score": 6
    },
       {
        "id": 11,
        "score": 6
    },
    {
        "id": 12,
        "score": 6
    },
    {
        "id": 13,
        "score": 6
    },
    {
        "id": 14,
        "score": 6
    },
    {
        "id": 15,
        "score": 6
    },
    {
        "id": 16,
        "score": 6
    },
    {
        "id": 17,
        "score": 6
    },
    {
        "id": 18,
        "score": 6
    },
    {
        "id": 19,
        "score": 6
    },
    {
        "id": 20,
        "score": 6
    },
      {
        "id": 1,
        "score": 6
    },
    {
        "id": 2,
        "score": 6
    },
    {
        "id": 3,
        "score": 6
    },
    {
        "id": 4,
        "score": 6
    },
    {
        "id": 5,
        "score": 6
    },
    {
        "id": 6,
        "score": 6
    },
    {
        "id": 7,
        "score": 6
    },
    {
        "id": 8,
        "score": 6
    },
    {
        "id": 9,
        "score": 6
    },
    {
        "id": 10,
        "score": 6
    },
       {
        "id": 11,
        "score": 6
    },
    {
        "id": 12,
        "score": 6
    },
    {
        "id": 13,
        "score": 6
    },
    {
        "id": 14,
        "score": 6
    },
    {
        "id": 15,
        "score": 6
    },
    {
        "id": 16,
        "score": 6
    },
    {
        "id": 17,
        "score": 6
    },
    {
        "id": 18,
        "score": 6
    },
    {
        "id": 19,
        "score": 6
    },
    {
        "id": 20,
        "score": 6
    },
      {
        "id": 1,
        "score": 6
    },
    {
        "id": 2,
        "score": 6
    },
    {
        "id": 3,
        "score": 6
    },
    {
        "id": 4,
        "score": 6
    },
    {
        "id": 5,
        "score": 6
    },
    {
        "id": 6,
        "score": 6
    },
    {
        "id": 7,
        "score": 6
    },
    {
        "id": 8,
        "score": 6
    },
    {
        "id": 9,
        "score": 6
    },
    {
        "id": 10,
        "score": 6
    },
       {
        "id": 11,
        "score": 6
    },
    {
        "id": 12,
        "score": 6
    },
    {
        "id": 13,
        "score": 6
    },
    {
        "id": 14,
        "score": 6
    },
    {
        "id": 15,
        "score": 6
    },
    {
        "id": 16,
        "score": 6
    },
    {
        "id": 17,
        "score": 6
    },
    {
        "id": 18,
        "score": 6
    },
    {
        "id": 19,
        "score": 6
    },
    {
        "id": 20,
        "score": 6
    },
        {
        "id": 1,
        "score": 6
    },
    {
        "id": 2,
        "score": 6
    },
    {
        "id": 3,
        "score": 6
    },
    {
        "id": 4,
        "score": 6
    },
    {
        "id": 5,
        "score": 6
    },
    {
        "id": 6,
        "score": 6
    },
    {
        "id": 7,
        "score": 6
    },
    {
        "id": 8,
        "score": 6
    },
    {
        "id": 9,
        "score": 6
    },
    {
        "id": 10,
        "score": 6
    },
       {
        "id": 11,
        "score": 6
    },
    {
        "id": 12,
        "score": 6
    },
    {
        "id": 13,
        "score": 6
    },
    {
        "id": 14,
        "score": 6
    },
    {
        "id": 15,
        "score": 6
    },
    {
        "id": 16,
        "score": 6
    },
    {
        "id": 17,
        "score": 6
    },
    {
        "id": 18,
        "score": 6
    },
    {
        "id": 19,
        "score": 6
    },
    {
        "id": 20,
        "score": 6
    },
      {
        "id": 1,
        "score": 6
    },
    {
        "id": 2,
        "score": 6
    },
    {
        "id": 3,
        "score": 6
    },
    {
        "id": 4,
        "score": 6
    },
    {
        "id": 5,
        "score": 6
    },
    {
        "id": 6,
        "score": 6
    },
    {
        "id": 7,
        "score": 6
    },
    {
        "id": 8,
        "score": 6
    },
    {
        "id": 9,
        "score": 6
    },
    {
        "id": 10,
        "score": 6
    },
       {
        "id": 11,
        "score": 6
    },
    {
        "id": 12,
        "score": 6
    },
    {
        "id": 13,
        "score": 6
    },
    {
        "id": 14,
        "score": 6
    },
    {
        "id": 15,
        "score": 6
    },
    {
        "id": 16,
        "score": 6
    },
    {
        "id": 17,
        "score": 6
    },
    {
        "id": 18,
        "score": 6
    },
    {
        "id": 19,
        "score": 6
    },
    {
        "id": 20,
        "score": 6
    },
      {
        "id": 1,
        "score": 6
    },
    {
        "id": 2,
        "score": 6
    },
    {
        "id": 3,
        "score": 6
    },
    {
        "id": 4,
        "score": 6
    },
    {
        "id": 5,
        "score": 6
    },
    {
        "id": 6,
        "score": 6
    },
    {
        "id": 7,
        "score": 6
    },
    {
        "id": 8,
        "score": 6
    },
    {
        "id": 9,
        "score": 6
    },
    {
        "id": 10,
        "score": 6
    },
       {
        "id": 11,
        "score": 6
    },
    {
        "id": 12,
        "score": 6
    },
    {
        "id": 13,
        "score": 6
    },
    {
        "id": 14,
        "score": 6
    },
    {
        "id": 15,
        "score": 6
    },
    {
        "id": 16,
        "score": 6
    },
    {
        "id": 17,
        "score": 6
    },
    {
        "id": 18,
        "score": 6
    },
    {
        "id": 19,
        "score": 6
    },
    {
        "id": 20,
        "score": 6
    },
      {
        "id": 1,
        "score": 6
    },
    {
        "id": 2,
        "score": 6
    },
    {
        "id": 3,
        "score": 6
    },
    {
        "id": 4,
        "score": 6
    },
    {
        "id": 5,
        "score": 6
    },
    {
        "id": 6,
        "score": 6
    },
    {
        "id": 7,
        "score": 6
    },
    {
        "id": 8,
        "score": 6
    },
    {
        "id": 9,
        "score": 6
    },
    {
        "id": 10,
        "score": 6
    },
       {
        "id": 11,
        "score": 6
    },
    {
        "id": 12,
        "score": 6
    },
    {
        "id": 13,
        "score": 6
    },
    {
        "id": 14,
        "score": 6
    },
    {
        "id": 15,
        "score": 6
    },
    {
        "id": 16,
        "score": 6
    },
    {
        "id": 17,
        "score": 6
    },
    {
        "id": 18,
        "score": 6
    },
    {
        "id": 19,
        "score": 6
    },
    {
        "id": 20,
        "score": 6
    },
      {
        "id": 1,
        "score": 6
    },
    {
        "id": 2,
        "score": 6
    },
    {
        "id": 3,
        "score": 6
    },
    {
        "id": 4,
        "score": 6
    },
    {
        "id": 5,
        "score": 6
    },
    {
        "id": 6,
        "score": 6
    },
    {
        "id": 7,
        "score": 6
    },
    {
        "id": 8,
        "score": 6
    },
    {
        "id": 9,
        "score": 6
    },
    {
        "id": 10,
        "score": 6
    },
       {
        "id": 11,
        "score": 6
    },
    {
        "id": 12,
        "score": 6
    },
    {
        "id": 13,
        "score": 6
    },
    {
        "id": 14,
        "score": 6
    },
    {
        "id": 15,
        "score": 6
    },
    {
        "id": 16,
        "score": 6
    },
    {
        "id": 17,
        "score": 6
    },
    {
        "id": 18,
        "score": 6
    },
    {
        "id": 19,
        "score": 6
    },
    {
        "id": 20,
        "score": 6
    }]'

finalTime=$(date +%s)
TestTime=$(($finalTime - $initialTime))

echo
echo "Executed in $TestTime seconds"
