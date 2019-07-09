const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {

    mode: 'development',

    entry: [
        path.join(__dirname, 'src/index.js'),
        'react-hot-loader/patch',   // react-hot-loader保持状态的热更新
    ],

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[hash].js',
        chunkFilename: '[name].[chunkhash].js'
    },

    devServer: {
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
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.html'),
            filename: 'index.html'
        }),
        new webpack.NamedModulesPlugin()
    ],

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react'
                            ],
                            plugins: [
                                '@babel/plugin-transform-runtime',
                                '@babel/plugin-proposal-class-properties',
                                'react-hot-loader/babel', // react-hot-loader保持状态的热更新
                                '@babel/plugin-syntax-dynamic-import',
                            ],
                            include: path.join(__dirname, 'src'),
                            exclude: /node_modules/
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }
                ],
            },
            {
                // url-loader可以将图片转为base64字符串,也就是data:uri形式
                // 一旦图片过大，就需要使用file-loader的加载本地图片
                // 两个path设置的是图片打包的目录和引用图片时的公共前缀
                test: /\.(jpg|png|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 4096,
                            outputPath: 'images',
                            publicPath: './images'
                        }
                    }
                ]
            }
        ]
    },

    // 配置别名的意义有两点：
    // 1. 书写路径的时候可以更简单，把相对路径直接变成绝对路径
    // 2. 自动补全后缀名
    resolve: {
        alias: {
            page: path.join(__dirname, 'src/page'),
            component: path.join(__dirname, 'src/component'),
            route: path.join(__dirname, 'src/route'),
            state: path.join(__dirname, 'src/state')
        },
        extensions: ['.js', '.css', '.json'],    // 从左到右依次补全后缀
    },

    devtool: 'inline-source-map',



}
