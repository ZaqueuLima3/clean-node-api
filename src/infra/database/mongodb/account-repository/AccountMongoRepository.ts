import { AddAccountRepository } from '@/data/protocols/AddAccountRepository'
import { AddAccountModel } from '@/domain/usecases/AddAccount'
import { AccountModel } from '@/domain/model/AccountModel'
import { MongoHelper } from '@/infra/database/mongodb/helpers/MongoHelper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection(
      AccountMongoRepository.constants.ACCOUNT_COLLECTION_NAME
    )
    const result = await accountCollection.insertOne(accountData)
    const { _id, ...accountWithoutId } = result.ops[0]
    return {
      id: _id,
      ...accountWithoutId
    }
  }

  static readonly constants = {
    ACCOUNT_COLLECTION_NAME: 'accounts'
  }
}
