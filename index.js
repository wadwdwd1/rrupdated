const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

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

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`✅ Proxy server listening on port ${PORT}`);
});
