import { AddAccountModel } from '../../domain/usecases/AddAccount'
import { AccountModel } from '../../domain/model/AccountModel'

export interface AddAccountRepository {
  add: (accountData: AddAccountModel) => Promise<AccountModel>
}
