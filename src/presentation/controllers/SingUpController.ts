import { MissingParamError } from '../errors/MissingParamError'
import { badRequest } from '../helpers/httpHelper'
import { HttpResponse, httpRequest } from '../protocols/http'

export class SingUpController {
  handle (httpRequest: httpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
