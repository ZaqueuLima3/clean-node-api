import { AddAccountDbUseCase } from './AddAccountDbUseCase'
import { Crypt } from '../../protocols/Crypt'

class CryptStub implements Crypt {
  async encrypt (value: string): Promise<string> {
    return Promise.resolve('encrypted_password')
  }
}

describe('AddAccountDbUseCase', () => {
  test('Should call Crypt with correct password', async () => {
    const cryptStub = new CryptStub()
    const sut = new AddAccountDbUseCase(cryptStub)
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
