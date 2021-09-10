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
  - id [int32]
  - score [int32]


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
    "successfulResponses": {
        "elements": [
            {
                "id": 1,
                "score": 4,
                "success": "true"
            }
        ],
        "quantity": 1
    },
    "failedResponses": {
        "elements": [],
        "quantity": 0
    },
    "total": 1
}
```

### Error Response body example

```json
{
    "failedResponses": {
        "elements": [
            [
                {
                    "score": "4",
                    "success": "false",
                    "error": 400,
                    "errorMessage": "The request is invalid: The 'id' field is required."
                }
            ]
        ],
        "quantity": 1
    }
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
  - id [int32]
  - score [int32]

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
    "successfulResponses": {
        "elements": [
            {
                "id": 3,
                "score": 6,
                "success": "true"
            }
        ],
        "quantity": 1
    },
    "failedResponses": {
        "elements": [],
        "quantity": 0
    },
    "total": 1
}
```

### Error Response body example

```json
{
    "failedResponses": {
        "elements": [
            [
                {
                    "score": "6",
                    "success": "false",
                    "error": 400,
                    "errorMessage": "The request is invalid: The 'id' field is required."
                }
            ]
        ],
        "quantity": 1
    }
}
```

## Flow

![Massive score update flow](https://user-images.githubusercontent.com/33711188/132861772-a09ddf58-c326-4d43-bd57-0f4c5157e681.png)


## Contributors ✨

Thanks goes to these wonderful people:
