import request from 'supertest'
import app from '@/main/config/app'
import { MongoHelper } from '@/infra/database/mongodb/helpers/MongoHelper'
import { AccountMongoRepository } from '@/infra/database/mongodb/account-repository/AccountMongoRepository'

describe('Signup Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection(
      AccountMongoRepository.constants.ACCOUNT_COLLECTION_NAME
    )
    await accountCollection.deleteMany({})
  })

  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Zaqueu',
        email: 'zaqueulima1@gmail.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
