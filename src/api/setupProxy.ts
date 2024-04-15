import { createProxyMiddleware } from 'http-proxy-middleware'

const proxy = {
    target: 'https://api.mercadopago.com',
    changeOrigin: true,
}

module.exports = function (app: any) {
    app.use(
        '/v2',
        createProxyMiddleware(proxy)
    )
}