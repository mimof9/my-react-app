## 自建react开发环境
> react16 + react-router5 + redux + saga

## 以下只简要介绍下需要做哪些内容，具体怎么配置就不写了

## 初始化
- yarn init -y

## 安装webpack4 -- 可以用webpack命令愉快打包项目
- yarn add webpack webpack-cli -D
- 写webpack.cofing.js配置文件

## 安装webpack-dev-server -- 用webpack-dev-server命令讲项目打包到内存
- yarn add webpack-dev-server -D

## 模板解析
- yarn add html-webpack-plugin -D

## js部分 -- 包括ES6, react, 以及一些新的提案, polyfill和runtime
- yarn add babel-loader @babel/preset-env @babel/preset-rect -D
- yarn add @babel/plugin-proposal-class-properties @babel/plugin-transform-runtim -D
- yarn add @babel/polyfill @babel/runtime -S

## css部分 -- 包括CSS Moudles, 提取css
- yarn add style-loader css-loader -D
- yarn add mini-css-extract-plugin -D

## 静态资源 -- 包括怎么打包静态资源，静态资源如果放在CDN服务器上怎么做
- yarn add url-loader file-loader -D

---
## react部分

## 集成react16, 思路：根据react的原理 入口文件渲染到模板的DOM中 因此模板就不需要手动引入打包后的js文件
- yarn add react react-dom -S

## 集成react-router5 -- 4，5和之前的2, 3的主要区别就在于路由不再集中式管理，更加组件化了
- react-router的集成是针对react的，我的仓库中另外有两个项目专门讲2, 5两个版本的配置
- yarn add react-router-dom -S

## 集成redux -- 状态管理，redux基本概念，和react集成，异步的各种处理方式，最后还有更好的封装dva
- yarn add redux react-redux redux-saga -S
- 状态管理单独建立个state包 去管理action reducer saga store

---
## 优化部分

## 别名， 简化路径书写+补全后缀， 
1. resolve的alias和extensions
2. 后缀按顺序补全(同路径有同名不同后缀文件可能引起难以发现的错误)

## 调试， 开发环境要求代码结构清晰，出错信息全，生产环境要求代码体积小，出错信息精简
1. devtool
2. 开发inline-source-map
3. 调试cheap-module-source-map

## 热更新， 3个程度
1. webpack自带的热刷新，通过watch, watchOptions指定刷新频率
2. 组件程度的更新： devServer配置hot, 但是react模块保留不了状态
3. yarn add react-hot-loader -D, 配置 + 入口文件中 if (module.hot) { module.hot.accept() }

## 按需加载， 解决一次性加载所有js带来的首屏卡顿， 把js文件分开打包，需要时再引入。也就是懒加载
1. yarn add @babel/plugin-syntax-dynamic-import -D  仅从语法层面上支持 不提供真是的动态导入能力，也因此放入-D即可
2. yarn ddd @loadable/component -S  真正提供动态导入的模块
3. import loadable from '@loadable/component'
4. loadable(() => import('page/Page2'), {
       fallback: <div>加载中...</div>
   })

## 提取出公共代码(代码分割)进行缓存， 搞清楚缓存的内容是那些公共代码，比如node_modules，runtime，或者我们自己开发的工具模块
1. optimization: {
       runtimeChunk: 'single',  // runtime
       splitChunks: {
           cacheGroups: {
               vendor: {            // node_modules中打包出来叫做vendor
                   test: /node_modules/,
                   name: 'vendors',
                   chunks: 'all'
               }
           }
       }
   }
2. 使用[hash]配置output的输出文件名，通过不同文件名去让浏览器能请求最新的文件(缓存的原理，想一想浏览器缓存的原理(强缓存，协商缓存)，实际这里没有用)
3. 进行代码分割的目的在于一个地方修改，不影响其他的文件打包结果，换句话说也就是hash不变。但是以上做不到这一点。
4. 使用webpack内置插件 new webpack.HashedModuleIdsPlugin() 生产环境下用这个


## 压缩
1. webpack4 在mode为production模式下 默认开启了代码压缩


--- 
维护开发环境和生产环境两套配置的思路

## 秉着逻辑分离的原则，写两个config文件是最好的
1. webpack.config.js
2. webpack.dev.config.js

## 在package.json中配置scripts脚本
1. 可以借助if-env模块 判断node_env为development还是production

## 配置环境变量
1. webpack内置插件DefinePlugin
2. 然后直接用一个文件去写

## 提取两个配置文件的公共部分
1. webpack.common.config.js
2. yarn add webpack-merge -D
3. let { smart } = require('webpack-merge')
4. smart(base, {独有配置})

## 两个环境独有的东西
1. 开发环境独有的devServer
2. 生产环境独有的clean-webpack-plugin(拯救不开心的强迫症病人)，不太准确，但是大多数情况下开发环境都用devServer不会打包到内存，用不到它

---
## 开发环境的devServer方法
1. devServer可以配置的东西挺多的
2. devServer: {
   // 这些配置选项可以写在webpack-dev-server 命令之后 就像babel-loader的配置可以写在.babelrc里一样
   // progress: true,  // 将编译进度输出到控制台
   open: true,     // 打开浏览器
   host: '127.0.0.1',
   port: 3000,
   contentBase: path.join(__dirname, 'dist'),   // URL的根目录。如果不设定的话，默认指向项目根目录。
   historyApiFallback: true,   // 任意的404响应都被替代为index.html
   proxy: {    // 比如在 localhost:3000 上有后端服务的话，你可以这样启用代理
       "/api": "http://localhost:3000"
   },
   hot: true, // 启用Webpack的模块热替换特性 无法保留react组件状态 需要react-hot-loader
}

## 开发环境的nodejs方法
1. yarn add express -D
2. 写一个server.js 把静态资源目录设为webpack的打包目录 这样就能打包测试了
3. 如果是browserHistory 需要把所有请求都返回index.html

