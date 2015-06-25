var webpack = require('webpack');

module.exports = {
    cache: true,
    entry: {
      app: './src/app.js',
      vendor: './src/lib.js',
    },
    output: {
        filename: 'app.js'
    },
    module: {
        loaders: [
            { test: /\.css$/, include: /src/, loader: 'style!css' },
            { test: /\.html$/, include: /src/, loader: 'riotjs' },
            { test: /\.js$/, include: /src/, loader: 'babel', query: {modules: 'common'} }
        ]
    },
    plugins: [
      new webpack.ProvidePlugin({
        riot: 'riot'
      }),
      new webpack.optimize.CommonsChunkPlugin("vendor", "lib.js")
    ],
    devServer: {
        port: 5555
    }
}
