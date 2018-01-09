'use strict';

var isPlainObject = require('lodash.isplainobject');
var values = require('lodash.values');
var assign = require('lodash.assign');

function HtmlWebpackTemplateLiteralPlugin() {}

HtmlWebpackTemplateLiteralPlugin.prototype.apply = function (compiler) {
  compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-before-html-processing', function (htmlPluginData, callback) {
      var data = htmlPluginData.plugin.options.indexHtmlData;
      if (!isPlainObject(data)) {
        console.warn('indexHtmlData option in HtmlWebpackTemplateLiteralPlugin must be an object');
        return callback();
      }
      data = assign({
        publicPath: compilation.outputOptions.publicPath || '',
        assets: Object.keys(compilation.assets).filter(function (name) {
          return !/\.map$/i.test(name);
        }),
        webpack: compilation.getStats().toJson(),
        webpackConfig: compilation.options,
        pluginAssets: assign({
          json: htmlPluginData.plugin.assetJson
        }, htmlPluginData.assets)
      }, data);
      // transformed by babel: https://babeljs.org/
      // htmlPluginData.html = new Function(...Object.keys(data), `return \`${htmlPluginData.html}\``)(...values(data));
      htmlPluginData.html = new (Function.prototype.bind.apply(Function, [null].concat(Object.keys(data), ["return `" + htmlPluginData.html + "`"])))().apply(undefined, values(data));

      callback(null, htmlPluginData);
    });
  });
}

module.exports = HtmlWebpackTemplateLiteralPlugin;
