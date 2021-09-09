import AppError from '../../utils/AppError'

import dynamoDbClient from '../../utils/dynamoDb'

export default class DeleteUserService {
  public async execute(userId: string): Promise<void> {
    const params = {
      TableName: process.env.USERS_TABLE,
      Key: {
        id: userId
      }
    }

    const { Item: userExists } = await dynamoDbClient.get(params).promise()

    if (!userExists) throw new AppError('User does not exists.', 404)

    await dynamoDbClient.delete(params).promise()
  }
}
