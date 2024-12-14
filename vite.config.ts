import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

export default defineConfig({
  server: {
    open: true, // 自動でブラウザを開く
    port: 3000, // ここでポート番号を指定します
  },
  build: {
    outDir: "build", // ビルドの出力先ディレクトリ
  },
  plugins: [react()],
  resolve: {
    alias: {
      "~public": path.resolve(__dirname, "public"),
    },
  },
});
