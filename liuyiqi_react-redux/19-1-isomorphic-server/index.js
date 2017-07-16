/* eslint-disable */
var WebpackIsomorphicTools = require('webpack-isomorphic-tools');

var config = {
  // webpack-asset.json 键为value = require('key')
  assets: {
    images: {
      extensions: ['png']
    }
  }
};

new WebpackIsomorphicTools(config)
  .development() // 开发环境，不缓存
  .server(__dirname, function () { //__dirname 表示webpack-asset.json文件所在目录
    console.log(require('./Counter.png'))
  });
