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
- Fetching Data
  - APIやDBからデータを取得する
  - デフォルトでは、Next.jsはReact Server Componentを使う
    - `useEffect`や`useState`、データ取得ライブラリではなく`async/await`を使える
    - サーバー上で実行されるので、API層がなくてもDBに直接クエリを実行できる
- Static and Dynamic Rendering
  - Stagic Rendering
    - ビルド時にデータ取得してレンダリングする
    - CDNにキャッシュされるので速い、サーバーロード時間を減らせる、SEOに強くなる
  - Dynamig Rendering
    - ユーザーがリクエストした時にコンテンツをレンダリングする
    - リアルタイムデータ、ユーザー固有のコンテンツ、クッキーやURLパラメータなどのリクエスト時の情報で利用
- Streaming
  - ストリーミングは、ルートをより小さなチャンクに分割し、段階的にストリーミングをするデータ転送技術
  - 特定のデータ取得処理が遅い場合でも、チャンクごとにレンダーするので全体のロード時間を短くできる
  - Next.jsでストリーミングを実装する方法は2つある
  - 1. ページレベルの場合、`loading.tsx`ファイルを使う
    - ページコンテンツのロード時のフォールバックUIを定義できる
    - ユーザーはロードが終わるまではコンテンツを見れない
  - 2. 特定のコンポーネントレベルの場合、`<Suspense>`を使う
    - `<Suspense>`でローディングのコンポーネントを囲む
    - コンポーネント内でデータ取得をするようにする
- Partial Prerendering
  - Partial Prerenderingは、静的部分を先に表示し、動的部分は後から非同期で取得できる
  - experimental future in Next.js 14
  - 静的と動的が混在しているページはいくつもある
  - 例えば、ECの商品ページの場合、商品情報は静的、カートやレコメンと商品は動的
- Adding Search and Pagination
  - Invoiceの検索、use-debounceで検索時のデバウンスを制御
  - Invoideのページネーション
- Mutating Data
  - Server Actionsとは
    - クライアントコンポーネントやサーバーコンポーネトから呼び出すことができる非同期関数を作成し、サーバー上で非同期コードを直接実行できる
    - データを変更するAPIエンドポイントを作成する必要がなくなる
    - POSTリクエスト、暗号化されたクロージャ、厳格な入力チェック、エラーメッセージのハッシュ化、ホスト制限などの技術を通じてセキュリティの安全性を高めている
  - More
    - [How to Think About Security in Next.js](https://nextjs.org/blog/security-nextjs-server-components-actions)
- Handling Errors
  - try-cacheでServer Actionsのハンドリングができる
  - `error.tsx`でエラー時の画面表示ができる
  - `not-found.tsx`で404のエラーハンドリングができる
- Improving Accessibility
  - アクセさびリティとは、障がいのある人も含む誰もが使用できるWebアプリケーションを設計および実装することを指す
  - キーボードナビゲーション、セマンティックHTML、画像、色、ビデオなど多くの領域をカバーする広大なトピック
  - client side validation
