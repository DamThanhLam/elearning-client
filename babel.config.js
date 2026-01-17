module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.ts', '.tsx', '.js', '.json'],
          alias: {
            '@': './apps/mobile/src',

            '@store': './packages/store/src',
            '@i18n': './packages/i18n',
            '@api': './packages/api',
          },
        },
      ],
    ],
  };
};
