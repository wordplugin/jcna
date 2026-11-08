# jcna — 日本カーボンニュートラル協会 サイトの静的コピー

https://www.jcna.or.jp/ （WordPress）を 2026-11-05 時点で取得し、GitHub Pages で配信できる静的HTMLに変換したものです。

## GitHub Pages の公開手順

1. リポジトリの **Settings → Pages** を開く
2. **Source** を「Deploy from a branch」にし、公開したいブランチ（例: `main`）と `/ (root)` を選んで保存

`https://<owner>.github.io/jcna/` のようなサブパスでも表示できるよう、サイト内のリンクはすべて相対パスにしてあります。`.nojekyll` を置いているので、Jekyll の処理は行われません。

## 変換内容

- `wget --mirror` で、サイトマップに載っている全ページ（固定ページ・ブログ記事・お知らせ）と CSS / JS / 画像 / PDF を取得
- 同じサイトへの絶対URL（`https://www.jcna.or.jp/...`）を相対パスに置き換え
- `?ver=` 付きのアセットは `@ver=` に置き換えたファイル名で保存
- WordPress の動的エンドポイント（wp-json, oEmbed, xmlrpc, RSS フィード, shortlink）への `<link>` を削除
- グローバルナビの「表示中ページ」ハイライト（`c-gnav__link current`）を各ページの HTML に直接付与。元サイトの JS は絶対パスのリンクを前提に判定しているため、相対パスにした静的版では効かないため。対応: 団体概要=`outline/`、普及活動=`activity/` `lecture/`、JCN大賞=`award/`、カーボンニュートラル・アドバイザー=`cn/`、記事=`blog/` `news/`、お問い合わせ=`contact/`

## 表示速度のための調整

- 各ページの CSS（`wp-content/cache/autoptimize/css/*.css` と `wp-content/themes/jcna/css/static-fixes.css`）は HTML の `<style>` に埋め込んでいます（レンダリングブロックの解消）。CSS を直すときは、元の CSS ファイルではなく各 HTML の `<style>` を編集してください。
- 使っていない WordPress の絵文字スクリプト（wp-emoji）と郵便番号検索（AjaxZip3）は読み込みをやめています。
- Elfsight のカレンダー（`platform.js`）は、ページの読み込み完了後、ウィジェットが画面に近づいたとき、またはスクロール・タップなどの操作があったときに読み込みます。
- 画像は WebP 版（同名の `.webp`）を表示に使っています。画像を差し替えるときは WebP も作り直してください。
- 日本語フォントは `*-core`（サイトで使っている文字）と `*-ext`（それ以外）に分けてあり、ページは通常 core だけを読み込みます。core にない文字は ext から自動で読み込まれます。

## 静的化に伴う制限

- ログイン、会員登録、パスワード回復、投稿フォームなど、WordPress のサーバー処理が必要な機能は動きません
- お問い合わせフォーム（`/contact/`、`/cn/`、`/lecture/`）は Google フォームの埋め込みなので、静的サイトでもそのまま送信できます
- サイト内検索は動きません
- 外部サービス（Google Analytics、YouTube 埋め込み、CDN スクリプトなど）は元のURLのまま読み込みます
- 元サイトの CSS には、存在しないフォントファイル（`css/fonts/` 以下など、元サーバーでも 404）を指す `@font-face` がありました。表示を遅らせるだけなので削除しています
