export default {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
      "^.+\\.svg$": "jest-transformer-svg",
      "\\.(css|less|sass|scss)$": "identity-obj-proxy",
      "\\.(png|jpg|webp|jpeg|webm)$": "<rootDir>/__mocks__/fileMock.js",
      "^@/(.*)$": "<rootDir>/src/$1",
      '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  extensionsToTreatAsEsm: [".ts",".tsx"],
  transform: {
      "^.+\\.(ts|js|tsx)$" : [
          "@swc/jest",
          {
              jsc: {
                  transform: {
                      react: {
                          runtime: "automatic",
                      }
                  }
              }
          }
      ]
  },
  transformIgnorePatterns: [
    "/node_modules/(?!@ionic/react|ionicons)/"  // Transforma solo los módulos necesarios
  ],
  coverageThreshold : {
      global: {
          branches: 100,
          functions: 100,
          lines: 100,
          statements: 100,
      }
  },
  moduleDirectories: ["node_modules", "src"],
}