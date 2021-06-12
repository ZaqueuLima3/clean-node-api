import { AddAccountRepository } from '@/data/protocols/AddAccountRepository'
import { AddAccountModel } from '@/domain/usecases/AddAccount'
import { AccountModel } from '@/domain/model/AccountModel'
import { MongoHelper } from '@/infra/database/mongodb/helpers/MongoHelper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection(
      AccountMongoRepository.constants.ACCOUNT_COLLECTION_NAME
    )
    const result = await accountCollection.insertOne(accountData)
    return MongoHelper.mapToModel<AccountModel>(result.ops[0])
  }

  static readonly constants = {
    ACCOUNT_COLLECTION_NAME: 'accounts'
  }
}
