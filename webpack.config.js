const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        index: ['babel-polyfill', './src/index.js'],
        external : './src/external.js'
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/'
    },
    mode: 'development',
    module: {
      rules: [
        {
            test: /\.vue$/,
            loader: 'vue-loader'
        },
        {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        },
        {
            test: /\.(scss|css)$/,
            use: ['vue-style-loader', 'css-loader', 'sass-loader']
        },
        {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]?[hash]'
            }
        }
      ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
     },
    resolve: {
        extensions: ['*', '.js', '.vue', '.json'],
        alias: {
            '@': path.join(__dirname, 'src')
        }
    },
    devServer: {
        // host: '127.0.0.1',
        // port: 8080,
        historyApiFallback:true,
        // noInfo: true,
        hot: true,
        disableHostCheck: true
    },
    performance: {
        hints: 'warning'
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './public/index.html')
        })
    ],
    devtool: '#eval-source-map',
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
};

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map';
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: process.env.NODE_ENV
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ]);
}
