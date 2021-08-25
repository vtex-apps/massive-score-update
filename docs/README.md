# MASSIVE SCORE UPDATE
Massive product and catalog score update service

##### `PUT `

```https://{environment}--{accountName}.myvtex.com/_v/massive/product/score/update```

### Headers
- Required
  - Accept : application/json
  - Content-Type : application/json; charset=utf-8

### Path params

- Required
  - id [int32] | [string]
  - score [int32] | [string]


>   Read the API information for more information [link](https://developers.vtex.com/vtex-rest-api/reference/catalog-api-product#catalog-api-put-product)

### Request body example
```json
[
    {
        "id": "1",
        "score": "4"
    }
]   
```
      
### Success Response body example

```json
{
    "responseList": [
        {
            "id": 1,
            "score": 4,
            "success": "true"
        }
    ]
}
```

### Error Response body example

```json
{
    "errorList": [
        [
            {
                "success": "false",
                "error": "Request failed with status code 400",
                "errorMessage": "The request is invalid: The 'brandId' field is required."
            }
        ]
    ]
}
```
---

##### `PUT `
 
 ```https://{environment}--{accountName}.myvtex.com/_v/massive/catalog/score/update```
### Headers
- Required
  - Accept : application/json
  - Content-Type : application/json; charset=utf-8

### Path params

- Required
  - id [int32] | [string]
  - score [int32] | [string]

>   Read the API information for more information [link](https://developers.vtex.com/vtex-rest-api/reference/catalog-api-category#catalog-api-put-category)


 
### Request body example
```json
[
    {
        "id": "3",
        "score": "4"
    }
]
```
      
### Success Response body example

```json
{
    "responseList": [
        {
            "id": 3,
            "score": 4,
            "success": "true"
        }
    ]
}
```

### Error Response body example

```json
{
    "errorList": [
        [
            {
                "success": "false",
                "error": "Request failed with status code 400",
                "errorMessage": "The request is invalid: The 'score' field is required."
            }
        ]
    ]
}
```

## Flow

![Massive score update flow](https://user-images.githubusercontent.com/33711188/129928859-5c4a0fe3-a295-4130-8698-43986b8b0e0d.png)

## Contributors ✨

Thanks goes to these wonderful people:
