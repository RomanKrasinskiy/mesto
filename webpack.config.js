const path = require('path'); // Объявлена константа path. Она нужна, чтобы подключить к проекту новые методы для работы с путём.(require — это как import только в Node.js.)
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/pages/index.js') // Переменная __dirname в Node.js доступна глобально. В ней хранится абсолютный путь до папки, в которой лежит файл, где мы используем эту переменную. В нашем случае абсолютный путь до папки с конфигом «Вебпака» — корневой папки нашего проекта.
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        // publickPath: ''
    },
    mode: 'development',
    devServer: {
        static: path.resolve(__dirname, './dist'),
        compress: true,
        port: 9090,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource'
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: { importLoaders: 1 }
            }, 'postcss-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
    ],
};