module.exports = {
  // 部署到子路径
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  
  // 构建输出目录
  outputDir: 'dist',
  
  // 静态资源目录
  assetsDir: 'static',
  
  // 是否在保存时使用eslint检查
  lintOnSave: process.env.NODE_ENV !== 'production',
  
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  
  // 开发服务器配置
  devServer: {
    port: 8080,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    // 代理配置
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  },
  
  // CSS相关配置
  css: {
    // 是否提取CSS
    extract: process.env.NODE_ENV === 'production',
    // 是否启用CSS source maps
    sourceMap: false,
    // CSS预处理器配置
    loaderOptions: {
      scss: {
        prependData: `
          @import "@/assets/styles/variables.scss";
          @import "@/assets/styles/mixins.scss";
        `
      }
    }
  },
  
  // 配置webpack
  configureWebpack: {
    // 设置项目名称
    name: '地图对话',
    // 设置解析别名
    resolve: {
      alias: {
        '@': require('path').resolve(__dirname, 'src')
      }
    },
    // 性能提示
    performance: {
      hints: false
    }
  },
  
  // 链式webpack配置
  chainWebpack: config => {
    // 设置html插件
    config.plugin('html').tap(args => {
      args[0].title = '地图对话 - 智能位置问答系统';
      return args;
    });
    
    // 设置图片压缩
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        bypassOnDebug: true
      })
      .end();
    
    // 移除预加载
    config.plugins.delete('prefetch');
    config.plugins.delete('preload');
    
    // 添加gzip压缩
    if (process.env.NODE_ENV === 'production') {
      config
        .plugin('compression-webpack-plugin')
        .use(require('compression-webpack-plugin'), [
          {
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.(js|css|html|svg)$/,
            threshold: 10240,
            minRatio: 0.8
          }
        ]);
    }
  }
}; 