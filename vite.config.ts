import path, { resolve } from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import autoprefixer from 'autoprefixer';
import viteImagemin from '@vheemstra/vite-plugin-imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import pluginPurgeCSS from 'vite-plugin-purge';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        entryway: resolve(__dirname, 'index.html'),
        main: resolve(__dirname, 'view/main/index.html'),
        algoritms: resolve(__dirname, 'view/algoritms/index.html'),
        tasks: resolve(__dirname, 'view/tasks/index.html'),
      },
    },
  },
  plugins: [
    checker({
      typescript: true  // Use TypeScript check
    }),
    pluginPurgeCSS({
      content: ['./*.html', './view/**/*.html', '@/**/*.js', '@/**/*.ts']
    }),
    viteImagemin({
      plugins: {
        jpg: imageminMozjpeg(),
        png: imageminPngquant()
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    devSourcemap: true,
    postcss: {
      plugins: [
        autoprefixer,
      ],
    },
  }
})
