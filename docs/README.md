# MASSIVE SCORE UPDATE

This application that exposes two endpoints of massive update of product scores and catalogs.

---

```shell
PUT https://{{workspace}}--{{accountName}}.myvtex.com/_v/massive/product/score/update
```

## Curl

```shell
curl --location --request PUT 'https://{{workspace}}--{{accountName}}.myvtex.com/_v/massive/product/score/update' \
--header 'VtexIdClientAutCookie: "" \
--header 'Content-Type: application/json' \
--data-raw '[
    {
        "id": 1,
        "score": 1
    }

]'
```

## Specification

### Headers

- Required
  - Accept : application/json
  - Content-Type : application/json; charset=utf-8
  - VtexIdclientAutCookie : `eyJhbGciOi...`

### Path params

- Required
  - id [int32]
  - score [int32]

> Read the API information for more information [link](https://developers.vtex.com/vtex-rest-api/reference/catalog-api-product#catalog-api-put-product)

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

```shell
PUT https://{{workspace}}--{{accountName}}.myvtex.com/_v/massive/catalog/score/update
```

## Curl

```shell
curl --location --request PUT 'https://{{workspace}}--{{accountName}}.myvtex.com/_v/massive/catalog/score/update' \
--header 'VtexIdClientAutCookie: "" \
--header 'Content-Type: application/json' \
--data-raw '[
    {
        "id": 1,
        "score": 1
    }

]'
```

## Specification

### Headers

- Required
  - Accept : application/json
  - Content-Type : application/json; charset=utf-8
  - VtexIdclientAutCookie : `eyJhbGciOi...`

### Path params

- Required
  - id [int32]
  - score [int32]

> Read the API information for more information [link](https://developers.vtex.com/vtex-rest-api/reference/catalog-api-category#catalog-api-put-category)

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

---

## Credentials

### Create appKey y appToken

To generate app keys in your account, you should follow the instructions seen in the [Application Keys](https://help.vtex.com/en/tutorial/application-keys--2iffYzlvvz4BDMr6WGUtet) article in our Help Center.

### Create role

[Create a role](https://help.vtex.com/en/tutorial/perfiles-de-acceso--7HKK5Uau2H6wxE1rH5oRbc) with the following resources and add your user to that role

- Catalog / Content / Product management
- Catalog / Content / Product and SKU Management

### Convert to JWT

Make a call with the credentials created. The result, if the credentials are valid, will return a token that will be used as the value in the header 'VtexIdclientAutCookie' requested by the component.

```shell
curl --location --request POST 'http://vtexid.vtexcommercestable.com.br/api/vtexid/apptoken/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "appkey": "...",
    "apptoken": "..."
}'
```

---

## Flow

![Massive score update flow](https://user-images.githubusercontent.com/33711188/132861772-a09ddf58-c326-4d43-bd57-0f4c5157e681.png)

---

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/GuidoSdo"><img src="https://avatars.githubusercontent.com/u/33711188?v=4" width="100px;" alt=""/><br /><sub><b>Guido Salcedo</b></sub></a><br /><a href="https://github.com/vtex-apps/massive-stock-update" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
