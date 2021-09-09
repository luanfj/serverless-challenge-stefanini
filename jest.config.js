/* eslint-disable @typescript-eslint/no-var-requires */
const { defaults: tsjPreset } = require('ts-jest')

module.exports = {
  clearMocks: true,

  collectCoverageFrom: ['<rootDir>/src/**/services/*.ts'],

  coverageDirectory: 'coverage',

  coverageProvider: 'v8',

  coverageReporters: ['text-summary', 'lcov'],

  preset: './jest-preset',

  testEnvironment: 'node'
}
