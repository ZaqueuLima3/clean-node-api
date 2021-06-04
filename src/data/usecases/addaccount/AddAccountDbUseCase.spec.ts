import { AddAccountDbUseCase } from './AddAccountDbUseCase'
import { Crypt } from '../../protocols/Crypt'

interface SutTypes {
  sut: AddAccountDbUseCase
  cryptStub: Crypt
}

const makeCryptStub = (): Crypt => {
  class CryptStub implements Crypt {
    async encrypt (value: string): Promise<string> {
      return Promise.resolve('encrypted_password')
    }
  }
  return new CryptStub()
}

const makeSut = (): SutTypes => {
  const cryptStub = makeCryptStub()
  const sut = new AddAccountDbUseCase(cryptStub)
  return {
    sut,
    cryptStub
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
})
