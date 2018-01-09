var webpack = require('webpack');
var test = require('tape');
var path = require('path');
var fs = require('fs');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var TemplateLiteralCompile = require('../index');
var dist = path.resolve(__dirname, 'dist');
var htmlTitle = 'this is title ' + Math.random();

test('test simple webpack config', function (t) {
  webpack({
    entry: path.resolve(__dirname, 'app.js'),
    output: {
      filename: 'bundle.js',
      path: dist,
      publicPath: '/'
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: '!!html-loader!test/index.html',
        indexHtmlData: {
          title: htmlTitle
        },
        compile: false
      }),
      new TemplateLiteralCompile()
    ]
  }, function(err, stats) {
    t.equal(err, null);
    t.equal(stats.hasErrors(), false);
    var htmlContent = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
    var ret = htmlContent.match(/<title>(.+)<\/title>/);
    t.equal(Array.isArray(ret), true);
    t.equal(ret[1], htmlTitle);
    t.end();
  });
});

