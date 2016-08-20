var path = require('path');

module.exports = {
    entry: "./client/index.js",
    output: {
        path: __dirname,
        filename: "/client/dist/bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                include: path.resolve(__dirname, '/client/src'),
                exclude: /node_modules/
              }
        ]
    }
};