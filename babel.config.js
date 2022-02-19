// eslint-disable-next-line no-undef
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: 'react-native-dotenv',
        },
      ],
      [
        'module-resolver',
        {
          alias: {
            '@common': './src/common',
            '@court': './src/court',
            '@team': './src/team',
            '@calendar': './src/calendar',
            '@profile': './src/profile',
            '@redux': './src/redux',
          },
        },
      ],
    ],
  };
};
