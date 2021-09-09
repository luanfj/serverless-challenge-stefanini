/* eslint-disable @typescript-eslint/no-var-requires */
const tsJest = require('ts-jest/jest-preset')
const jestDynamoDb = require('@shelf/jest-dynamodb/jest-preset')

module.exports = {
  ...tsJest,
  ...jestDynamoDb,
  testEnvironment: 'jest-environment-serverless'
}
