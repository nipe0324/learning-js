import ChangeName from "./ui/change-name";

export default function Home() {
  return (
    <main>
      <h1>Actions Sample</h1>
      <ChangeName currentName='John' />
    </main>
  );
}
