import { defaultBarColor } from "./animationColors";

export function swap(arr: number[], idx1: number, idx2: number): void {
  [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
}

export const singleBarClassName = "single-bar";

export function getAllArrayBars() {
  const bars = document.getElementsByClassName(singleBarClassName);
  return bars;
}

export function handleResetColors() {
  const bars = getAllArrayBars();
  for (let i = 0; i < bars.length; i++) {
    // @ts-ignore
    bars[i].style.backgroundColor = defaultBarColor;
  }
}

export function colorAllBars() {
  const bars = getAllArrayBars();
  for (let i = 0; i < bars.length; i++) {
    // @ts-ignore
    bars[i].style.backgroundColor = sortedColor;
  }
}
