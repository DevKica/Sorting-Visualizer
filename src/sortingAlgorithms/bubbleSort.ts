import { animationsType, COMPARE, SORTED, SWAP } from "../@types/main";
import { swap } from "../utils/arrays";

function bubbleSort(arr: number[]) {
  const animations: animationsType = [];

  const result = [...arr];
  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result.length - i - 1; j++) {
      animations.push([COMPARE, j, j + 1]);
      if (result[j] > result[j + 1]) {
        swap(result, j, j + 1);
        animations.push([SWAP, j, j + 1]);
      }
    }
    animations.push([SORTED, result.length - i - 1]);
  }
  return { result, animations };
}

export default bubbleSort;
