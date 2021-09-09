import dynamoDbClient from '../../utils/dynamoDb'
import { IUser } from '../interfaces/user.interface'

export default class ListUsersService {
  public async execute(): Promise<IUser[]> {
    const { Items } = (await dynamoDbClient
      .scan({ TableName: process.env.USERS_TABLE })
      .promise()) as unknown as { Items: IUser[] }

    return Items
  }
}
