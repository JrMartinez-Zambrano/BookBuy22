// Importar el path para obtener la ruta absoluta del árbol de direcciones
const path = require("path");
 // Importar webPack
 const webpack = require("webpack");
const { use } = require("passport");


 module.exports = {
     // punto de entrada de los archivos js
     entry : "./public/js/app.js",
     // Punto de salida 
     output:{
         filename: "bundle.js",
         path: path.join(__dirname, "./public/dist"),
     },
     module:{
         rules:[
             {
                test:  /\.m?js$/,
                use: {
                    loader: "babel-loader",
                    options:{
                        presets : ["@babel/preset-env"],
                    },
                },
             },
         ],
     },
 };