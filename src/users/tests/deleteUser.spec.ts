import AppError from '../../utils/AppError'
import CreateUserService from '../services/createUser.service'
import DeleteUserService from '../services/deleteUser.service'

import dynamoDbClient from '../../utils/dynamoDb'

let createUser: CreateUserService
let deleteUser: DeleteUserService

const USERS_TABLE = process.env.USERS_TABLE

describe('DeleteUser', () => {
  beforeAll(() => {
    process.env.USERS_TABLE = 'users-table-dev'

    createUser = new CreateUserService()
    deleteUser = new DeleteUserService()
  })

  it('should be able to delete an existent user', async () => {
    const deleteUserSpy = jest.spyOn(dynamoDbClient, 'delete')

    const params = {
      name: 'Luan test',
      age: 19,
      role: 'Admin test'
    }

    const createdUser = await createUser.execute(params)

    expect(createdUser).toHaveProperty('id')

    await deleteUser.execute(createdUser.id)

    expect(deleteUserSpy).toHaveBeenCalled()
  })

  it('should not be able to delete an inexistent user', async () => {
    await expect(deleteUser.execute('Non existent Id')).rejects.toBeInstanceOf(
      AppError
    )
  })

  afterAll(() => {
    process.env.USERS_TABLE = USERS_TABLE
  })
})
