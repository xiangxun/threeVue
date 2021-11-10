import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import  Path  from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
  resolve:{
    alias:{
      loader: Path.resolve(__dirname,'./src/loader'),
    },
  },
})
