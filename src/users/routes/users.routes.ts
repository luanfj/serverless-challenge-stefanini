import { Router } from 'express'

import { UsersController } from '../controller/usersController'

const usersRouter = Router()

const usersController = new UsersController()

usersRouter.post('/', usersController.create)

usersRouter.get('/', usersController.index)

usersRouter.get('/:userId', usersController.show)

usersRouter.put('/:userId', usersController.update)

usersRouter.delete('/:userId', usersController.destroy)

export default usersRouter
