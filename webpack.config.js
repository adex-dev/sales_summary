const path = require("path");
const TerserPlugin = require('terser-webpack-plugin');
const WebpackObfuscator = require('webpack-obfuscator');


module.exports = {
    devtool: "nosources-source-map",
    mode: "production",
    entry: "./resources/src/index.js",
    performance: {
        hints: false
    },
    output: {
        filename: "sandbox.js",
        path: path.resolve(__dirname, "resources/build/js"),
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'], // Menangani file CSS
            },

        ],
    },
    resolve: {
        alias: {
            Choices: path.resolve(__dirname, 'node_modules/choices.js'),
        },
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
        ],
    },

    plugins: [
        // new WebpackObfuscator({
        //     rotateStringArray: true,
        //     stringArray: true,
        // }),
    ],
};
