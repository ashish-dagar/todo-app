module.exports = {
  preset: "ts-jest",
  // testEnvironment: "jsdom",
  testEnvironment: "jest-environment-jsdom",
  //setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  setupFilesAfterEnv: ["<rootDir>/node_modules/@testing-library/jest-dom"],
  //   moduleNameMapper: {
  //     "\\.(css|less)$": "identity-obj-proxy",
  //   },
  collectCoverage: true,
  coverageDirectory: "coverage",
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy",
  },
};
