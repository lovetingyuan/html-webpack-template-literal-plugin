import isPlainObject from 'lodash.isplainobject';
import values from 'lodash.values';
import assign from 'lodash.assign';
import assert from 'assert';

export default class HtmlWebpackTemplateLiteralPlugin {
  constructor(options) {
    assert.equal(options, undefined, 'HtmlWebpackTemplateLiteralPlugin: Please set options in html-webpack-plugin');
  }
  apply(compiler) {
    compiler.plugin('compilation', function (compilation) {
      compilation.plugin('html-webpack-plugin-before-html-processing', function (htmlPluginData, callback) {
        let data = htmlPluginData.plugin.options.templateData || htmlPluginData.plugin.options.indexHtmlData;
        if (!isPlainObject(data)) {
          console.warn('templateData option in HtmlWebpackTemplateLiteralPlugin must be an object');
          return callback();
        }
        data = assign({
          publicPath: compilation.outputOptions.publicPath || '',
          assets: Object.keys(compilation.assets).filter(name => !/\.map$/i.test(name)),
          webpack: compilation.getStats().toJson(),
          webpackConfig: compilation.options,
          pluginAssets: assign({
            json: htmlPluginData.plugin.assetJson
          }, htmlPluginData.assets)
        }, data);
        htmlPluginData.html = new Function(...Object.keys(data), `return \`${htmlPluginData.html}\``)(...values(data));
        callback(null, htmlPluginData);
      });
    });
  }
}
