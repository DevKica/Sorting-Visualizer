import { swap } from "../utils/arrays";
import { animationsType, COMPARE, SORTED, SWAP } from "../@types/main";

function insertionSort(arr: number[]) {
  const animations: animationsType = [];
  const result = [...arr];

  for (let i = 1; i < result.length; i++) {
    let j = i;
    animations.push({ opr: COMPARE, idxs: [j - 1, j] });
    while (j >= 0 && result[j - 1] > result[j]) {
      swap(result, j, j - 1);
      animations.push({ opr: SWAP, idxs: [j, j - 1] });
      j--;
    }
  }
  for (let i = 0; i < result.length; i++) animations.push({ opr: SORTED, idxs: [i] });
  return { result, animations };
}

export default insertionSort;
