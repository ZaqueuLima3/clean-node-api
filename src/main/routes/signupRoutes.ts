import { Request, Response, Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', (req: Request, res: Response) => {
    return res.json({ ok: 'ok' })
  })
}
