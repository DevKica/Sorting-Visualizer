import { animationsType, COMPARE, SORTED, SWAP } from "../@types/main";
import { swap } from "../utils/arrays";

function partition(arr: number[], low: number, high: number, animations: animationsType) {
  let pivot = arr[high];
  let i = low - 1;

  for (let j = low; j <= high - 1; j++) {
    animations.push({ opr: COMPARE, idxs: [high, j] });
    if (arr[j] < pivot) {
      i++;
      swap(arr, i, j);
      animations.push({ opr: SWAP, idxs: [i, j] });
    }
  }
  swap(arr, i + 1, high);
  animations.push({ opr: SWAP, idxs: [i + 1, high] });
  return i + 1;
}

function quickSortHelper(arr: number[], low: number, high: number, animations: animationsType) {
  if (low < high) {
    let pi = partition(arr, low, high, animations);
    quickSortHelper(arr, low, pi - 1, animations);
    quickSortHelper(arr, pi + 1, high, animations);
  }
}

function quickSort(arr: number[]) {
  const result = [...arr];
  const animations: animationsType = [];

  quickSortHelper(result, 0, result.length - 1, animations);

  for (let i = 0; i < result.length; i++) animations.push({ opr: SORTED, idxs: [i] });
  return { result, animations };
}

export default quickSort;
