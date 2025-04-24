import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@/components': path.resolve(__dirname, './src/components'),
			'@/hooks': path.resolve(__dirname, './src/components/hooks'),
			'@/services': path.resolve(__dirname, './src/services'),
			'@/internal-components': path.resolve(__dirname, './src/components'),
			'@/prod-components': path.resolve(__dirname, './src/components/error-boundary')
		},
	},
	server: {
		port: 3000,
		proxy: {
			'/api': {
				target: 'http://localhost:8000',
				changeOrigin: true,
			},
		},
	},
});
