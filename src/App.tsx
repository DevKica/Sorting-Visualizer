import { useEffect, useState } from "react";
import SortingVisualizer from "./components/SortingVisualizer";

let len = 100;
const maxLen = 100;
const max = 1000;
const min = 5;

const App = () => {
  const [array, setArray] = useState<number[]>([]);

  const handleResetArray = () => {
    if (len > maxLen) len = maxLen;
    const newArray = Array.from({ length: len }, () => Math.floor(Math.random() * (max - min)) + min);
    setArray(newArray);
  };
  useEffect(() => {
    handleResetArray();
  }, []);

  return (
    <div className="max-h-screen h-screen w-full overflow-x-hidden flex flex-col relative p-2">
      <header className="flex flex-row justify-center flex-wrap ">
        <button onClick={handleResetArray} className="bg-blue-300 p-2 border-2 border-black">
          Generate new array
        </button>
      </header>
      <SortingVisualizer array={array} max={max} />
      <footer className="mt-auto">footer</footer>
    </div>
  );
};

export default App;
