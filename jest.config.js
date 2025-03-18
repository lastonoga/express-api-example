/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  // testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/**/*.test.ts'],  // Looks for test files inside `tests/`
  // clearMocks: true,
  moduleDirectories: ["node_modules", "<rootDir>"],
  // moduleDirectories: ['node_modules', '<rootDir>/app', './app'],
  // modulePaths: ['<rootDir>', './', '<rootDir>/app', './app'],
  moduleNameMapper: {
    // '^@/app/(.*)$': '<rootDir>/app/$1',
    '@/(.*)': '<rootDir>/$1',

  },

  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  resolver: "ts-jest-resolver",
};