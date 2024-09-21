import * as _ from 'lodash';

export const fieldsValidate = (fields: any, req: any, ignore: any = []) => {
  let errorMsg

  errorMsg = fieldValidator(fields, req, ignore)
  if (errorMsg) return errorMsg

  return errorMsg
}

const fieldValidator = (fields: any, req: any, ignore: any = []) => {
  let msg = null;
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i]
    if (!ignore.includes(field)) {
      if (!_.has(req, field)) {
        msg = `${field} field is required.`
        break
      }
      if (!req[field] || req[field] === "") {
        msg = `${field} field can't be empty.`
        break
      }
    }
  }
  return msg
}