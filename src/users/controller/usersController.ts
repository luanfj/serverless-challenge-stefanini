import { Response, Request } from 'express'
import AppError from '../../utils/AppError'
import * as yup from 'yup'

import CreateUserService from '../services/createUser.service'
import DeleteUserService from '../services/deleteUser.service'
import GetUserService from '../services/getUser.service'
import ListUsersService from '../services/listUsers.service'
import UpdateUserService from '../services/updateUser.service'

const schema = yup.object().shape({
  name: yup.string().required(),
  age: yup.number().required().positive().integer(),
  role: yup.string().required()
})

export class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const getUsers = new ListUsersService()

    const users = await getUsers.execute()

    return response.json({ users })
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params

    const getUser = new GetUserService()

    const user = await getUser.execute(userId)

    return response.json({ user })
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, age, role } = request.body

    if (!(await schema.isValid(request.body)))
      throw new AppError('Invalid form body.')

    const createUser = new CreateUserService()

    const user = await createUser.execute({ name, age, role })

    return response.json({ user })
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params

    const { name, age, role } = request.body

    if (!(await schema.isValid(request.body)))
      throw new AppError('Invalid form body.')

    const updateUser = new UpdateUserService()

    const updatedUser = await updateUser.execute({
      userId,
      name,
      age,
      role
    })

    return response.json({ user: updatedUser })
  }

  public async destroy(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { userId } = request.params

    const deleteUser = new DeleteUserService()

    await deleteUser.execute(userId)

    return response.json({ success: true })
  }
}
