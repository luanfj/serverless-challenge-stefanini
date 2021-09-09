import CreateUserService from '../services/createUser.service'
import ListUsersService from '../services/listUsers.service'

let createUser: CreateUserService
let listUser: ListUsersService

const USERS_TABLE = process.env.USERS_TABLE

describe('ListUser', () => {
  beforeAll(() => {
    process.env.USERS_TABLE = 'users-table-dev'

    createUser = new CreateUserService()
    listUser = new ListUsersService()
  })

  it('should be able to list users', async () => {
    const params = {
      name: 'Luan test',
      age: 19,
      role: 'Admin test'
    }

    const createdUser1 = await createUser.execute(params)
    const createdUser2 = await createUser.execute({
      ...params,
      name: 'Luan test 2'
    })

    expect(createdUser1).toHaveProperty('id')
    expect(createdUser2).toHaveProperty('id')

    const users = await listUser.execute()

    expect(users.length).toBeGreaterThanOrEqual(2)
  })

  afterAll(() => {
    process.env.USERS_TABLE = USERS_TABLE
  })
})
