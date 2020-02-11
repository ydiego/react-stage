/**
 * @Author: ydiego
 * @Date: 2019-12-26 14:50:22
 */
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin');
require('babel-polyfill')

const {
  override,
  useEslintRc,
  addPostcssPlugins,
  addWebpackAlias,
  addDecoratorsLegacy,
} = require("customize-cra")

/**
 * 如果是线上环境 把不要用到的资源给隐藏了
 * 添加cdn环境变量
 */
if(!process.env.REACT_APP_UA) {
  process.env.REACT_APP_V_CONSOLE = '<noscript>You need to enable JavaScript to run this app.</noscript>'
  process.env.REACT_APP_CDN = '' // cdn source
}

const getSassLoader = config => {
  let loaders = config.module.rules.find(rule => Array.isArray(rule.oneOf))
    .oneOf;
  return loaders.find(({test}) => {
    if(test instanceof RegExp && test) {
      return test.test('.scss')
    }
  })
}

module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: (config, env) => {
    /**
     * 注入cdn环境变量 https://www.npmjs.com/package/sass-loader/v/7.0.0
     * mixin自动注入 https://www.npmjs.com/package/sass-resources-loader
     */
    const sassLoader = getSassLoader(config)
    sassLoader.use[sassLoader.use.length - 1].options.data = "$cdn: " + JSON.stringify(process.env.REACT_APP_CDN) + ";"
    sassLoader.use.push({
      loader: 'sass-resources-loader',
      options: {
        resources: path.join(__dirname, './src/assets/styles/index.scss') // 公共样式
      }
    })

    config.entry.unshift('babel-polyfill') // babel

    override(
      addDecoratorsLegacy(), // 支持装饰器语法
      addWebpackAlias({
        "@": path.resolve(__dirname, './src'),
      }),
      useEslintRc(), // 使用 指定的eslintrc.js文件
      addPostcssPlugins([require('postcss-px2rem')({ remUnit: 75 })]), // px to rem
  )(config, env)

    if (env === 'production') {
      /**
       * runtimeChunk&splitChunks, 分离chunk文件 把node_modules的文件打到vendor中
       */
      config.optimization.splitChunks = {
        // 极端做法 所有包单独处理 结果是会生成N多文件
        // chunks: 'all',
        // maxInitialRequests: Infinity,
        // minSize: 0,
        // cacheGroups: {
        //   vendor: {
        //     test: /[\\/]node_modules[\\/]/,
        //     name(module) {
        //       const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)
        //       return `vendor_${packageName}` // 名字自定义
        //     }
        //   },
        // },
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            minChunks: 1,
            chunks: 'initial'
          }
        }
      }
      config.optimization.runtimeChunk = {
        name: 'manifest'
      }

      config.optimization.minimizer.push(
          // 替代了原有的uglify插件 如果非要用 配置里面也可以配 https://github.com/webpack-contrib/terser-webpack-plugin#custom-minify-function
          new TerserPlugin({
            cache: true,  //默认缓存
            parallel: true, // 开启多线程  也可以设置线程数
            sourceMap: true,
          })
      )

    }

    return config
  },

  // devServer: function(configFunction) {
  //   return function(proxy, allowedHost) {
  //     const config = configFunction(proxy, allowedHost);
  //     config.proxy.unshift({
  //       context: ['],
  //       target: '',
  //       changeOrigin: true,
  //       secure: false,
  //     })
  //     return config;
  //   };
  // }
}
