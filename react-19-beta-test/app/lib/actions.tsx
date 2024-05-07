// 'use server';



// // 非同期のトランジションを実施する関数（Action）
// export async function changeNameAction(
//   _previousState: string,
//   formData: FormData
// ): Promise<string | null> {
//   const newName = formData.get("name") as string;
//   setOptimisticName(newName);
//   const error = await updateNameRequest(newName);
//   if (error) {
//     return error;
//   }
//   updateNameRequest(newName);
//   return null;
// }


// async function updateNameRequest(name: string): Promise<string | null> {

// }
