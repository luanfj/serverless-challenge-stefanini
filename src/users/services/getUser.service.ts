import { IUser } from '../interfaces/user.interface'
import AppError from '../../utils/AppError'
import dynamoDbClient from '../../utils/dynamoDb'

export default class GetUserService {
  public async execute(userId: string): Promise<IUser> {
    const { Item: user } = (await dynamoDbClient
      .get({ TableName: process.env.USERS_TABLE, Key: { id: userId } })
      .promise()) as unknown as { Item?: IUser }

    if (!user) throw new AppError('User not found.', 404)

    return user
  }
}
