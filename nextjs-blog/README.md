# nextjs-blog

https://nextjs.org/learn-pages-router/basics/create-nextjs-app

## What Learn?

- Creaate Next.js app
  - `npx create-next-app nextjs-blog --use-npm --example "..."`
- Navigate between pages
  - `pages`ディレクトリ配下にファイルを置くと、自動的にルーティングされる
  - `<Link>`コンポーネントでページ遷移。クライアントサイドナビゲーションで実行される
  - パフォーマンスのため、コード分割、クライアントサイドナビゲーション、本番環境ではプリフェッチ機能がある
- Assets, Metadata, and CSS
  - `public`ディレクトリ配下にファイルを置くと、静的ファイルを配信できる
  - `<Image>`コンポーネントを使うと、画像の最適化ができる（リサイズ、最適化、Lazy Load、WebPなどファイル形式）
  - `<Head>`コンポーネントを使うと、`head`タグを編集できる
  - `<Script>`コンポーネントを使うと、3rd partyスクリプトの取得と実行を最適化できる
  - Next.jsはCSS, CSS Modules, Tailwind CSS, Sass, CSS-in-JSなどをサポートしている https://nextjs.org/docs/pages/building-your-application/styling
  - global CSS は `pages/_app.js` に書く
- Pre-rendering and Data Fetching
  - pre-renderingは、初期ロード時にHTMLを読み込む。そして、Reactコンポーネントを初期化してインタラクティブにする（Hydration）
  - Next.jsはpre-renderingとして、Static GenerationとServer-side Renderingの2つをサポートしている
  - Static Generationはビルド時にHTMLを生成する。`getStaticProps`で外部データを取得できる
  - Server-side Renderingはリクエスト時にHTMLを生成する。`getServerSideProps`で外部データを取得できる

## Development

starts the development server.

```bash
npm run dev
```
