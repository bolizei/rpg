const path = require('path')

const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: './src/rpg/rpg.js',
    mode: 'development',
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Game!'
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/res', to: 'res'}
            ]
        })
    ],
    module: {
        rules: [
            {test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]}
        ]
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    }
}