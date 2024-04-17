import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/test-page2',
  css: {
    preprocessorOptions: {
      less: {
        modifyVars:{
          // 'size-8': '42px',
          // 'arcoblue-6': '#f85959',  
          // "menu-dark-bg": '#000',        
        },
        javascriptEnabled: true,        
      }
    }
  },
  build: {
    // sourcemap: true,
  },
  define: {
    'import.meta.env': import.meta.env,
  },
  plugins: [
    vue({}),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://api.tino.vn',
        secure: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Xóa tiền tố /api khi gửi yêu cầu tới API
      },
       
    }
  }
})
