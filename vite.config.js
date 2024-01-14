import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'esnext',
    outDir: 'docs',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        header: resolve(__dirname, 'src/components/header.html'),
        footer: resolve(__dirname, 'src/components/footer.html'),
        login: resolve(__dirname, 'src/pages/login/index.html'),
        cart: resolve(__dirname, 'src/pages/cart/index.html'),
        productList: resolve(__dirname, 'src/pages/productList/index.html'),
        signUp: resolve(__dirname, 'src/pages/signUp/index.html'),
      },
    },
  },
});
