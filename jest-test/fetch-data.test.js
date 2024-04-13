

const fetchUser = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // テストのためのダミー実装
      if (id === 1) {
        resolve('John Doe');
      } else {
        reject('not found user');
      }
    }, 200);
  });
}

describe('fetchUser', () => {
  // 非同期処理が成功するケース
  test('the data is John Doe', async () => {
    const user = await fetchUser(1);
    expect(user).toBe('John Doe');
  });

  // 非同期処理が失敗するケース
  test('the fetch fails with an error', async () => {
    await expect(fetchUser(2)).rejects.toMatch('not found user');
  });
});
