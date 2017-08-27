const path = require('path');

module.exports = function webpackConfigFactory(env) {
    return {
        entry: {
            client: './client/entry.js',
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, './public'),
        },
        
        devServer: {
            contentBase: './public',
            https: true,
            port: process.env.PORT || 3000,
            host: process.env.IP || 'localhost',
        },

        devtool: 'source-map',
        
    };
    
};