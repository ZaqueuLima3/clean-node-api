import bcrypt from 'bcrypt'
import { BcryptAdapter } from '../../../src/infra/criptography/BcryptAdapter'

describe('BcryptAdapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const sut = new BcryptAdapter()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', BcryptAdapter.constants.BCRYPT_SALT)
  })
})
