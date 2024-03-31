## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.


### Development

```sh
# intall packages
npm i

# start the development server
npm run dev

# launch the browser
open http://localhost:3000
```

### Learning Memo

- CSS Styling
  - global.css
  - CSS in module : コンポーネントにcssを閉じ込めれるのでcssのコンフリクト防げる
  - clxs : 条件付きのcssを追加できる
- Optimizing Fonts and Images
  - `next/font`モジュールはビルド時にフォントファイルをダウンロードし静的ファイルとして配信するのでパフォーマンスを最適化をできる
  - `Image`コンポーネントでイメージの最適化ができる
    - レイアウトシフトを自動で防ぐ
    - デバイスのViewPortに応じて画像をリサイズする
    - デフォルトで遅延ロードをする
    - ブラウザがサポートしていればWebPやAVIFなどのモダンな形式で画像を配信する
  - More
    - [Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
    - [Font Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- Creating Layouts and Pages
  - Next.jsはファイルシステムルーティングを利用している
    - ex. app/dashboard/invoices -> /dashaobrd/invoices/page.tsx
  - 複数のページでレイアウトを共通化したいときに`layout.tsx`を作成する
    - 自動的にネストされた各ページに反映される
    - レイアウトを使うことで、ページコンポーネントだけレンダーされる（パーシャルレンダリング）
- Navigating Between Pages
  - `Link`コンポーネントを利用する
    - `a`タグだと各ページ遷移時にページ全体が更新される
    - ルートのセグメントによって、自動的にコード分割をする
    - コード分割はページごとで独立していることを意味し、ページでエラーが起きても他の部分には影響を与えない
    - また、productionだとバックグラウンドでプレフェッチをする。そのため、リンクを押しさ時にすぐに画面が遷移する
  - More
    - [How Routing and Navigation Worls](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#how-routing-and-navigation-works)
- Setting up Your Database
  - Vercelでpostgresを作成
  - ローカルからVercel Postgresに接続し、シードデータを投入
  - Vercel上でPostgresにSQLを実行できる
