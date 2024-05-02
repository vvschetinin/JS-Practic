import path from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import autoprefixer from 'autoprefixer';
import viteImagemin from '@vheemstra/vite-plugin-imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import pluginPurgeCSS from 'vite-plugin-purge';
import terser from '@rollup/plugin-terser';

export default defineConfig({
  build: {
    rollupOptions: {
      input: [
        './index.html',
        'view/main/index.html',
        'view/algoritms/index.html',
        'view/tasks/index.html'
      ],
      output: {
        dir: 'dist',
      },
    },
  },
  plugins: [
    checker({
      typescript: true  // Use TypeScript check
    }),
    pluginPurgeCSS({
      content: ['./*.html', './view/**/*.html', './src/**/*.js', './src/**/*.ts']
    }),
    viteImagemin({
      plugins: {
        jpg: imageminMozjpeg(),
        png: imageminPngquant()
      },
    }),
    terser()
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
