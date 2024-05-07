'use client';

import { useActionState, useOptimistic } from "react";

export default function ChangeName({
  currentName,
}: {
  currentName: string,
}) {
  // リクエスト中にすぐに`optimisticName`を表示する
  // リクエストが失敗すると `currentName`に戻す
  // Doc: https://react.dev/reference/react/useOptimistic
  const [optimisticName, setOptimisticName] = useOptimistic(currentName);

  const [error, submitAction, isPending] = useActionState(
    // 非同期のトランジションを実施する関数（Action）
    async (_previousState: string | null, formData: FormData) => {
      const newName = formData.get("name") as string;
      setOptimisticName(newName);
      const error = await fakeChangeName(newName);
      if (error) {
        return error;
      }
      return null;
    },
    null, // 初期値
  );

  return (
    <form action={submitAction}>
      <p>Your name is: {optimisticName}</p>
      <p>
        <label>Change Name:</label>
        <input type="text" name="name" disabled={currentName !== optimisticName} />
        <button type="submit" disabled={isPending}>Update</button>
      </p>
      {error && <p>{error}</p>}
    </form>
  );
}

async function fakeChangeName(newName: string): Promise<string | null> {
  return new Promise((resolve, reject) => {
    const delay = Math.random() * 3000;
    setTimeout(() => {
      if (newName === "invalid") {
        reject('Error: newName is invalid.');
      } else {
        resolve(null);
      }
    }, 1000)
  });
}
