import { AddAccountDbUseCase } from '../../../src/data/usecases/addaccount/AddAccountDbUseCase'
import { Crypt } from '../../../src/data/protocols/Crypt'
import { AddAccountModel } from '../../../src/domain/usecases/AddAccount'
import { AccountModel } from '../../../src/domain/model/AccountModel'
import { AddAccountRepository } from '../../../src/data/protocols/AddAccountRepository'

interface SutTypes {
  sut: AddAccountDbUseCase
  cryptStub: Crypt
  addAccountRepositoryStub: AddAccountRepository
}

const makeCryptStub = (): Crypt => {
  class CryptStub implements Crypt {
    async encrypt (value: string): Promise<string> {
      return Promise.resolve('encrypted_password')
    }
  }
  return new CryptStub()
}

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (accountData: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'encrypted_password'
      }
      return Promise.resolve(fakeAccount)
    }
  }
  return new AddAccountRepositoryStub()
}

const makeSut = (): SutTypes => {
  const cryptStub = makeCryptStub()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const sut = new AddAccountDbUseCase(addAccountRepositoryStub, cryptStub)
  return {
    sut,
    cryptStub,
    addAccountRepositoryStub
  }
}

describe('AddAccountDbUseCase', () => {
  test('Should call Crypt with correct password', async () => {
    const { sut, cryptStub } = makeSut()
    const encryptSpy = jest.spyOn(cryptStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }
    await sut.execute(accountData)
    expect(encryptSpy).toHaveBeenCalledWith(accountData.password)
  })

  test('Should throw if Crypt throws', async () => {
    const { sut, cryptStub } = makeSut()
    jest.spyOn(cryptStub, 'encrypt').mockReturnValueOnce(
      Promise.reject(new Error())
    )
    const accountData = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }
    const promise = sut.execute(accountData)
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }
    await sut.execute(accountData)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'encrypted_password'
    })
  })
})
