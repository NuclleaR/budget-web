/** @type {import('jest').Config} */
const config = {
  verbose: true,
  preset: "ts-jest",
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: ["**/src/**/*.test.{ts,tsx}"],
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  testEnvironment: "node",
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
};

module.exports = config;
