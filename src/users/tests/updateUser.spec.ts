import CreateUserService from '../services/createUser.service'
import UpdateUserService from '../services/updateUser.service'

let createUser: CreateUserService
let updateUser: UpdateUserService

const USERS_TABLE = process.env.USERS_TABLE

describe('UpdateUser', () => {
  beforeAll(() => {
    process.env.USERS_TABLE = 'users-table-dev'

    createUser = new CreateUserService()
    updateUser = new UpdateUserService()
  })

  it('should be able to update an existent user', async () => {
    const params = {
      name: 'Luan test',
      age: 19,
      role: 'Admin test'
    }

    const createdUser = await createUser.execute(params)

    expect(createdUser).toHaveProperty('id')

    const updatedUser = await updateUser.execute({
      userId: createdUser.id,
      ...params,
      name: 'Luan test updated'
    })

    expect(updatedUser.name).toEqual('Luan test updated')
  })

  afterAll(() => {
    process.env.USERS_TABLE = USERS_TABLE
  })
})
