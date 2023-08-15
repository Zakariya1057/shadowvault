import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  roots: ['<rootDir>/tests'],
  verbose: true,
  modulePaths: ['<rootDir>'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
    '^@entities/(.*)$': '<rootDir>/src/entities/$1',
    '^@libs/(.*)$': '<rootDir>/src/libs/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@providers/(.*)$': '<rootDir>/src/providers/$1',
    '^@tests/(.*)$': '<rootDir>/tests/$1',
  },
  coverageReporters: ['text'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/providers/**/*.{ts,tsx}',
    '!src/entities/**/*.{ts,tsx}',
  ],
  coverageThreshold: {
    global: {
      branches: 87,
      functions: 89,
      lines: 96,
      statements: 97,
    },
  },
}
export default config
