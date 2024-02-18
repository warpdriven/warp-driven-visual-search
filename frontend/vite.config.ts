// Vite Imports
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// NodeJs Imports
import { dirname, resolve } from "node:path";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig((configEnv) => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  void configEnv;

  return {
    plugins: [react()],

    // Path Alias
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },

    // ** CSS
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/scss" as *;`,
        },
      },
      modules: {
        localsConvention: "camelCaseOnly",
      },
    },

    base: "./",
    envDir: resolve(__dirname, "./"),

    build: {
      outDir: resolve(__dirname, "../dist"),
      emptyOutDir: true,

      manifest: false,
      sourcemap: false,

      chunkSizeWarningLimit: 500,

      rollupOptions: {
        input: {
          mainSite: resolve(__dirname, "./src/mainSite.tsx"),
          mainAdmin: resolve(__dirname, "./src/mainAdmin.tsx"),
        },
        output: {
          // manualChunks(id) {
          //   if (id.includes("/pages/admin")) {
          //     return "admin";
          //   }
          // },
          entryFileNames: "warpdriven-recs-[name].js",
          chunkFileNames: "[name]-[hash].js",
          assetFileNames: "[name][extname]",
        },
      },

      target: "modules",
      minify: "esbuild",

      cssTarget: ["es2020", "edge88", "firefox78", "chrome87", "safari14"],
      cssMinify: "esbuild",
      cssCodeSplit: false,
    },

    server: {
      port: 3002,
      strictPort: true,
      hmr: {
        port: 3002,
      },
      proxy: {
        "/wp-admin/admin-ajax.php": {
          target: "https://stg.emutree.com.au",
          rewrite(path) {
            return path;
          },
          changeOrigin: true,
          ws: true,
        },

        "/wp-json/wc/v3": {
          target: "https://stg.emutree.com.au",
          changeOrigin: true,
          ws: true,
        },
      },
    },
  };
});
