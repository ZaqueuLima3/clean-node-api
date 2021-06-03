import { AccountModel } from '../model/AccountModel'

export interface AddAccountModel {
  name: string
  email: string
  password: string
}

export interface AddAccount {
  execute: (account: AddAccountModel) => AccountModel
}
