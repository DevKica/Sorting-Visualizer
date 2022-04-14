import { animationsType, COMPARE, SORTED, SWAP } from "../@types/main";
import { swap } from "../utils/arrays";

function heapify(arr: number[], n: number, i: number, animations: animationsType) {
  let largest = i;
  const l = 2 * i + 1;
  const r = 2 * i + 2;

  if (l < n) {
    animations.push({ opr: COMPARE, idxs: [l, largest] });
    if (arr[l] > arr[largest]) largest = l;
  }
  if (r < n) {
    animations.push({ opr: COMPARE, idxs: [r, largest] });
    if (arr[r] > arr[largest]) largest = r;
  }
  if (largest !== i) {
    swap(arr, i, largest);
    animations.push({ opr: SWAP, idxs: [i, largest] });

    // Recursively heapify the affected sub-tree
    heapify(arr, n, largest, animations);
  }
}

function heapSort(arr: number[]) {
  const result = [...arr];

  const len = result.length;
  const animations: animationsType = [];

  for (let i = Math.floor(len / 2) - 1; i >= 0; i--) heapify(result, len, i, animations);

  for (let j = len - 1; j > 0; j--) {
    swap(result, j, 0);
    animations.push({ opr: SWAP, idxs: [j, 0] });
    animations.push({ opr: SORTED, idxs: [j] });

    heapify(result, j, 0, animations);
  }
  animations.push({ opr: SORTED, idxs: [0] });

  return { result, animations };
}

export default heapSort;
