const config = {
  // verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  testMatch: [
    '<rootDir>/src/**/*.test.ts',
    '<rootDir>/src/**/*.spec.ts'
  ], 
};

module.exports = config;