import { SignUpController } from '@/presentation/controllers/SignUpController'
import { EmailValidatorAdapter } from '@/utils/EmailValidatorAdapter'
import { AddAccountDbUseCase } from '@/data/usecases/addaccount/AddAccountDbUseCase'
import { AccountMongoRepository } from '@/infra/database/mongodb/account-repository/AccountMongoRepository'
import { BcryptAdapter } from '@/infra/criptography/BcryptAdapter'

export const makeSignupController = (): SignUpController => {
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const accountRepository = new AccountMongoRepository()
  const bCryptAdapter = new BcryptAdapter()
  const addAccount = new AddAccountDbUseCase(accountRepository, bCryptAdapter)
  return new SignUpController(emailValidatorAdapter, addAccount)
}
