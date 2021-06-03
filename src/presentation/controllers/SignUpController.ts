import { badRequest, serverError, success } from '../helpers/httpHelper'
import { Controller } from '../protocols/Controller'
import { httpRequest, HttpResponse } from '../protocols/http'
import { EmailValidator } from '../protocols/EmailValidator'
import { InvalidParamError, MissingParamError } from '../errors'
import { SignUpControllerRequest } from '../protocols/SignUpControllerRequest'
import { AddAccount } from '../../domain/usecases/AddAccount'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount
  ) {
  }

  handle (httpRequest: httpRequest<SignUpControllerRequest>): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { name, email, password, passwordConfirmation } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      const account = this.addAccount.execute({
        name,
        email,
        password
      })
      return success(account)
    } catch (error) {
      return serverError()
    }
  }
}
