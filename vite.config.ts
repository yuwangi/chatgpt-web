import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig((env) => {
  const viteEnv = loadEnv(env.mode, process.cwd()) as unknown as ImportMetaEnv

  return {
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), 'src'),
      },
    },
    plugins: [
      vue(),
      VitePWA({
        injectRegister: 'auto',
        manifest: {
          name: 'chatGPT',
          short_name: 'chatGPT',
          icons: [
            { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
            { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          ],
        },
      }),
    ],
    server: {
      host: '0.0.0.0',
      port: 1002,
      open: false,
      proxy: {
        '/chat-web-api': {
          target: viteEnv.VITE_APP_API_BASE_URL,
          changeOrigin: true, // 允许跨域
          rewrite: path => path.replace('/chat-web-api/', '/'),
        },
        '/chat-bing-api': {
          // target: 'http://localhost:3002',
          target: 'http://146.56.142.221:3002',
          // target: 'http://chat.yuwangi.fun:3002',
          changeOrigin: true, // 允许跨域
          rewrite: path => path.replace('/chat-bing-api/', '/'),
        },
        '/proxy-api': {
          // target: viteEnv.VITE_APP_API_BASE_URL,
          // target: 'http://localhost:3002',
          target: 'https://chatbot.theb.ai/api',
          // target: 'http://chat.yuwangi.fun:3002',
          changeOrigin: true, // 允许跨域
          rewrite: path => path.replace('/proxy-api/', '/'),
        },
      },
    },
    build: {
      reportCompressedSize: false,
      sourcemap: false,
      commonjsOptions: {
        ignoreTryCatch: false,
      },
    },
  }
})
