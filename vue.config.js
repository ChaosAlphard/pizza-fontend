module.exports = {
  publicPath: '/',
  outputDir: 'dist',    // 构建输出目录
  assetsDir: 'assets',  // 静态资源目录
  lintOnSave: true,     // eslint

  devServer: {
    open: false,
    host: 'localhost',
    port: '8080',
    https: false,
    hotOnly: false,
    //配置代理(跨域)
    proxy: {
      '/api': {
        target: 'http://localhost:8082/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    },
    // before(app) {
    //   app.get('/api/top/playlist', (req, res) => {
    //     res.json('http://localhost:3000/top/playlist');
    //   })
    // }
  }
}