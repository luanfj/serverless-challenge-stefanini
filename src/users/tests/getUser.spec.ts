import AppError from '../../utils/AppError'
import CreateUserService from '../services/createUser.service'
import GetUserService from '../services/getUser.service'

let createUser: CreateUserService
let getUser: GetUserService

const USERS_TABLE = process.env.USERS_TABLE

describe('GetUser', () => {
  beforeAll(() => {
    process.env.USERS_TABLE = 'users-table-dev'

    createUser = new CreateUserService()
    getUser = new GetUserService()
  })

  it('should be able to get an existent user', async () => {
    const params = {
      name: 'Luan test',
      age: 19,
      role: 'Admin test'
    }

    const createdUser = await createUser.execute(params)

    expect(createdUser).toHaveProperty('id')

    const user = await getUser.execute(createdUser.id)

    expect(user).toHaveProperty('name')
  })

  it('should not be able to delete an inexistent user', async () => {
    await expect(getUser.execute('Non existent Id')).rejects.toBeInstanceOf(
      AppError
    )
  })

  afterAll(() => {
    process.env.USERS_TABLE = USERS_TABLE
  })
})
