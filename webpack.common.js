const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        main: ["@babel/polyfill", path.resolve(__dirname, './src/index.js')],
        vendor: ["@babel/polyfill", path.resolve(__dirname, './src/vendor.js')],
        home_search: ["@babel/polyfill", path.resolve(__dirname, './src/home_search.js')],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],

    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.(svg|png|jpg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: "[name].[hash].[ext]",
                        outputPath: 'imgs'
                    }
                }
            }
        ],
    },

}