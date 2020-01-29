const path = require('path');       //ruta
const HtmlWebpackPlugin = require('html-webpack-plugin');   //manejar dos localhost 

module.exports = {
    mode: "development",

    entry: './frontend/app.js',
    output: {
        path: path.join(__dirname,'backend/public'),   //crea la ruta
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './frontend/index.html',  //le decimos donde esta nuestro index
        }),
    ],
    devtool: 'source-map'   //me sirve para ver en que linea cometi algun error y poder debuguear
}