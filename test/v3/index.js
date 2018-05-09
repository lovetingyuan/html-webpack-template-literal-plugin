var webpack = require('webpack');
var test = require('tape');
var path = require('path');
var fs = require('fs');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var TemplateLiteralCompile = require('../../index');

var dist = path.resolve(__dirname, 'dist');
var htmlTitle = 'this is title ' + Math.random();

test('test simple webpack config', function (t) {
  var config = {
    entry: path.resolve(__dirname, 'app.js'),
    output: {
      filename: 'bundle.js',
      path: dist,
      publicPath: '/'
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: '!!html-loader!index.html',
        templateData: {
          title: htmlTitle
        }
      }),
      new TemplateLiteralCompile()
    ]
  };
  webpack(config, function(err, stats) {
    t.equal(err, null);
    debugger;
    t.equal(stats.hasErrors(), false);
    var htmlContent = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
    var ret = htmlContent.match(/<title>(.+)<\/title>/);
    t.equal(Array.isArray(ret), true);
    t.equal(ret[1], htmlTitle);
    ret = htmlContent.match(/rel="preload" href="(.+)"/);
    t.equal(Array.isArray(ret), true);
    t.equal(ret[1], config.output.publicPath + config.output.filename);
    t.end();
  });
});

