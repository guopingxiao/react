import Express from 'express';
import qs from 'qs';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';

import configureStore from '../common/store/configureStore';
import App from '../common/containers/App';
import { fetchCounter } from '../common/api/counter';

const app = new Express();
const port = 3000;


const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

/**
 * 页面渲染函数
 * @param {*} html 
 * @param {*} initialState 
 */
function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `;
}

function handleRender(req, res) {// 中间件handleRender
  fetchCounter(apiResult => {
    const params = qs.parse(req.query);//qs 将请求参数转换为字符串
    const counter = parseInt(params.counter, 10) || apiResult || 0; //先判断是否有查询数据

    const initialState = { counter };

    const store = configureStore(initialState);

    const html = renderToString(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const finalState = store.getState();

    res.send(renderFullPage(html, finalState));// 将字符串嵌入页面发送给浏览器
  });
}

app.use(handleRender);

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
  }
});
