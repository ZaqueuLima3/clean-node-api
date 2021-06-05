import { AddAccount, AddAccountModel } from '../../../domain/usecases/AddAccount'
import { AccountModel } from '../../../domain/model/AccountModel'
import { Crypt } from '../../protocols/Crypt'
import { AddAccountRepository } from '../../protocols/AddAccountRepository'

export class AddAccountDbUseCase implements AddAccount {
  constructor (
    private readonly addAccountRepository: AddAccountRepository,
    private readonly crypt: Crypt
  ) {
  }

  async execute (accountData: AddAccountModel): Promise<AccountModel> {
    const encryptedPassword = await this.crypt.encrypt(accountData.password)
    await this.addAccountRepository.add({
      ...accountData,
      password: encryptedPassword
    })
    return Promise.resolve(null)
  }
}
