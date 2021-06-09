import { Router } from 'express'
import { makeSignupController } from '@/main/factories/signup'
import { adaptRoute } from '@/main/adapters/expressRouteAdapter'

export default (router: Router): void => {
  const signupController = makeSignupController()

  router.post('/signup', adaptRoute(signupController))
}
