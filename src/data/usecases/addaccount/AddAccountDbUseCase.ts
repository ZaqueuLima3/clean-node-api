import { AddAccount, AddAccountModel } from '../../../domain/usecases/AddAccount'
import { AccountModel } from '../../../domain/model/AccountModel'
import { Crypt } from '../../protocols/Crypt'

export class AddAccountDbUseCase implements AddAccount {
  constructor (
    private readonly crypt: Crypt
  ) {
  }

  async execute (account: AddAccountModel): Promise<AccountModel> {
    await this.crypt.encrypt(account.password)
    return Promise.resolve(null)
  }
}
