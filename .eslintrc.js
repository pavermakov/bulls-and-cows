module.exports = {
  root: true,
  parser: "babel-eslint",
  env: {
    node: true,
    es6: true,
    jest: true
  },
  extends: [
    "plugin:react/recommended",
    "airbnb"
  ],
  plugins: [
    "react",
    "babel"
  ],
  parserOptions: {
    sourceType: "module",
    requireConfigFile: true,
    ecmaFeatures: {
      jsx: true
    }
},
  settings: {
    react: {
      pragma: "React",
      version: "detect"
    }
  },
  rules: {
    "react/jsx-filename-extension": [1, { "extensions": [".js"] }],
    "no-use-before-define": ["error", { "variables": false }],
    "arrow-body-style": ["off"],
    "function-paren-newline": ["off"],
    "object-curly-newline": ["off"],
    "no-void": ["off"],
    "consistent-return": ["off"],
    "react/destructuring-assignment": ["off"],
    "import/no-unresolved": ["off"],
    "import/extensions": ["off"],
    "react/no-array-index-key": ["off"],
    "import/prefer-default-export": ["off"],
    "operator-linebreak": ["off"],
    "react/jsx-curly-newline": ["off"],
    "react/jsx-props-no-spreading": ["off"]
  }
};
