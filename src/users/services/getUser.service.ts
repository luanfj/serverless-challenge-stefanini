import AppError from '../../utils/AppError'
import dynamoDbClient from '../../utils/dynamoDb'

export default class GetUserService {
  public async execute(userId: string) {
    const { Item } = await dynamoDbClient
      .get({ TableName: process.env.USERS_TABLE, Key: { id: userId } })
      .promise()

    if (!Item) throw new AppError('User not found.', 404)

    return Item
  }
}
