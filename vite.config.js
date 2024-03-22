import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

const path = require('path')

export default defineConfig({
	root: path.resolve(__dirname, 'src'),

	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		}
	},
	server: {
		port: 8101,
	}
});
