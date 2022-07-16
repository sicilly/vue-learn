__webpack_base_uri__ = 'http://localhost:80';  // 加上这行否则会报错
const path = require('path') // 导入 node.js 中专门操作路径的模块
// 1. 导入 HTML 插件，得到构造函数
const HtmlPlugin = require('html-webpack-plugin')

// 2. 创建 HTML 插件的实例对象
const htmlPlugin = new HtmlPlugin({
    template: './src/index.html', // 指定原文件路径
    filename: './index.html', // 指定生成文件路径
  })

// 1. 按需导入插件，然后创建插件的实例对象
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const cleanPlugin = new CleanWebpackPlugin()

module.exports = {
  mode: 'development', // mode代码构建模式：development（开发阶段），production（生成阶段）
//   devtool: 'eval-source-map',  // 开发模式
  devtool:'nosources-source-map', // 生产模式(只显示报错行号)
//   devtool:'source-map',   // 生产模式(显示报错行号和源码，不安全，不建议使用)
  // 指定打包的入口
  entry: path.join(__dirname, './src/index.js'),
  // 指定打包的出口
  output: {
    path: path.join(__dirname, './dist'), // 表示输出文件的路径
    filename: 'js/bundle.js', // 表示输出文件的名称
  },
  plugins: [htmlPlugin,cleanPlugin], // 3. 挂载插件的实例对象
  devServer: {
    open: true, // 初次打包完成后，自动打开浏览器
    host: '127.0.0.1', // 实时打包所使用的主机
    port: 80, // 使用的端口号
  },
  module:{
    rules:[  // 指定处理css和less和图片的loader
        {test:/\.css$/,use:['style-loader','css-loader']},
        {test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']},
        // {test: /\.jpg|png|gif$/, use: 'url-loader?limit=22228'}
        {
            test: /\.jpg|png|gif$/, // 匹配的图片
            use: {
              loader: 'url-loader', // 通过 loader 属性指定要调用的 loader
              options: { // 通过 options 属性指定参数项
                limit: 22229,
                // 明确指定把打包生成的图片文件，存放到 dist 目录下的image文件夹中
                outputPath: 'image',
              },
            },
        },
        {
            test: /\.js$/,
            // exclude 表示排除，表示 node_modules 目录下的 js 文件不需要被打包
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    // 声明一个  babel 插件，用来转化 @ 这种高级语法
                    plugins: [['@babel/plugin-proposal-decorators', {legacy: true}]],
                },
            },
        }
    ]
  }
}
