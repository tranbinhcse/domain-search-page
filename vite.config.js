import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      // script: {
      //   // Kích hoạt TypeScript hoặc JSX parser
      //   // Hoặc sử dụng "jsx" thay vì "typescript"
      //   parser: 'typescript',
      // },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://ote.tino.org/api',
        secure: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Xóa tiền tố /api khi gửi yêu cầu tới API
      },
       
    }
  }
})
