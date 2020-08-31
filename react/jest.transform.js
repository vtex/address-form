module.exports = require('babel-jest').createTransformer({
  presets: [
    '@babel/preset-react',
    '@babel/preset-env',
    '@babel/preset-typescript',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-runtime',
  ],
})
