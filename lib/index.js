'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash.isplainobject');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.values');

var _lodash4 = _interopRequireDefault(_lodash3);

var _lodash5 = require('lodash.assign');

var _lodash6 = _interopRequireDefault(_lodash5);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var pluginName = 'html-webpack-template-literal-plugin';

var HtmlWebpackTemplateLiteralPlugin = function () {
  function HtmlWebpackTemplateLiteralPlugin(options) {
    _classCallCheck(this, HtmlWebpackTemplateLiteralPlugin);

    _assert2.default.equal(options, undefined, 'HtmlWebpackTemplateLiteralPlugin: Please set options in html-webpack-plugin');
  }

  _createClass(HtmlWebpackTemplateLiteralPlugin, [{
    key: 'apply',
    value: function apply(compiler) {
      var hookRegister = compiler.hooks ? compiler.hooks.compilation.tap.bind(compiler.hooks.compilation, pluginName) : compiler.plugin.bind(compiler, 'compilation');
      hookRegister(function (compilation) {
        var compilationHookRegister = void 0;
        if (compilation.hooks) {
          var processHtmlHook = compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing;
          compilationHookRegister = processHtmlHook.tapAsync.bind(processHtmlHook, pluginName);
        } else {
          compilationHookRegister = compilation.plugin.bind(compilation, 'html-webpack-plugin-before-html-processing');
        }
        compilationHookRegister(function (htmlPluginData, callback) {
          var data = htmlPluginData.plugin.options.templateData || htmlPluginData.plugin.options.indexHtmlData;
          if (!data) {
            return callback();
          }
          if (!(0, _lodash2.default)(data)) {
            console.warn('templateData option in HtmlWebpackTemplateLiteralPlugin must be an object');
            return callback();
          }
          data = (0, _lodash6.default)({
            publicPath: compilation.outputOptions.publicPath || '',
            assets: Object.keys(compilation.assets).filter(function (name) {
              return !/\.map$/i.test(name);
            }),
            webpack: compilation.getStats().toJson(),
            webpackConfig: compilation.options,
            pluginAssets: (0, _lodash6.default)({
              json: htmlPluginData.plugin.assetJson
            }, htmlPluginData.assets)
          }, data);
          htmlPluginData.html = new (Function.prototype.bind.apply(Function, [null].concat(_toConsumableArray(Object.keys(data)), ['return `' + htmlPluginData.html + '`'])))().apply(undefined, _toConsumableArray((0, _lodash4.default)(data)));
          callback(null, htmlPluginData);
        });
      });
    }
  }]);

  return HtmlWebpackTemplateLiteralPlugin;
}();

exports.default = HtmlWebpackTemplateLiteralPlugin;