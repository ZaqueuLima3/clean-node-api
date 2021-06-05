import bcrypt from 'bcrypt'
import { Crypt } from '../../data/protocols/Crypt'

export class BcryptAdapter implements Crypt {
  async encrypt (value: string): Promise<string> {
    await bcrypt.hash(value, BcryptAdapter.constants.BCRYPT_SALT)
    return Promise.resolve('')
  }

  static readonly constants = {
    BCRYPT_SALT: 12
  }
}
