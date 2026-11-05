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

## 静的化に伴う制限

- お問い合わせフォーム、ログイン、会員登録、パスワード回復、投稿フォームなど、サーバー側の処理が必要な機能は動きません
- サイト内検索は動きません
- 外部サービス（Google Analytics、YouTube 埋め込み、CDN スクリプトなど）は元のURLのまま読み込みます
- 元サイトの CSS が参照している一部の Web フォント（`NotoSansCJKjp-*.woff` など）は、元サーバーでも 404 のため含まれていません
