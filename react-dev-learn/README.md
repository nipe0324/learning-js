https://react.dev/learn (2023/11)
---

## Quick Start

### Tic Toc Toe

https://react.dev/learn/tutorial-tic-tac-toe

### Thinking in React

https://react.dev/learn/thinking-in-react

- 1️⃣ UIをコンポーネント階層に分割する
- 2️⃣ Reactで静的なバージョンを構築する
- 3️⃣ UIの最小限かつ完全なstateを探す
- 4️⃣ state をどこで持つか決める
- 5️⃣ データフローを追加する

## Installation

### Using TypeScript

https://react.dev/learn/typescript

### Editor Setup

- Linting : ESLintは人気
  - https://www.npmjs.com/package/eslint-config-react-app
  - https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
- Formatting : Prettier 
  - https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

## Learn React

### Describing the UI

Reactコンポーネントの作成、カスタマイズ、条件で表示する方法を学ぶ

https://react.dev/learn/describing-the-ui

#### Your First Component

1. Export the component
2. Define the function
3. Add markup

⚠: 各コンポーネントはトップレベルで定義する。コンポーネント内にネストして定義すると遅かったりバグの原因になる
```js
export default function Gallery() {
  // 🔴 Never define a component inside another component!
  function Profile() {
    // ...
  }
  // ...
}
```

#### Importing and Exporting Components

- default export
 - `export default function MyComponent() { ... }`
 - `import MyComponent from './MyComponent';`
- named export
 - `export function MyComponent() { ... }` 
 - `import { MyComponent } from './MyComponent';`
  - 

#### Writing Markup with JSX

- JSXは、JavaScriptファイル内でHTML風のマークアップが書けるJavaScriptの拡張構文
- HTML, CSS, JSをファイル分けしていた。しかし、Webがインタラクティブになるほどコンテンツはロジックにより決定されるようになってきた。
- JSがHTMLに責任を持つようになったので、Reactではレンダリングロジックとマークアップをコンポーネントとして同じ場所に配置した。

The Rules of JSX
1. Return a single root element. 余分な`div`を省略したい場合は`<>...</>`が使える
2. Close all the tags. `<img>`や`<input>`などのタグも必ず`/`で閉じる
3. camelCase most of the things. `class`は`className`、`tabindex`は`tabIndex`など

#### JavaScript in JSX with Curly Braces

Where to use curly braces 

1. JSXタグの内側のテキスト。`<h1>{name}'s To Do List</h1>`、しかし`<{tag}>Hello World</{tag}>`はうまくいかない
2. `=`のあとの属性。 `src={avatar}`

#### Passing Props to a Component

```js
function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}
```

Specifying a default value for a prop 

`size` propsがなかったり、`size={undefined}` の場合に利用できる。注意点として`size={null}`や`size={0}`のときはデフォルト値が利用されない

```js
function Avatar({ person, size = 100 }) {
  // ...
}
```

Forwarding props with the JSX spread syntax

 `...`を利用すると、propsをそのまま渡すことができる

```js
function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}
```

Passing JSX as children 

`children`と呼ばれるprops内で渡すことができる。パネルやグリッドなどビジュアルラッパーには`children`プロップをよく利用する

```js
function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}
```

How props change over time 

- propsは読み取り専用。毎回のレンダーで新しいバージョンのpropsが渡される
- propsは変更できない。インタラクティブにしたい場合は、stateを利用する

#### Conditional Rendering

- コンポーネントで`null`を返すと、そのコンポーネントはレンダリングされない。しかし、開発者を驚かせてしまうので呼び出し元でレンダリングするかどうかを選ぶのが良い
- 三項演算子(`? :`)やAND演算子(`&&`)がショートカットとして利用できる。
- AND演算子(`&&`)の注意点として`0`は`false`として扱われるので、`0 && <p>hoge</p>`などにならないように注意する

#### Rendering Lists

- `filter()`と`map()`してフィルターや変換を行ってから配列をレンダリングする

```js
// filter()を使って絞り込み
const chemists = people.filter(person => person.category === 'Chemist');

// map()を使って変換
const listItems = people.map(person => <li>{person}</li>);
```

- 各配列の要素にユニークな`key`を指定する
  - `key`はstringかnumberで他の配列の要素に対して一意になるようにする
  - Rules of keys
    - `key`は兄弟間でユニークにする必要がある。しかし、他のJSXノードで同じキーは問題ない
    - `key`は変更してはいけない。レンダリング中に生成してはいけない
  - Why does React need keys? 
    - Reactがライフサイクル全体で要素を追跡するために必要
    - 配列内のポジションよりも多くの情報を得ることができる
    - 例えば、配列の要素を並び替えたり、フィルターしたりするときに利用できる。

#### Keeping Components Pure

- Reactは純粋関数の概念に基づいて設計されている。
  - Reactはコンポーネントが純粋関数として想定している
  - つまり、Reactのコンポーネントは同じインプットから常に同じJSXを生成する
  - 純粋関数の特性
    - 呼ばれる前に存在していたオブジェクトや変数を変更しない
    - 常に同じ入力を与えると同じ結果を返す
  - 純粋関数の利点
    - コンポーネントをサーバーなど異なる環境で動かすことができる
    - コンポーネントのレンダリングをスキップできる。これはキャッシュを安全に取り扱えるため
- 意図しない副作用の検出
  - `React.StrictMode`で副作用を検出できる
  - 本番環境で影響しないのでパフォーマンス悪化はしない
- 副作用を引き起こす可能性がある場所
  - Reactでは副作用はイベントハンドラー内で起こる
  - イベントハンドラーはボタンのクリックなどアクションを起こすと発生する
  - イベントハンドラーはレンダリング中に動かないため純粋である必要はない

#### Understanding Your UI as a Tree

- Reactはツリー構造でコンポーネントの構造を実現している
- ブラウザはHTML(DOM)とCSS(CSSOM)をツリー構造として扱っている
- Reactもコンポーネント間の関連をツリー構造で扱っている

### Adding Interactivity

https://react.dev/learn/adding-interactivity

### Managing State

https://react.dev/learn/managing-state

### Escape Hatches

https://react.dev/learn/escape-hatches
