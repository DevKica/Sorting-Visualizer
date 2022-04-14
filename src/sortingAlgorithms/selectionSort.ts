import { swap } from "../utils/arrays";
import { animationsType, COMPARE, SORTED, SWAP } from "../@types/main";

function selectionSort(arr: number[]) {
  const animations: animationsType = [];
  const result = [...arr];

  for (let i = 0; i < result.length; i++) {
    let min_idx = i;

    for (let j = i + 1; j < result.length; j++) {
      animations.push({ opr: COMPARE, idxs: [min_idx, j] });
      if (result[min_idx] > result[j]) {
        min_idx = j;
      }
    }
    swap(result, i, min_idx);
    if (i !== min_idx) animations.push({ opr: SWAP, idxs: [i, min_idx] });

    animations.push({ opr: SORTED, idxs: [i] });
  }
  return { result, animations };
}

export default selectionSort;
