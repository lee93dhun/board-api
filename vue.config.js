const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    port: 8080,
    historyApiFallback: true, 
  },
  publicPath:'/board-api/' 
})
