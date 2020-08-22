module.exports = {
  roots: ["<rootDir>../src"],
  testRegex: "((\\.|/*.)(spec|test))\\.(js|jsx)?$",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>../node_modules/babel-jest",
    "^.+\\.css$": "<rootDir>../config/cssTransform.js",
    "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)":
      "<rootDir>../config/fileTransform.js",
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  moduleNameMapper: {
    "^react-native$": "react-native-web",
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
  },
  modulePaths: [],
  moduleFileExtensions: [
    "web.js",
    "js",
    "web.ts",
    "ts",
    "web.tsx",
    "tsx",
    "json",
    "web.jsx",
    "jsx",
    "node",
  ],
  setupFiles: ["react-app-polyfill/jsdom"],
  setupFilesAfterEnv: ["../src/setupTest.js"],
};
