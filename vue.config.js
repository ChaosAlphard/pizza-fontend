module.exports = {
  publicPath: '/',
  outputDir: 'dist',    // 构建输出目录
  assetsDir: 'static',  // 静态资源目录
  productionSourceMap: false,  // 是否构建SourceMap

  devServer: {
    host: 'localhost',
    port: '8080',
    https: false,
    proxy: {
      '/api': {
        target: 'http://localhost:8082',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}