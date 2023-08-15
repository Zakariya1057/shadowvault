import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  roots: ['<rootDir>/src'],
  verbose: true,
  modulePaths: ['<rootDir>'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '@src/(.*)$': '<rootDir>/src/$1',
  },
  coverageReporters: ['text'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/register.ts'],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
}
export default config
