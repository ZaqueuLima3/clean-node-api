import { Controller } from '@/presentation/protocols/Controller'
import { Request, Response } from 'express'
import { HttpRequest } from '@/presentation/protocols/http'

export const adaptRoute = (controller: Controller): (req: Request, res: Response) => void => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest<any> = {
      body: req.body
    }
    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
