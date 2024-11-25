module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',  
  ],
  plugins: [
    [
      'module:react-native-dotenv', 
      {
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: true,
      },
    ],
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
    'react-native-reanimated/plugin',  
  ],
};