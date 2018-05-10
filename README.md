
## html-webpack-template-literal-plugin

 💝 Use es6 template literal to compile html file that works with html-webpack-plugin(support webpack v4)

[![travis-ci](https://travis-ci.org/lovetingyuan/html-webpack-template-literal-plugin.svg?branch=master "CI")](https://travis-ci.org/lovetingyuan/html-webpack-template-literal-plugin)
[![Version](https://img.shields.io/npm/v/html-webpack-template-literal-plugin.svg "version")](https://www.npmjs.com/package/html-webpack-template-literal-plugin)
[![Dependencies](https://david-dm.org/lovetingyuan/html-webpack-template-literal-plugin/status.svg "dependencies")](https://david-dm.org/lovetingyuan/html-webpack-template-literal-plugin)
[![License](https://img.shields.io/npm/l/html-webpack-template-literal-plugin.svg "License")](https://github.com/lovetingyuan/html-webpack-template-literal-plugin/blob/master/LICENSE)

<img src="https://github.com/webpack/media/blob/master/logo/logo-on-white-bg.png" alt="webpack-logo" width="320" >



### install
`npm install html-webpack-template-literal-plugin --save-dev`

or

`yarn add html-webpack-template-literal-plugin -D`

### usage

1. specify **`templateData`** option in [`html-webpack-plugin`](https://github.com/jantimon/html-webpack-plugin/)
2. use `html-webpack-template-literal-plugin`

the following values are available besides the values in `templateData`

```javascript
{
  publicPath: 'String, webpack publicPath',
  assets: 'Array, all assets files name generated by webpack',
  webpack: 'Object, the webpack stats object(it is not the final stats)',
  webpackConfig: 'Object, webpack config object',
  pluginAssets: 'Object, assets info generated by html-webpack-plugin'
}
```

### example

webpack.config.js

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplateLiteralPlugin = require('html-webpack-template-literal-plugin');

const webpackConfig = {
  // ... 
  plugins: [
     new HtmlWebpackPlugin({
      inject: true,
      template: '!!html-loader!index.html',
      // other config options
      templateData: { // template literal data
        title: 'this is title'
      }
    }),
    new HtmlWebpackTemplateLiteralPlugin()
  ]
}
```

index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="preload" href="${publicPath}${assets.find(v => /main\.chunk/.test(v))}" as="script">
  </head>
  <body>
  </body>
</html>
```

###  ⚠️ NOTE
**You must set a loader to process `index.html`**

eg: [`raw-loader`](https://github.com/webpack-contrib/raw-loader) or [`html-loader`](https://github.com/webpack-contrib/html-loader) are both ok.  

Please view https://github.com/jantimon/html-webpack-plugin/blob/master/docs/template-option.md for detail. 

Pay attention to possible [`XSS`](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting) attack and make sure the `templateData` is reliable

### license
MIT
