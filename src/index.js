import isPlainObject from 'lodash.isplainobject';
import values from 'lodash.values';
import assign from 'lodash.assign';
import assert from 'assert';

const pluginName = 'html-webpack-template-literal-plugin';
export default class HtmlWebpackTemplateLiteralPlugin {
  constructor(options) {
    assert.equal(options, undefined, 'HtmlWebpackTemplateLiteralPlugin: Please set options in html-webpack-plugin');
  }
  apply(compiler) {
    const hookRegister = compiler.hooks ? compiler.hooks.compilation.tap.bind(compiler.hooks.compilation, pluginName) :
      compiler.plugin.bind(compiler, 'compilation');
    hookRegister(function (compilation) {
      let compilationHookRegister;
      if (compilation.hooks) {
        const processHtmlHook = compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing;
        compilationHookRegister = processHtmlHook.tapAsync.bind(processHtmlHook, pluginName);
      } else {
        compilationHookRegister = compilation.plugin.bind(compilation, 'html-webpack-plugin-before-html-processing');
      }
      compilationHookRegister(function(htmlPluginData, callback) {
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
