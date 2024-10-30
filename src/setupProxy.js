const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://www.reddit.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // remove /api from the request path
      },
    })
  );
};
