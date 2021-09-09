import dynamoDbClient from '../../utils/dynamoDb'

export default class ListUsersService {
  public async execute() {
    const { Items } = await dynamoDbClient
      .scan({ TableName: process.env.USERS_TABLE })
      .promise()

    return Items
  }
}
