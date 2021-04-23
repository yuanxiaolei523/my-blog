const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 复制HTML并每次导入打包后的js
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MyLoader = require('../myLoader');
console.log(MyLoader)
module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, '../src/main.js'),
    output: {
        filename: '[name].[hash:16].js',
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/i,
                use: ['babel-loader', 'MyLoader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            },
            {
                test: /\.scss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [require('autoprefixer')]
                        }
                    }
                },'sass-loader']
            },
            {
                test: '/\.jpe?g|png|gif$/i',
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: '[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html')
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[name].css'
        })
    ]
}