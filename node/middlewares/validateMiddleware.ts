import { json } from 'co-body'
import { UserInputError } from '@vtex/api'

export async function validateMiddleware(
  ctx: Context,
  next: () => Promise<any>
) {
  const body = await json(ctx.req)
  let allErrorsList: ProductMiddlewareResponse[] = []

  try {
    for (const update of body) {
      allErrorsList = fieldValidator(update)
    }
  } catch (error) {
    throw new UserInputError(error)
  }

  if (allErrorsList.length >= 1) {
    ctx.status = 400
    ctx.response.body = {
      message: allErrorsList,
    }

    return
  }

  ctx.state.validatedBody = body

  await next()
}

function fieldValidator(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fields: any[]
): ProductMiddlewareResponse[] {
  // eslint-disable-next-line no-console
  console.log('fields', fields)

  const errorList: ProductMiddlewareResponse[] = []

  for (const field in fields) {
    if (typeof fields[field] !== 'undefined' && typeof fields[field] !== null) {
      if (
        typeof fields[field] !== 'number' &&
        typeof fields[field] !== 'string'
      ) {
        errorList.push({
          success: 'false',
          error: 'Request failed with status code 400',
          errorMessage: `The request is invalid: field ${field}' must be a number or string`,
        })
      } else if (field === 'name' && typeof fields[field] !== 'string') {
        errorList.push({
          success: 'false',
          error: 'Request failed with status code 400',
          errorMessage: `The request is invalid: field ${field}' must be a string`,
        })
      }
    } else {
      errorList.push({
        success: 'false',
        error: 'Request failed with status code 400',
        errorMessage: `The request is invalid: field ${field}' must be a number or string`,
      })
    }
  }

  return errorList
}
/*


  [
    {
      "id": 1,
      "name": "EXM Larston Advanced Extra Comfort Guido Salcedo",
      "categoryId": 3,
      "brandId": 2000001,
      "score": "5"
    },
    {
      "id": 2,
      "name": "EXM Larston Advanced Extra Comfort Guido Salcedo 2",
      "categoryId": false,
      "brandId": 2000001,
      "score": "5"
    }
  ]
*/
/*

const body = {
      "id": 1,
      "name": "EXM Larston Advanced Extra Comfort Guido Salcedo",
      "categoryId": 3,
      "brandId": 2000001,
      "score": "5"
    }

body["score"] = "5"

function encodeProperties(object: any, exceptions: string[]) {
  for (const prop in object) {
    if (exceptions.find(e => e === prop)) {
      continue
    } else if (Array.isArray(object[prop])) {
      if (object[prop].length > 0) {
        object[prop] = object[prop].map((element: string | number) => hash(element))
      }
    } else if (object[prop] === 'document') {
      const documentArray = object[prop].split('')
      const firstDigits = documentArray.length > 7 ? documentArray[0] + documentArray[1] : documentArray[0]
      object[prop] = firstDigits + '-' + hash(object[prop])
    } else {
      if (!object[prop]) {
        continue
      } else {
        object[prop] = hash(object[prop])
      }
    }
  }
}
*/

/*
for (const field of fields) {
  if (typeof field.value !== 'undefined' && typeof field.value !== null) {
    if (field === 'name') {
      if (typeof field.value === 'string') {
        continue
      } else {
        errorList.push({
          success: 'false',
          error: 'Request failed with status code 400',
          errorMessage: `The request is invalid: field ${field.name}' must be a string`,
        })
      }
    }

    if (field === 'id') {
      if (typeof field.value === 'number') {
        continue
      } else {
        errorList.push({
          success: 'false',
          error: 'Request failed with status code 400',
          errorMessage: `The request is invalid: field ${field.name}' must be a number`,
        })
      }
    }

    if (
      typeof field.value !== 'number' &&
      typeof field.value !== 'string'
    ) {
      errorList.push({
        success: 'false',
        error: 'Request failed with status code 400',
        errorMessage: `The request is invalid: field ${field.name}' must be a number or string`,
      })
    }
  }
} */
