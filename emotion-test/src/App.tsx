type Props = {
  width: number;
  height: number;
};

const Box = ({ width, height }: Props) => {
  return (
    <div
      css={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: 'lightblue',
      }}
    />
  );
};

function App() {
  return (
    <>
      <Box width={100} height={100} />
      <Box width={110} height={80} />
      <Box width={30} height={50} />
    </>
  )
}

export default App
