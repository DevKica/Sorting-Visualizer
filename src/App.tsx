import sleep from "./utils/sleep";
import sortingAlgorithms from "./sortingAlgorithms";
import SortingVisualizer from "./components/SortingVisualizer";
import { useState, useEffect } from "react";
import { COMPARE, SORTED, sortingFunction, SWAP } from "./@types/main";
import { getAllArrayBars, handleResetColors } from "./utils/arrays";
import { compareColor, defaultBarColor, sortedColor, swapColor } from "./utils/animationColors";

const maxLen = 100;
const max = 100;
const min = 5;

const App = () => {
  const [arr, setArr] = useState<number[]>([]);
  const [len, setLen] = useState<number>(10);
  const [ongoing, setOngoing] = useState<boolean>(false);

  const [showNumbers, setShowNumbers] = useState<boolean>(true);
  const [animationTime, setAnimationTime] = useState<number>(10);

  const animationSleep = async () => {
    await sleep(animationTime);
  };

  const handleResetArray = () => {
    let actualLen = len;
    if (len > maxLen) actualLen = maxLen;
    const newArray = Array.from({ length: actualLen }, () => Math.floor(Math.random() * (max - min)) + min);

    setArr(newArray);
    setLen(actualLen);
    setOngoing(false);

    handleResetColors();
  };

  const handleSort = async (fn: sortingFunction) => {
    handleResetColors();

    const { result, animations } = fn(arr);

    for (let i = 0; i < animations.length; i++) {
      const animation = animations[i];
      const bars = getAllArrayBars();

      const opr = animation[0];
      //@ts-ignore
      const bar1 = bars[animation[1]];
      //@ts-ignore
      const bar2 = bars[animation[2]];

      switch (opr) {
        case COMPARE:
          bar1.style.backgroundColor = bar2.style.backgroundColor = compareColor;
          break;
        case SWAP:
          bar1.style.backgroundColor = bar2.style.backgroundColor = swapColor;
          break;
        case SORTED:
          bar1.style.backgroundColor = sortedColor;
          continue;
        default:
          break;
      }

      await animationSleep();

      if (opr === SWAP) {
        const { height: height1 } = bar1.getBoundingClientRect();
        const { height: height2 } = bar2.getBoundingClientRect();

        bar1.style.height = `${height2}px`;
        bar2.style.height = `${height1}px`;

        let temp = bar1.innerHTML;
        bar1.innerHTML = bar2.innerHTML;
        bar2.innerHTML = temp;
      }
      await animationSleep();
      bar1.style.backgroundColor = bar2.style.backgroundColor = defaultBarColor;
      await animationSleep();
    }
    setArr(result);
  };

  useEffect(() => {
    handleResetArray();
  }, [len]);

  return (
    <div className="max-h-screen h-screen w-full overflow-x-hidden flex flex-col relative p-2">
      <header className="flex flex-row justify-center flex-wrap gap-1">
        <button onClick={handleResetArray} className="main-btn">
          New array
        </button>
        <button className="main-btn" onClick={() => setShowNumbers(!showNumbers)}>
          {showNumbers ? "Hide" : "Show"} numbers
        </button>
        {sortingAlgorithms.map((e, key) => (
          <button
            key={key}
            onClick={async () => {
              await handleSort(e.fn);
            }}
            className="main-btn"
          >
            {e.name}
          </button>
        ))}
        <div className="main-btn">
          <span>Animation time - {animationTime}ms</span>
          <input
            type="range"
            min="0.01"
            max="1000"
            step="0.01"
            value={animationTime}
            onChange={(e: any) => setAnimationTime(e.target.value)}
          />
        </div>
        <div className="main-btn">
          <span>Array length - {len}</span>
          <input type="range" min="2" max="100" value={len} onChange={(e: any) => setLen(e.target.value)} />
        </div>
      </header>
      <SortingVisualizer array={arr} max={max} showNumbers={showNumbers} />
      <footer className="mt-auto">footer</footer>
    </div>
  );
};

export default App;
