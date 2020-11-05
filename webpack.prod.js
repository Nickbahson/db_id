const path = require('path')
const common = require('./webpack.common')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const  MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = merge(common,{
    mode: 'production',
    //devtool: false,
    //entry: './src/index.js',
    output: {
        filename: "[name].bundle.js",
        path: path.join(__dirname, '/engine/db_id/static/libs/build')
    },

    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin()]
    },

    plugins: [
        new MiniCssExtractPlugin({ filename: '[name].css'}),
        new CleanWebpackPlugin()
    ],


    module: {
        rules: [
            {
                test: /\.scss$/,//i,
                use: [
                    MiniCssExtractPlugin.loader,// 3. Extract css into files
                    'css-loader', // 2. Turns css into commonjs
                    'sass-loader'// 1. Turns sass into css
                ],
            },
        ]
    }
});