import { useState, useEffect } from "react";
import sleep from "./utils/sleep";
import { COMPARE, SORTED, SWAP } from "./@types/main";
import bubbleSort from "./sortingAlgorithms/bubbleSort";
import SortingVisualizer from "./components/SortingVisualizer";

const maxLen = 100;
const max = 100;
const min = 5;

const App = () => {
  const [array, setArray] = useState<number[]>([]);
  const [arrayLen, setArrayLen] = useState<number>(10);
  const [ongoing, setOngoing] = useState<boolean>(false);
  const [showNumbers, setShowNumbers] = useState<boolean>(true);
  const [animationTime, setAnimationTime] = useState<number>(70);

  const handleResetArray = () => {
    let actualLen = arrayLen;
    if (arrayLen > maxLen) actualLen = maxLen;
    const newArray = Array.from({ length: actualLen }, () => Math.floor(Math.random() * (max - min)) + min);

    setOngoing(false);
    setArrayLen(actualLen);
    setArray(newArray);
  };

  const handleBubbleSort = async () => {
    const { result, animations } = bubbleSort(array);

    for (let i = 0; i < animations.length; i++) {
      const animation = animations[i];
      const bars = document.getElementsByClassName("single-bar");

      const operation = animation[0];
      //@ts-ignore
      const el1 = bars[animation[1]];

      if (operation === SORTED) {
        el1.style.backgroundColor = "green";
        continue;
      }

      //@ts-ignore
      const el2 = bars[animation[2]];

      if (operation === COMPARE) {
        el1.style.backgroundColor = "red";
        el2.style.backgroundColor = "red";
      } else if (operation === "SWAP") {
        el1.style.backgroundColor = "blue";
        el2.style.backgroundColor = "blue";
      }

      await sleep(animationTime);

      if (operation === SWAP) {
        const { height: height1 } = el1.getBoundingClientRect();
        const { height: height2 } = el2.getBoundingClientRect();

        el1.style.height = `${height2}px`;
        el2.style.height = `${height1}px`;

        let temp = el1.innerHTML;
        el1.innerHTML = el2.innerHTML;
        el2.innerHTML = temp;
      }

      await sleep(animationTime);

      el1.style.backgroundColor = "#9CA3AF";
      el2.style.backgroundColor = "#9CA3AF";

      await sleep(animationTime);
    }
    setArray(result);
  };

  useEffect(() => {
    handleResetArray();
  }, [arrayLen]);

  return (
    <div className="max-h-screen h-screen w-full overflow-x-hidden flex flex-col relative p-2">
      <header className="flex flex-row justify-center flex-wrap gap-1">
        <button onClick={handleResetArray} className="main-btn">
          New array
        </button>
        <button className="main-btn" onClick={() => setShowNumbers(!showNumbers)}>
          {showNumbers ? "Hide" : "Show"} numbers
        </button>
        <button
          onClick={async () => {
            await handleBubbleSort();
          }}
          className="main-btn"
        >
          Bubble
        </button>
        <div className="main-btn">
          <span>Animation time - {animationTime}ms</span>
          <input
            type="range"
            min="0.1"
            max="1000"
            step="0.1"
            value={animationTime}
            onChange={(e: any) => setAnimationTime(e.target.value)}
          />
        </div>
        <div className="main-btn">
          <span>Array length - {arrayLen}</span>
          <input type="range" min="2" max="100" value={arrayLen} onChange={(e: any) => setArrayLen(e.target.value)} />
        </div>
      </header>
      <SortingVisualizer array={array} max={max} showNumbers={showNumbers} />
      <footer className="mt-auto">footer</footer>
    </div>
  );
};

export default App;
