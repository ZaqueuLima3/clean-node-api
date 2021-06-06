export default {
  roots: ['<rootDir>/test'],
  clearMocks: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts'
  ],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '@test/(.*)': '<rootDir>/test/$1'
  }
}
