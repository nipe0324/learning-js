<!-- omit in toc -->
# Hello TypeScript

TypeScriptの設計目標は以下の通り

- [ローカル環境セットアップ](#ローカル環境セットアップ)
- [型](#型)
  - [Primitive Types](#primitive-types)
  - [Union Types](#union-types)
  - [リテラル型](#リテラル型)
  - [型エイリアス](#型エイリアス)
  - [オブジェクト型](#オブジェクト型)
  - [関数と型](#関数と型)
  - [配列と型](#配列と型)
- [インターフェイス](#インターフェイス)
  - [型エイリアス vs インターフェイス](#型エイリアス-vs-インターフェイス)
  - [インターフェイスの拡張](#インターフェイスの拡張)
  - [インターフェイスのマージ](#インターフェイスのマージ)
- [アサーション](#アサーション)
  - [型アサーション（型キャスト）](#型アサーション型キャスト)
  - [constアサーション](#constアサーション)
- [その他](#その他)
  - [宣言ファイル](#宣言ファイル)

## ローカル環境セットアップ

Install TypeScript

```bash
npm i -g typescript

# TypeScript Compiler
tsc --version
```

Create ts config file

```bash
# Create tsconfig.json
tsc --init
```

Compile

```bash
tsc index.ts
```

## 型

### Primitive Types

- null
- undefined
- boolean
- string
- number
- bigint
- symbol

### Union Types

```ts
// | で複数の型を指定できる
let mathematician: string | undefined
```

### リテラル型

```ts
// プリミティブ型の特定の値として理解される
let state: 'success' | 'failure' = 'success'
state = 'hoge'; // type error
```

### 型エイリアス

```ts
// typeキーワードで型に別名をつけることができる
type RawData = boolean | number | string | null | undefined;

let rawDataFirst: RawData;
let rawDataSecond: RawData;
```

### オブジェクト型

```ts
// { } でオブジェクト型を定義できる
let poetLater: {
    born: number,
    name: string
};

poetLater = { born: 1564, name: 'Shakespeare' };

// オブジェクト型に型エイリアスが利用できる
type Poet = {
    born: number,
    name: string
};

let poetLater: Poet;

// 補足：interfaceキーワードを使う方法もある
interface Poet {
    born: number;
    name: string;
}

let poetLater: Poet;

// オプションプロパティは?を使うことで省略可能なプロパティであると定義できる
type Book = {
    author?: string;
    pages: number;
};

let missingAuthorBook: Book = { pages: 100 };

// オブジェクト型のユニオン型
type PoemWithPages = {
    name: string;
    pages: number;
};

type PoemWithRhymes = {
    name: string;
    rhymes: number;
};

type Poem = PoemWithPages | PoemWithRhymes;

let poem: Poem = { name: 'The Red Wheelbarrow', pages: 1 };

if ("pages" in poem) {
    poem.pages;
}
```

### 関数と型

```ts
// 関数の引数や戻り値に型を指定できる
function announceSong(song: string, singer?: string): void {
    console.log(`Song: ${song}`);

    if (singer) {
        console.log(`Singer: ${singer}`);
    }
}

// デフォルト値も指定できる
function rateSong(song: string, rating = 0) {
    console.log(`${song} gets ${rating}/5 stars!`);
}

// ...でレストパラメーターを指定できる
function singAllTheSongs(singer: string, ...songs: string[]) {
    songs.forEach(song => {
        announceSong(song, singer);
    });
}

singAllTheSongs("Alicia Keys");
singAllTheSongs("Lady Gaga", "Bad Romance", "Just Dance", "Poker Face");

// 呼び出し元に値を返さない場合はvoid
const songLogger = (song: string): void => {
    console.log(`Now playing: ${song}`);
}

// 呼び出し元に処理を返さない場合はnever
// 常にエラーをスローしたり、意図した無限ループなどの実行する関数の場合使う
const alwaysThrows = (): never => {
    throw new Error("I always throw");
}
```

### 配列と型

```ts
// 配列の型は要素の型に[]をつける
// クラスジェネリックと呼ばれる、Array<number>という書き方もできる
let arrayOfNumbers: number[] = [1, 2, 3];

// スプレッド演算子で配列同士を結合できる
// (number | string)[]
const conjoined = [...arrayOfNumbers, ...arrayOfStrings];
```

## インターフェイス

### 型エイリアス vs インターフェイス

- 割当可能性チェックやエラーメッセージはだいたい同じ
- インターフェイスのみの機能
  - インターフェイスはマージして拡張できる。サードパーティコードを扱う際に便利
  - クラス宣言の構文に使える
  - TypeScriptの型チェッカーでより高速に処理できる。内部的に簡単にキャッシュができるらしい

```ts
// インターフェイス
interface Poet {
    born: number;
    name: string;
}

// 型エイリアス
type Poet = {
    born: number;
    name: string;
}
```

### インターフェイスの拡張

```ts
// extendでインターフェイスを拡張できる
interface Writing {
    title: string;
}

interface Novella extends Writing {
    pages: number;
}

let myNovella: Novella = {
    title: "The Metamorphosis",
    pages: 100,
};
```

### インターフェイスのマージ

```ts
// 2つの同じスコープ内で、同じ名前を使って宣言されている場合に、インターフェイスがマージされる
interface Merged {
    foo: string;
}

interface Merged {
    bar: number;
}

// 以下のようになる
// interface Merged {
//    foo: string;
//    bar: number;
// }
```

## アサーション

### 型アサーション（型キャスト）

- 型アサーション、もしくは、型キャストは、型システムによる値の型の解釈を上書きするための構文
- 例外的な避難手段なので、できるだけ使わないようにすべき
- 型チェックがミスって実行時エラーを現在や将来的に起きかねない

```ts
const rawData = `["grace", "frankie"]`;

JSON.parse(rawData); // any型

// asキーワードを使うことで型を上書きできる
JSON.parse(rawData) as string[]; // string[]型
JSON.parse(rawData) as [string, string]; // [string, string]型
JSON.parse(rawData) as ["grace", "frankie"]; // ["grace", "frankie"]型
```

### constアサーション

- `as const`とすることで、変更できない変数を定義することができる

```ts
[0, '']; // (number | string)[]型

[0, ''] as const; // readonly [0, '']型
```

enum構文あるが、23年時点ではenumぽく使いたい場合はオブジェクトを`as const`で使うとよさそう

```ts
const StatusCodes = {
    Ok: 200,
    Unauthorized: 401,
    NotFound: 404,
    Forbidden: 403,
    InternalServerError: 500,
    // ...
} as const;

StatusCodes.Ok; // 200
```

## その他

### 宣言ファイル

- `.d.ts`という拡張子のファイルは宣言ファイル（declaration file）と呼ばれる
- 宣言ファイルはインターフェイス、モジュール、型定義などの宣言のみ
- ランタイムコードを含むことができない
