import { DynamoDB } from 'aws-sdk'

const isTest = process.env.JEST_WORKER_ID

const config = {
  convertEmptyValues: true,
  ...(isTest && {
    endpoint: 'localhost:8000',
    sslEnabled: false,
    region: 'local-env'
  })
}

const dynamoDbClient = new DynamoDB.DocumentClient(config)

export default dynamoDbClient
