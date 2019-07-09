const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {

    // 生产环境下 需要配置优化项
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },

    mode: 'production',

    entry: [
        path.join(__dirname, 'src/index.js'),
        'react-hot-loader/patch',   // react-hot-loader保持状态的热更新
    ],

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[chunkhash].js'
    },

    plugins: [
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['dist']
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.html'),
            filename: 'index.html'
        }),
        new webpack.HashedModuleIdsPlugin(),    // 生产环境使用它来解决module.id变化引起没有修改过的文件打包结果变化
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        })
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
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
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

    devtool: 'cheap-module-source-map',

}
