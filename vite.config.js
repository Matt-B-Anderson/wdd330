import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig(({ command }) => ({
  root: "src/",
  base: "/",
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        "checkout/index": resolve(__dirname, "src/checkout/index.html"),
        "checkout/success": resolve(__dirname, "src/checkout/success.html"),
        product: resolve(__dirname, "src/product_pages/index.html"),
        product_listing: resolve(__dirname, "src/product_listing/index.html"),
      },
    },
  },
}));
