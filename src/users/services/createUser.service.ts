import { v4 as uuid } from 'uuid'

import { ICreateUserDTO } from '../dtos/createUser.dto'

import dynamoDbClient from '../../utils/dynamoDb'
import { IUser } from '../interfaces/user.interface'

export default class CreateUserService {
  public async execute(userData: ICreateUserDTO): Promise<IUser> {
    const userParams = {
      id: uuid(),
      ...userData
    }

    const params = {
      TableName: process.env.USERS_TABLE,
      Item: {
        ...userParams
      }
    }

    await dynamoDbClient.put(params).promise()

    return userParams
  }
}
