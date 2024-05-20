// 文字列スタイルの場合は、css prop にキャメルケース（camelCase）で記述する
const ObjectStyleButton = () => {
  return (
    <button
      css={{
        backgroundColor: 'hotpink',
        color: 'white',
        padding: '0.5rem 1rem',
        borderRadius: '0.25rem',
        border: 'none',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'lightgreen'
        }
      }}
    >
      Click me
    </button>
  );
};

export default ObjectStyleButton;
