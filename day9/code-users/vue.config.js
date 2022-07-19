module.exports={
  devServer:{
    port:3000,
    // open:true,
    //当前项目在开发调试阶段，会把任何位置请求（没有匹配到静态资源文件的请求）代理到以下地址
    proxy: 'https://www.escook.cn',
  }
}