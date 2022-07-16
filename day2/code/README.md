### 目录

- [前端工程化与 webpack](#_webpack_1)
- - [一、前端工程化](#_3)
  - - [1. 小白眼中的前端开发 vs 实际的前端开发](#1__vs__5)
    - [2. 什么是前端工程化](#2__20)
    - [3. 前端工程化的解决方案](#3__34)
  - [二、webpack 的基本使用](#webpack__47)
  - - [1. 什么是 webpack](#1__webpack_49)
    - [2. 创建列表隔行变色项目](#2__62)
    - [3. 安装 webpack并配置](#3__webpack_73)
    - [4. webpack的参数](#4_webpack_99)
    - - [4.1 mode 的可选值](#41_mode__101)
      - [4.2 webpack.config.js 文件的作用](#42_webpackconfigjs__112)
      - [4.3 webpack 中的默认约定](#43_webpack__118)
      - [4.4 自定义打包的入口与出口](#44__127)
  - [三、webpack 中的插件](#webpack__149)
  - - [1. webpack 插件的作用](#1_webpack__151)
    - [2. webpack-dev-server](#2_webpackdevserver_164)
    - - [2.1 安装配置 webpack-dev-server](#21__webpackdevserver_168)
      - [2.2 打包生成的文件哪儿去了？](#22__178)
      - [2.3 生成到内存中的文件该如何访问？](#23__188)
    - [3. html-webpack-plugin](#3_htmlwebpackplugin_199)
    - - [3.1 安装配置 html-webpack-plugin](#31__htmlwebpackplugin_205)
      - [3.2 解惑 html-webpack-plugin](#32__htmlwebpackplugin_227)
    - [4. devServer 节点](#4_devServer__234)
  - [四、webpack 中的 loader](#webpack__loader_253)
  - - [1. loader 概述](#1_loader__255)
    - [2. loader 的调用过程](#2_loader__267)
    - [3. 打包处理 css 文件](#3__css__272)
    - [4. 打包处理 less 文件](#4__less__294)
    - [5. 打包处理样式表中与 url 路径相关的文件](#5__url__309)
    - [6. 打包处理 js 文件中的高级语法](#6__js__347)
    - - [6.1 安装 babel-loader 相关的包](#61__babelloader__364)
  - [五、打包发布](#_390)
  - - [1. 为什么要打包发布](#1__392)
    - [2. 配置 webpack 的打包发布](#2__webpack__403)
    - [3. 打包前简单优化](#3__420)
    - [4. 企业级项目的打包发布](#4__475)
  - [六、Source Map](#Source_Map_487)
  - - [1. 生产环境遇到的问题](#1__489)
    - [2. 什么是 Source Map](#2__Source_Map_500)
    - [3. 开发环境下的 Source Map](#3__Source_Map_508)
    - - [3.1 解决默认 Source Map 的问题](#31__Source_Map__516)
    - [4. 生产环境下的 Source Map](#4__Source_Map_531)
    - - [4.1 只定位行数不暴露源码](#41__538)
      - [4.2 定位行数且暴露源码](#42__545)
    - [5. Source Map 的最佳实践](#5_Source_Map__554)
  - [实际开发中需要自己配置 webpack 吗？](#_webpack__563)
  - [总结](#_572)



# 前端工程化与 [webpack](https://so.csdn.net/so/search?q=webpack&spm=1001.2101.3001.7020)

## 一、前端工程化

### 1. 小白眼中的[前端开发](https://so.csdn.net/so/search?q=前端开发&spm=1001.2101.3001.7020) vs 实际的前端开发

- 小白眼中的前端开发：
  - 会写 HTML + CSS + JavaScript 就会前端开发
  - 需要美化页面样式，就拽一个 bootstrap 过来
  - 需要操作 DOM 或发起 Ajax 请求，再拽一个 jQuery 过来
  - 需要快速实现网页布局效果，就拽一个 Layui 过来
- 实际的前端开发：
  - 模块化（js 的模块化、css 的模块化、资源的模块化）
  - 组件化（复用现有的 UI 结构、样式、行为）
  - 规范化（目录结构的划分、编码规范化、接口规范化、文档规范化、 Git 分支管理）
  - 自动化（自动化构建、自动部署、自动化测试）



### 2. 什么是前端工程化

前端工程化指的是：在企业级的前端项目开发中，把前端开发所需的工具、技术、流程、经验等进行规范化、
标准化。最终落实到细节上，就是实现前端的4 个现代化：模块化、组件化、规范化、自动化

企业中的 Vue 项目和 React 项目，都是**基于工程化的方式进行开发**的。

**前端工程化的好处**

- 前端工程化让前端开发能够**自成体系（有一套标准的开发方案和流程）**，覆盖了前端项目从创建到部署的方方面面
- 最大程度地提高了前端的开发效率，降低了技术选型、前后端联调等带来的协调沟通成本



### 3. 前端工程化的解决方案

早期的前端工程化解决方案：

- grunt：https://www.gruntjs.net/
- gulp：https://www.gulpjs.com.cn/

目前主流的前端工程化解决方案：

- webpack：https://www.webpackjs.com/
- parcel：https://zh.parceljs.org/



## 二、webpack 的基本使用

### 1. 什么是 webpack

概念：webpack 是前端项目工程化的具体解决方案。

主要功能：它提供了友好的前端模块化开发支持，以及**代码压缩混淆、处理浏览器端 JavaScript 的兼容性、性**
**能优化等**强大的功能。

好处：让程序员把工作的重心放到具体功能的实现上，提高了前端**开发效率**和项目的**可维护性**。

注意：目前企业级的前端项目开发中，绝大多数的项目都是基于 webpack 进行打包构建的



### 2. 创建列表隔行变色项目

1. 新建项目空白目录，并运行 `npm init –y` 命令，初始化包管理配置文件 package.json
2. 新建 src 源代码目录
3. 新建 src -> index.html 首页和 src -> index.js 脚本文件
4. 初始化首页基本的结构
5. 运行 `npm install jquery –S` 命令，安装 jQuery
6. 通过 ES6 模块化的方式导入 jQuery，实现列表隔行变色效果



### 3. 安装 webpack并配置

打开终端，安装 webpack 相关的两个包：`npm install webpack@5.57.1 webpack-cli@4.9.0 -D`

**配置 webpack**

1、在项目根目录中，创建名为 **webpack.config.js** 的 webpack 配置文件，并初始化如下的基本配置：

```js
module.exports = {
  mode: 'development', // mode代码构建模式：development（开发阶段），production（生成阶段）
}
```

2、在 package.json 的 scripts 节点下，新增 dev 脚本如下：dev是自己定义的名字

```js
"scripts": {
	"dev": "webpack"
}
```

3、在终端中运行 `npm run dev` 命令，启动 webpack 进行项目的打包构建，然后导入 dist 的 main.js



### 4. webpack的参数

#### 4.1 mode 的可选值

mode 节点的可选值有两个，分别是：

- development：开发环境
  - 不会对打包生成的文件进行代码压缩和性能优化
  - 打包速度快，适合在开发阶段使用
- production：生产环境
  - 会对打包生成的文件进行代码压缩和性能优化
  - 打包速度很慢，仅适合在项目发布阶段使用

#### 4.2 webpack.config.js 文件的作用

webpack.config.js 是 webpack 的配置文件。webpack 在真正开始打包构建之前，会先读取这个配置文件，从而基于给定的配置，对项目进行打包。

注意：由于 webpack 是基于 node.js 开发出来的打包工具，因此在它的配置文件中，支持使用 node.js 相关的语法和模块进行 webpack 的个性化配置。

#### 4.3 webpack 中的默认约定

在 webpack 中有如下的默认约定：

- 默认的打包入口文件为 src -> index.js
- 默认的输出文件路径为 dist -> main.js

注意：可以在 webpack.config.js 中修改打包的默认约定

#### 4.4 自定义打包的入口与出口

在 webpack.config.js 配置文件中，通过 entry 节点指定打包的入口。通过 output 节点指定打包的出口。
示例代码如下：然后使用`npm run dev`，观看结果

```js
const path = require('path') // 导入 node.js 中专门操作路径的模块

module.exports = {
  mode: 'development', // mode代码构建模式：development（开发阶段），production（生成阶段）
  // 指定打包的入口
  entry: path.join(__dirname, './src/index.js'),
  // 指定打包的出口
  output: {
    path: path.join(__dirname, './dist'), // 表示输出文件的路径
    filename: 'bundle.js', // 表示输出文件的名称
  },
}
```



## 三、webpack 中的插件

### 1. webpack 插件的作用

通过安装和配置第三方的插件，可以**拓展 webpack 的能力**，从而让 webpack 用起来更方便。最常用的 webpack 插件有如下两个：

- webpack-dev-server
  - 类似于 node.js 阶段用到的 nodemon 工具
  - 每当修改了源代码，webpack 会自动进行项目的打包和构建
- html-webpack-plugin
  - webpack 中的 HTML 插件（类似于一个模板引擎插件）
  - 可以通过此插件自定制 index.html 页面的内容



### 2. webpack-dev-server

webpack-dev-server 可以让 webpack 监听项目源代码的变化，从而进行自动打包构建。

#### 2.1 安装配置 webpack-dev-server

运行如下的命令，即可在项目中安装此插件：`npm install webpack-dev-server@3.11.2 -D`

1. 修改 package.json -> scripts 中的 dev 命令如下：`"dev": "webpack server"`
2. 再次运行 `npm run dev` 命令，重新进行项目的打包
3. 在浏览器中访问 http://localhost:8080 地址，查看自动打包效果

注意：webpack-dev-server 会启动一个实时打包的 http 服务器

#### 2.2 打包生成的文件哪儿去了？

- 不配置 webpack-dev-server 的情况下，webpack 打包生成的文件，会存放到实际的物理磁盘上
  - **严格遵守**开发者在 webpack.config.js 中指定配置，根据 output 节点指定路径进行存放
- 配置了 webpack-dev-server 之后，打包生成的文件存放到了内存中
  - 不再根据 output 节点指定的路径，存放到实际的物理磁盘上
  - 提高了实时打包输出的性能，因为内存比物理磁盘速度快很多

**注意**：如果开启了实时打包功能，就是把 dist 目录删了也没事，因为东西是放在内存中的

#### 2.3 生成到内存中的文件该如何访问？

webpack-dev-server 生成到内存中的文件，默认放到了项目的根目录中，而且是虚拟的、不可见的。

- 可以直接用 / 表示项目根目录，后面跟上要访问的文件名称，即可访问内存中的文件
- 例如 /bundle.js 就表示要访问 webpack-dev-server 生成到内存中的 bundle.js 文件

修改 index.html 的文件的 script 标签，然后就可以进行 index.js 文件的修改，查看实时变色效果啦

### 3. html-webpack-plugin

html-webpack-plugin 是 webpack 中的 HTML 插件，可以通过此插件自定制 index.html 页面的内容。

需求：通过 html-webpack-plugin 插件，将 src 目录下的 index.html 首页，复制到项目根目录中一份！

#### 3.1 安装配置 html-webpack-plugin

运行如下的命令，即可在项目中安装此插件：`npm install html-webpack-plugin@5.3.2 -D`

修改配置文件：

```js
__webpack_base_uri__ = 'http://localhost:8080';  // 加上这行否则会报错
// 1. 导入 HTML 插件，得到构造函数
const HtmlPlugin = require('html-webpack-plugin')

// 2. 创建 HTML 插件的实例对象
const htmlPlugin = new HtmlPlugin({
  template: './src/index.html', // 指定原文件路径
  filename: './index.html', // 指定生成文件路径
})

module.exports = {
  mode: 'development', // mode代码构建模式：development（开发阶段），production（生成阶段）
  plugins: [htmlPlugin], // 3. 挂载插件的实例对象
}
```

#### 3.2 解惑 html-webpack-plugin

1. 通过 HTML 插件复制到项目根目录中的 index.html 页面，也被放到了内存中
2. HTML 插件在生成的 index.html 页面，自动注入了打包的 bundle.js 文件

### 4. devServer 节点

在 webpack.config.js 配置文件中，可以通过 devServer 节点对 webpack-dev-server 插件进行更多的配置，
示例代码如下：

```js
module.exports = {
    devServer: {
      open: true, // 初次打包完成后，自动打开浏览器
      host: '127.0.0.1', // 实时打包所使用的主机
      port: 80, // 使用的端口号
    },
}
```

注意：凡是修改了 webpack.config.js 配置文件，或修改了 package.json 配置文件，必须重启实时打包的服务器，否则最新的配置文件无法生效！

## 四、webpack 中的 loader

### 1. loader 概述

在实际开发过程中，webpack 默认只能打包处理以 .js 后缀名结尾的模块。其他非 .js 后缀名结尾的模块，webpack 默认处理不了，需要调用 loader 加载器才可以正常打包，否则会报错！

loader 加载器的作用：**协助 webpack 打包处理特定的文件模块**。比如：

- css-loader 可以打包处理 .css 相关的文件
- less-loader 可以打包处理 .less 相关的文件
- babel-loader 可以打包处理 webpack 无法处理的高级 JS 语法

### 2. loader 的调用过程

![[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-UKZCmQiC-1637334798256)(image/image-20211007210508360.png)]](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207152056978.png)

### 3. 打包处理 css 文件

1、运行 `npm i style-loader@3.3.0 css-loader@5.2.7 -D` 命令，安装处理 css 文件的 loader
2、在 webpack.config.js 的 **module -> rules** 数组中，添加 loader 规则如下：

```js
module: { // 所有第三方模块的匹配规则
  rules: [ // 文件后缀名的匹配规则
    {test: /\.css$/, use: ['style-loader', 'css-loader']},
  ]
}
```

其中，test 表示匹配的文件类型， use 表示对应要调用的 loader

注意：

- use 数组中指定的 loader 顺序是固定的，不要将 style 和 css 调换顺序
- 多个 loader 的调用顺序是：从后往前调用

### 4. 打包处理 less 文件

1、运行 `npm i less-loader@10.0.1 less@4.1.2 -D` 命令
2、在 webpack.config.js 的 **module -> rules** 数组中，添加 loader 规则如下：

```js
module: { // 所有第三方模块的匹配规则
  rules: [ // 文件后缀名的匹配规则
    {test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']},
  ]
}
```

### 5. 打包处理样式表中与 url 路径相关的文件

1、运行 `npm i url-loader@4.1.1 file-loader@6.2.0 -D` 命令
2、在 webpack.config.js 的 **module -> rules** 数组中，添加 loader 规则如下：

```js
module: { // 所有第三方模块的匹配规则
  rules: [ // 文件后缀名的匹配规则
    {test: /\.jpg|png|gif$/, use: 'url-loader?limit=22228'}
  ]
}
```

其中 ? 之后的是 loader 的参数项：

- limit 用来指定**图片的大小**，单位是字节（byte）
- 只有 ≤ limit 大小的图片，才会被转为 base64 格式的图片

**loader 的另一种配置方式**：带参数项的 loader 还可以通过对象的方式进行配置：

```js
module: { // 所有第三方模块的匹配规则
  rules: [ // 文件后缀名的匹配规则
    {
      test: /\.jpg|png|gif$/, // 匹配的图片
      use: {
        loader: 'url-loader', // 通过 loader 属性指定要调用的 loader
        options: { // 通过 options 属性指定参数项
          limit: 22229,
        },
      },
    }
  ]
}
```



### 6. 打包处理 js 文件中的高级语法

webpack 只能打包处理**一部分**高级的 JavaScript 语法。对于那些 webpack 无法处理的高级 js 语法，需要借
助于 **babel-loader** 进行打包处理。例如 webpack 无法处理下面的 JavaScript 代码：

```js
function info(target) {
  target.info = 'person info'
}

// webpack 处理不了 @info 这种高级语法，所以我们需要 babel-loader
@info
class Person {}

console.log(Person.info)
```

#### 6.1 安装 babel-loader 相关的包

安装对应的依赖包：`npm i babel-loader@8.2.2 @babel/core@7.14.5 @babel/plugin-proposal-decorators@7.14.5 -D`

在 webpack.config.js 的 module -> rules 数组中，添加 loader 规则如下：

```js
module: { // 所有第三方模块的匹配规则
  rules: [ // 文件后缀名的匹配规则
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
  ]
}
```

## 五、打包发布

### 1. 为什么要打包发布

项目开发完成之后，使用 webpack 对项目进行打包发布的主要原因有以下两点：

1. 开发环境下，打包生成的文件存放于内存中，无法获取到最终打包生成的文件
2. 开发环境下，打包生成的文件不会进行代码压缩和性能优化

为了让项目能够在生产环境中**高性能**的运行，因此需要对项目进行打包发布。

### 2. 配置 webpack 的打包发布

在 package.json 文件的 scripts 节点下，新增 build 命令如下：开发环境运行 dev 命令，项目发布运行 build 命令

```js
"scripts": {
  "dev": "webpack serve",
  "build": "webpack --mode production"
},
```

**–model** 是一个参数项，用来指定 webpack 的运行模式。production 代表生产环境，会对打包生成的文件进行代码压缩和性能优化。

注意：通过 --model 指定的参数项，会覆盖 webpack.config.js 中的 model 选项。



### 3. 打包前简单优化

**把 JavaScript 文件统一生成到 js 目录中**，在 webpack.config.js 配置文件的 output 节点中，进行如下的配置：

```js
output: {
  path: path.join(__dirname, './dist'), // 表示输出文件的路径
  // 告诉 webpack 把生成的 bundle.js 文件存放到 dist目录下的 js 子目录中
  filename: 'js/bundle.js',
},
```

**把图片文件统一生成到 image 目录中**

修改 webpack.config.js 中的 url-loader 配置项，新增 **outputPath** 选项即可指定图片文件的输出路径：

```js
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
```

**自动清理 dist 目录下的旧文件**

为了在每次打包发布时**自动清理掉 dist 目录中的旧文件**，可以安装并配置 clean-webpack-plugin 插件：

1、安装插件：`npm install clean-webpack-plugin@4.0.0 -D`

2、配置插件，导入插件，修改 plugins 节点添加 cleanPlugin

```js
// 1. 按需导入插件，然后创建插件的实例对象
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const cleanPlugin = new CleanWebpackPlugin()

// 2. 将 cleanPlugin 插件挂载到 plugins 节点中
plugins: [htmlPlugin, cleanPlugin],
```

3、使用`npm run build`进行测试



### 4. 企业级项目的打包发布

企业级的项目在进行打包发布时，远比刚才的方式要复杂的多，主要的发布流程如下：

- 生成打包报告，根据报告分析具体的优化方案
- Tree-Shaking
- 为第三方库启用 CDN 加载
- 配置组件的按需加载
- 开启路由懒加载
- 自定制首页内容

## 六、Source Map

### 1. 生产环境遇到的问题

前端项目在投入生产环境之前，都需要对 JavaScript 源代码进行压缩混淆，从而减小文件的体积，提高文件的加载效率。此时就不可避免的产生了另一个问题：

对压缩混淆之后的代码除错（debug）是一件极其困难的事情，如下图所示：
![[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-l2jYzii9-1637334798261)(image/image-20211008095051549.png)]](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207152056172.png)

- 变量被替换成**没有任何语义**的名称
- 空行和注释被剔除

### 2. 什么是 Source Map

Source Map 就是一个信息文件，里面储存着位置信息。也就是说，Source Map 文件中存储着代码压缩混淆前后的对应关系。

有了它，出错的时候，除错工具将**直接显示原始代码，而不是转换后的代码**，能够极大的方便后期的调试。

### 3. 开发环境下的 Source Map

在开发环境下，webpack **默认启用**了 Source Map 功能。当程序运行出错时，可以直接在控制台提示错误行的位置，并定位到具体的源代码：
![img](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207152056950.png)
![在这里插入图片描述](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207152056953.png)
**但是**：开发环境下默认生成的 Source Map，记录的是**生成后的代码的位置**。会导致**运行时报错的行数与源代码的行数不一致**的问题。示意图如下：
![在这里插入图片描述](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207152056941.png)

#### 3.1 解决默认 Source Map 的问题

开发环境下，推荐在 webpack.config.js 中添加如下的配置，即可保证运行时报错的行数与源代码的行数
保持一致

```js
module.exports = {
  mode: 'development', // mode代码构建模式：development（开发阶段），production（生成阶段）
  // eval-source-map 仅限在开发模式下使用，不建议在生产模式使用
  devtool: 'eval-source-map',
}
```

### 4. 生产环境下的 Source Map

在生产环境下，如果省略了 devtool 选项，则最终生成的文件中不包含 Source Map。这能够防止原始代码通过 Source Map 的形式暴露给别有所图之人。
![在这里插入图片描述](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207152056952.png)
![在这里插入图片描述](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207152056896.png)

#### 4.1 只定位行数不暴露源码

在生产环境下，如果**只想定位报错的具体行数**，且不想暴露源码。此时可以将 devtool 的值设置为 nosources-source-map。实际效果如图所示：
![在这里插入图片描述](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207152056869.png)
![在这里插入图片描述](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207152056899.png)

#### 4.2 定位行数且暴露源码

在生产环境下，如果想在**定位报错行数的同时，展示具体报错的源码**。此时可以将 devtool 的值设置为 source-map。实际效果如图所示：
![在这里插入图片描述](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207152056940.png)
![在这里插入图片描述](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207152056926.png)
采用此选项后：你应该将你的服务器配置为，**不允许普通用户访问 source map 文件**！

### 5. Source Map 的最佳实践

- 开发环境下：建议把 devtool 的值设置为eval-source-map
  - 好处：可以精准定位到具体的错误行
- 生产环境下：建议关闭 Source Map，或将 devtool 的值设置为nosources-source-map
  - 好处：防止源码泄露，提高网站的安全性

## 实际开发中需要自己配置 webpack 吗？

答案：基本上不需要！

- 实际开发中会使命令行工具（俗称 CLI）一键生成带有 webpack 的项目
- 开箱即用，所有 webpack 配置项都是现成的！
- 我们只需要知道 webpack 中的基本概念即可！

## 总结

- 能够掌握 webpack 的基本使用
  - 安装、webpack.config.js、修改打包入口
- 了解常用的 plugin 的基本使用
  - webpack-dev-server、html-webpack-plug
- 了解常用的 loader 的基本使用
  - loader 的作用、loader 的调用过程
- 能够说出 Source Map 的作用
  - 精准定位到错误行并显示对应的源码
  - 方便开发者调试源码中的错误