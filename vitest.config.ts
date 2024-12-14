import * as path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // describe, it, expectなどをimportせずに利用できる
    globals: true,
    // ブラウザそのものを動かす（ex. playwright）ではなく、node上でブラウザの動作をエミュレートする実装のひとつがjsdom
    // エミュレートは不完全であり、例えばResizeObserverなどは使えない
    // 別の実装にhappy-domというのもあり、より軽量でエミュレートの精度が低い
    // またvitestにはbrowser modeがあり、playwrightなどのドライバを指定して、実際の（ヘッドレス）ブラウザでテストを実行する
    // 実行コストは高いが、より正確なテストを実行したい場合のオプションとなる
    // （2024-12時点でexperimental）
    environment: "jsdom",
    css: true, // これで css modules が動作する
  },
  resolve: {
    alias: {
      // パスの解決はtsconfig for 言語サーバ、vite config for ビルド、vitest config for テストの3つにそれぞれ記載が必要みたい
      "~public": path.resolve(__dirname, "public"),
    },
  },
});
