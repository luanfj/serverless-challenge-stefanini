import AppError from '../../utils/AppError'

import { IUpdateUserDTO } from '../dtos/updateUser.dto'

import dynamoDbClient from '../../utils/dynamoDb'
import { IUser } from '../interfaces/user.interface'

export default class UpdateUserService {
  public async execute(userData: IUpdateUserDTO): Promise<IUser> {
    const { Item: userExists } = await dynamoDbClient
      .get({
        TableName: process.env.USERS_TABLE,
        Key: {
          id: userData.userId
        }
      })
      .promise()

    if (!userExists) throw new AppError('User does not exists.')

    const data = await dynamoDbClient
      .update({
        TableName: process.env.USERS_TABLE,
        Key: {
          id: userData.userId
        },
        UpdateExpression: 'set #name = :name, age = :age, #role = :role',
        ExpressionAttributeValues: {
          ':name': userData.name,
          ':age': userData.age,
          ':role': userData.role
        },
        ExpressionAttributeNames: {
          '#name': 'name',
          '#role': 'role'
        },
        ReturnValues: 'UPDATED_NEW'
      })
      .promise()

    return data.Attributes as IUser
  }
}
