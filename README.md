
## html-webpack-template-literal-plugin

<img src="https://github.com/webpack/media/blob/master/logo/logo-on-white-bg.png" alt="webpack-logo" width="320" >

 💝 use es6 template literal to compile html file that works with html-webpack-plugin

### install
`npm install html-webpack-template-literal-plugin --save-dev`

or

`yarn add html-webpack-template-literal-plugin -D`

### usage
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
      indexHtmlData: { // template literal data
      }
    }),
    new HtmlWebpackTemplateLiteralPlugin()
  ]
}
```

###  ❗️ matters needing attention
**you must set a loader to process `index.html`**

`html-loader` or `raw-loader` are both ok  

for detail, view https://github.com/jantimon/html-webpack-plugin/blob/master/docs/template-option.md

### license
MIT
