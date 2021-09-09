import CreateUserService from '../services/createUser.service'

let createUser: CreateUserService

const USERS_TABLE = process.env.USERS_TABLE

describe('CreateUser', () => {
  beforeAll(() => {
    process.env.USERS_TABLE = 'users-table-dev'

    createUser = new CreateUserService()
  })

  it('should be able to create a new user', async () => {
    const params = {
      name: 'Luan test',
      age: 19,
      role: 'Admin test'
    }

    const createdUser = await createUser.execute(params)

    expect(createdUser).toHaveProperty('id')
  })

  afterAll(() => {
    process.env.USERS_TABLE = USERS_TABLE
  })
})
