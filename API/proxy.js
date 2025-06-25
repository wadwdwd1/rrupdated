// api/proxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');
const { createServer } = require('http');
const express = require('express');

const app = express();

app.use('/', createProxyMiddleware({
  target: 'http://45.158.77.61:25801/',
  changeOrigin: true,
  ws: true,
  onProxyReq: (proxyReq, req, res) => {
    console.log(`[Proxy] ${req.method} ${req.url}`);
  },
  onError: (err, req, res) => {
    console.error('[Proxy error]', err.message);
    res.status(502).send('Bad Gateway');
  }
}));

module.exports = (req, res) => {
  const server = createServer(app);
  server.emit('request', req, res);
};
