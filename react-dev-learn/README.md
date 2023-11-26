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

サマリー

- Reactのコンポーネント
  - UIを宣言的に書く
  - 純粋関数
  - 何が嬉しいか？
- useState
- useReducer
  - useStateとuseReducerの比較
  - reducerをうまく書く
  - https://react.dev/learn/extracting-state-logic-into-a-reducer
- useContext
  - contextを使用する前に
  - コンテキストのユースケース
  - https://react.dev/learn/passing-data-deeply-with-context
- useEffect

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

#### Responding to Events

- JSXにイベントハンドラーを追加することで、ユーザーのアクションに応答することができる
- propsとしてイベントハンドラーを渡すこともできる

```js
export default function App() {
  return (
    <Toolbar
      onPlayMovie={() => alert('Playing!')}
      onUploadImage={() => alert('Uploading!')}
    />
  );
}

function Toolbar({ onPlayMovie, onUploadImage }) {
  return (
    <div>
      <Button onClick={onPlayMovie}>
        Play Movie
      </Button>
      <Button onClick={onUploadImage}>
        Upload Image
      </Button>
    </div>
  );
}

function Button({ onClick, children }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}
```

- Event propagation
  - イベントはツリーの上に向けて伝播する
  - `e.stopPropagation();`でイベントの伝播を止めることができる

#### State: A Component's Memory

- コンポーネントはよくインタラクションの結果として画面の状態を変更する必要がよくある
- その場合に `useState`フックをつかって、コンポーネントに state を追加できる
- `useState`フックは、初期値の設定、現在の値と値を更新する関数を返す
- 慣例として`useState`の変数名は、`const [something, setSomething]`のようにする。プロジェクト間で理解しやすくなる。
- state はコンポーネントのインスタンスでプライベート。同じコンポーネントをレンダリングしても、それぞれの state は独立している

```js
const [showMore, setShowMore] = useState(false);
```

#### Render and Commit

- コンポーネントが画面に表示される前に、Reactによりレンダーが呼ばれる
- このプロセスを理解することで、コードがどのように実行され、振る舞うかを考えることができる

UI trhee steps

1. Trigger : Reactのレンダーをトリガーする
  - 以下2ケースでレンダーがトリガーされれる
  - コンポーネントの初期レンダーとき
  - steteが更新されたとき
2. Render : Reactはコンポーネントを呼び出して、画面に何を表示するか決定する
  - レンダリングとはReactがコンポーネントを呼び出すこと
  - コンポーネントはツリー構造になっているので、レンダーは再帰的に呼び出される
  - 初期レンダーの場合、Reactはルートコンポーネントを呼び出す
  - 再レンダーの場合、stateが更新されたコンポーネントを呼び出して、差分を計算する
3. Commit : ReactはDOMに変更を反映する

  - ReactはDOMを直接変更するのではなく、変更をバッファリングしてから一度に変更する
  - これにより、パフォーマンスが向上する
  - 初期レンダーの場合、Reactは`appendChild()` DOM APIを使いすべてのDOMノードを作成する
  - 再レンダーの場合、Reactは必要最小限の変更（レンダー時に計算された）をDOMに反映する

#### State as a Snapshot

- 通常のJavaScriptの変数とは異なり、state はスナップショットのように振る舞う
  - stateを更新することで、再レンダーがトリガーされる
  - Reactはstateをコンポーネントの齟齬側で保持する
  - `useState`を使うと、Reactはレンダーのためにstateのスナップショットを提供する
- state を変更してもそのレンダー中には値は変わらず、再レンダリングがトリガーされて値が変わる

#### Queueing a Series of State Updates

- stateの値を設定うすろと他のレンダーがキューされる
- Reactはイベントハンドラー内のすべてのコードが実行されるまでstateの更新を待つ
- バッチ処理と知られ、パフォーマンス向上や中途半端なレンダーを防ぐことができる

stateを更新する関数の引数の命名規則

- 関数の引数に対応するstateの値の最初の一文字を設定するのが一般的
- 冗長だが、完全な変数名やプレフィックスをつけるなどの別の一般的な方法もある

```js
setEnabled(e => !e);
setLastName(ln => ln.reverse());
setFriendcount(fc => fc * 2);

// 冗長だが、完全な変数名やプレフィックスをつけるなどの別の一般的な方法もある
setEnabled(enabled => !enabled);
setEnabeld(prevEnabled => !prevEnabled);
```

#### Updating Objects in State

- state は Obujectを含むあらゆる型のJavaScriptの値を保持できる。
- しかし、直接オブジェクトや配列を変更すべきではない。
- 代わりに、既存のオブジェクトや配列をコピーして新しい値を作成してから、その値で state を更新する
- `...` スプレッド構文を利用すると、オブジェクトや配列をコピーすることができる

```js
setPerson({
  ...person, // 古いフィールドをコピー
  firstName: e.target.value // firstNameのみオーバーライドする
})

// オブジェクトがネストしているケース
setPerson({
  ...person,
  address: {
    ...person.address,
    city: e.target.value
  }
})
```

Reactでミュータブルなstateが推奨されていない理由

- デバッグ：過去のレンダーでの変更を追跡するのは難しくなる
- 最適化：Reactの最適化戦略で変更があったかどうかを判断するのは難しくなる（`prevObj === obj` で変更があったか確認できなくなる）
- 新機能：stateをスナップショットのように扱うことを前提にReactの新機能を作っているので、新機能が使えなくなる可能性がでてくる
- シンプルな実装：ミュータブルなstateをサポートするためにコードが複雑になってしまう

