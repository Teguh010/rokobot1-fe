module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^three$': '<rootDir>/__mocks__/three.js',
    '^three/examples/jsm/controls/OrbitControls$':
      '<rootDir>/__mocks__/three/examples/jsm/controls/OrbitControls.js'
  },
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }]
  }
}
