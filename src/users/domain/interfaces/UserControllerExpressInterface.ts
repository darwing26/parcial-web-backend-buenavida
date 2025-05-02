import { Request, Response } from 'express'

export default interface UserControllerExpressPort {
    createUser(req: Request, res: Response): void
    login(req: Request, res: Response): void
    getUser(req: Request, res: Response): void
    updateUser(req: Request, res: Response): void
}