#### Updating Arrays in State

- 配列はミュータブルなJavaScriptのオブジェクト
- state内の配列はオブジェクトと同じように読み取り専用（イミュータブル）として扱うべき

イミュータブルな配列操作

- 追加
  - Good: `concat`, `[...arr]`
  - Bad: `push`, `unshift`
- 削除
  - Good: `filter`, `slice`
  - Bad: `pop`, `shift`, `splice`
- 変換
  - Good: `map`
  - Bad: `splice`, `arr[i] =`
- 並び替え
  - Good: `[...arr]`などで先に配列をコピーしてから並び替え
  - Bad: `reverse`, `sort`

```js
// 配列に追加
setArtists([
  ...artists, // 古い配列をコピー
  { id: nextId++, name: name }
]);

// 配列から削除
setArtists(
  artists.filter(artist => artist.id !== id)
);
```

### Managing State (Intermediate)

https://react.dev/learn/managing-state

#### stateを使ってインプットに応答する

- コンポーネントでstateを使うことでUIを宣言的に書く
- ユーザー入力に応答するためにstateを使う

#### stateの構造を選ぶ

- stateを適切に構造化すると、変更やデバッグがしやすいバグが発生しづらいコンポーネントになる
- 最も重要な原則は、stateに冗長または重複した情報を含めるべきではない

#### コンポーネント間のstateの共有

- 一般的に行われる対応方法の1つとして、stateのリフトアップ（stateを最も近い共通の親に移動して、props経由で値を渡すこと）を行う

#### stateの保存とリセット

- Reactは、UIツリー内のコンポーネントの一に基づいてどの、stateがどのコンポーネントに属しているか追跡する
- UIツリー内の同じ位置の同じコンポーネントはstateを保持する。別のノードがレンダーされたら破棄されるので、stateもリセットされる
- サブツリーに別のキーを与えることで、サブツリーの状態を強制的にリセットできる

#### state更新ロジックをReducerに抽出する

- コンポーネントが複雑になるにつれて、stateが更新されるさまざまな方法をすべて一目で確認することが難しくなることがある
- レンダリング中に呼ばれるので、reducerは純粋関数（副作用がない）でなければならない
- stateの複数要素を更新する場合でも単一のユーザー操作を表すようにする

```js
function TaskApp() {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);

  function handleAddTask(text) {
    dispatch({ type: 'added', id: nextId++, text });
  }
  
  ...

  return (
    <>
      <h1>Task App</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  )
}

function taskReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [...tasks, { id: action.id, text: action.text, completed: false }];
    }
    case 'toggled': {
      return tasks.map(task => {
        if (task.id === action.id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
    }
    case 'deleted': {
      return tasks.filter(task => task.id !== action.id);
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
```

#### contextでデータを渡す

- 通常、propsを使って親から子のコンポーネントへデータを渡す
- 途中で多くのコンポーネントを介する場合やアプリ内の多くのコンポーネントが同じデータを必要とする場合は、propsの受け渡しは冗長になる可能性がある
- contextを使用すると、明示的にpropsで渡さなくてもツリー配下のコンポーネントでデータを利用できるようになる

```js
// contextを作成
const LevelContext = createContext(1);

// contextを利用する
function Heading({ children }) {
  const level = useContext(LevelContext);

  switch (level) {
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      // ...
    default:
      throw Error('Unknown level: ' + level);
  }
}

// contextを提供する
function Section({ level, children }) {
  const level = useContext(LevelContext);

  return (
    <section className="section">
      <LevelContext.Provider value={level + 1}>
        {children}
      </LevelContext.Provider>
    </section>
  )
}

function Page() {
  return (
    <Section>
      <Heading>Title</Heading>
      <Section>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Section>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
        </Section>
      </Section>
    </Section>
  )
}
```

- contextを使う前に...
  - propsを渡すところから初めてみる
    - コンポーネント間で多くのpropsを渡すことは珍しいことではない。
    - 面倒かもしれないが、コンポーネントがどのデータを使用しているかが非常に明確になるのでpropsを使い続けるのは悪くない
  - コンポーネントを抽出し、`children`を渡す
    - 中間コンポーネントの抽出を忘れてしまったケースかもしれない
    - 例えば、`<Layout posts={posts} />`の代わりに、`<Layout><Posts posts={posts} /></Layout>`とする
- contextのユースケース
  - テーマ設定: ダークモードなどユーザーが外観を変更できる場合、contextを使うとすべてのコンポーネントでテーマを利用できる
  - 現在のアカウント: 多くのコンポーネントは、現在ログインしているユーザーを知る必要がある。context内に配置すると、ツリー内のどこからでも読みやすくなる。
  - ルーティング: ほとんどのルーティングでは内部でcontextを使用して現在のルートを保持している
  - stateの管理: アプリが成長するにつれて、アプリの上部近くに多くのstateが存在するようになる可能性がある。遠く離れたコンポーネントはこのstateを変更する必要がでてきて、手間がかかる。contextとreducerを併用するのが一般的。

#### reducerとcontextによるスケールアップ

- reducerとcontextを組み合わせることで、複雑な画面の状態を管理できる
  - stateと`dispatch()`を返すそれぞれ返すcontextを作成する
  - reducerを使用するコンポーネントから両方のcontextを提供する
  - contextを読み取る必要があるコンポーネントからいずれかのcontextを使用する

### Escape Hatches (Advanced)

https://react.dev/learn/escape-hatches
