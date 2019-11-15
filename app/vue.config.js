module.exports = {
	devServer: {
		port: '8080',
		host: '0.0.0.0',
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:7001',
				ws: true,
				changeOrigin: true
			}
		}
	}
};
