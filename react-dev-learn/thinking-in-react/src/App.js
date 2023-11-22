import { useState } from 'react';

// 1️⃣ UI階層
//
// FilterableProductTable : contains the entire app.
//  L SearchBar : receives the user input.
//  L ProductTable : displays and filters the list according to the user input.
//    L ProductCategoryRow : displays a heading for each category.
//    L ProductRow : displays a row for each product.

// 2️⃣ stateの設計
//
// データとしては以下が考えられる
// - オリジナルのproductsのリスト
// - ユーザーが入力した検索キーワード
// - チェックボックスの値
// - フィルターされたproductsのリスト
//
// これらのうち、stateとして管理するのはどれ？
// - 時間が経っても変わらないものはstateとして管理しない
// - props 経由で親から渡されるものはstateとして管理しない
// - コンポーネント内で stte や props から計算されるものはstateとして管理しない
//
// 今回の場合、以下のものはstateとして管理してよさそう
// - 検索キーワードは変わる、かつ、計算できないのでstateとして管理してよさそう
// - チェックボックスも変わる、かつ、計算できないのでstateとして管理してよさそう

// 4️⃣ state をどこで持つか決める
//
// state (検索キーワードやチェックボックスの値) を利用するコンポーネントを識別する
// - ProductTable は state にもとづいて products リストを絞り込む
// - SearchBar は state を表示する
//
// 共通の親コンポーネントを見つける
// - FilterableProductTable が最初の共通の親コンポーネント
//
// state を持つコンポーネントを決める
// - FilterableProductTable にする

// mock data
const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}

// contains the entire app.
function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly} />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly} />
    </div>
  );
}

// receives the user input.
function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange
}) {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        placeholder="Search..."
        onChange={(e) => onFilterTextChange(e.target.value) }
      />
      <p>
        <input
          type="checkbox"
          value={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked) }
        />
        {' '}
        Only show products in stock
      </p>
    </form>
  );
}

// displays and filters the list according to the user input.
function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ) {
      return;
    }

    if (inStockOnly && !product.stocked) {
      return;
    }

    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }

    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );

    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  )
}

// displays a heading for each category.
function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
}

// displays a row for each product.
function ProductRow({ product }) {
  const name = product.stocked ? product.name : <span style={{ color: 'red' }}>{product.name}</span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}
