module.exports = function (api) {
  api.cache(true);
  return {
    presets: [["babel-preset-expo"], "@babel/preset-typescript"],
    plugins: [
      "tailwindcss-react-native/babel",
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
