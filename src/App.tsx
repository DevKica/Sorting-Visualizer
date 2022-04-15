import { useState, useEffect } from "react";
import sleep from "./utils/sleep";
import sortingAlgorithms from "./sortingAlgorithms";
import SortingVisualizer from "./components/SortingVisualizer";
import { MAX_LEN, MAX_RANGE, MIN_RANGE } from "./utils/constants";
import { animationsType, COMPARE, SHIFT, SORTED, sortingFunction, SWAP } from "./@types/main";
import { compareColor, defaultBarColor, shiftColor, sortedColor, swapColor } from "./utils/animationColors";
import { handleResetColors, getAllArrayBars } from "./utils/arrays";

const App = () => {
  const [arr, setArr] = useState<number[]>([]);
  const [len, setLen] = useState<number>(10);
  const [ongoing, setOngoing] = useState<boolean>(false);

  const [showNumbers, setShowNumbers] = useState<boolean>(false);
  const [animationTime, setAnimationTime] = useState<number>(0);

  const animationSleep = async () => {
    await sleep(animationTime);
  };

  const handleResetArray = () => {
    let actualLen = len;
    if (actualLen > MAX_LEN) actualLen = MAX_LEN;
    const newArray = Array.from(
      { length: actualLen },
      () => Math.floor(Math.random() * (MAX_RANGE - MIN_RANGE)) + MIN_RANGE
    );

    setArr(newArray);
    setLen(actualLen);
    handleResetColors();
  };

  const handleSort = async (fn: sortingFunction) => {
    handleResetColors();
    let result;
    let animations: animationsType = [];
    setOngoing(true);

    ({ result, animations } = fn(arr));

    for (let i = 0; i < animations.length; i++) {
      const bars = getAllArrayBars();
      const animation = animations[i];

      const { opr } = animation;
      const idx1 = animation.idxs[0];
      const bar1: any = bars[idx1];
      const idx2 = animation.idxs[1];
      const bar2: any = bars[idx2];

      switch (opr) {
        case COMPARE:
          bar1.style.backgroundColor = bar2.style.backgroundColor = compareColor;
          break;
        case SWAP:
          bar1.style.backgroundColor = bar2.style.backgroundColor = swapColor;
          break;
        case SHIFT:
          bar1.style.backgroundColor = shiftColor;
          break;
        case SORTED:
          bar1.style.backgroundColor = sortedColor;
          continue;
        default:
          break;
      }
      await animationSleep();

      if (opr === SHIFT) {
        const shiftBar: any = bars[idx2];
        const { height: shiftBarHeight } = shiftBar.getBoundingClientRect();
        const shiftBarContent = shiftBar.innerHTML;

        shiftBar.style.backgroundColor = shiftColor;
        let s_idx = idx2;

        while (s_idx !== idx1) {
          const currentBar: any = bars[s_idx];
          const previousBar: any = bars[s_idx - 1];

          currentBar.style.height = `${previousBar.getBoundingClientRect().height}px`;
          currentBar.innerHTML = previousBar.innerHTML;
          s_idx--;
        }
        await animationSleep();

        //@ts-ignore
        bars[idx1].style.height = `${shiftBarHeight}px`;
        bars[idx1].innerHTML = shiftBarContent;
      }

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

    setOngoing(false);
    setArr(result);
  };

  useEffect(() => {
    handleResetArray();
  }, [len]);

  return (
    <div className="max-h-screen h-screen w-full overflow-x-hidden flex flex-col relative p-2">
      <header className="flex flex-row justify-center flex-wrap gap-1">
        <button onClick={() => setOngoing(false)} disabled={!ongoing} className="main-btn">
          Stop
        </button>
        <button onClick={handleResetArray} disabled={ongoing} className="main-btn">
          New array
        </button>
        <button className="main-btn" disabled={ongoing} onClick={() => setShowNumbers(!showNumbers)}>
          {showNumbers ? "Hide" : "Show"} numbers
        </button>
        {sortingAlgorithms.map((e, key) => (
          <button
            disabled={ongoing}
            key={key}
            onClick={async () => {
              await handleSort(e.fn);
            }}
            className="main-btn"
          >
            {e.name}
          </button>
        ))}
        <div className={`main-btn ${ongoing ? "disabled-btn" : ""}`}>
          <span>Animation time - {animationTime}ms</span>
          <input
            disabled={ongoing}
            type="range"
            min="0"
            max="1000"
            step="0.01"
            value={animationTime}
            onChange={(e: any) => setAnimationTime(e.target.value)}
          />
        </div>
        <div className={`main-btn ${ongoing ? "disabled-btn" : ""}`}>
          <span>Array length - {len}</span>
          <input
            disabled={ongoing}
            type="range"
            min="2"
            max="100"
            value={len}
            onChange={(e: any) => setLen(e.target.value)}
          />
        </div>
      </header>
      <SortingVisualizer array={arr} max={MAX_RANGE} showNumbers={showNumbers} />
      {/* <footer className="mt-auto"></footer> */}
    </div>
  );
};

export default App;
