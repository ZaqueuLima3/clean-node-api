import { badRequest, serverError, success } from '@/presentation/helpers/httpHelper'
import { Controller } from '@/presentation/protocols/Controller'
import { httpRequest, HttpResponse } from '@/presentation/protocols/http'
import { EmailValidator } from '@/presentation/protocols/EmailValidator'
import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { SignUpControllerRequest } from '@/presentation/protocols/SignUpControllerRequest'
import { AddAccount } from '@/domain/usecases/AddAccount'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount
  ) {
  }

  async handle (httpRequest: httpRequest<SignUpControllerRequest>): Promise<HttpResponse> {
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
      const account = await this.addAccount.execute({
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
