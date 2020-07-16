module.exports = {
	// 配置路径别名
	configureWebpack: {
		devServer: {
			disableHostCheck: true,
			// port:8000,
			// proxy: {
			// 	"/distribution": {
			// 		target: "https://shop.hnsqixing.com", //目标接口域名
			// 		changeOrigin: true, //是跨域
			// 		secure: false, //设置支持https协议的代理
			// 		// 设置地址重定向，把程序中/api开头的路径替换成:http://t.yushu.im"
			// 		pathRewrite : {
			// 			"^/distribution" : "" // 设置/api路径重定向
			// 		}
			// 	}
			// }
		}
	}
}
