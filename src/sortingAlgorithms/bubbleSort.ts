import { swap } from "../utils/arrays";
import { animationsType, COMPARE, SORTED, SWAP } from "../@types/main";

function bubbleSort(arr: number[]) {
  const animations: animationsType = [];
  const result = [...arr];

  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result.length - i - 1; j++) {
      animations.push({ opr: COMPARE, idxs: [j, j + 1] });
      if (result[j] > result[j + 1]) {
        swap(result, j, j + 1);
        animations.push({ opr: SWAP, idxs: [j, j + 1] });
      }
    }
    animations.push({ opr: SORTED, idxs: [result.length - i - 1] });
  }
  return { result, animations };
}

export default bubbleSort;
