import { animationsType, COMPARE, SHIFT, SORTED } from "../@types/main";

function merge(arr: number[], arr1_idx: number, mid: number, end: number, animations: animationsType) {
  let arr2_idx = mid + 1;

  animations.push({ opr: COMPARE, idxs: [mid, arr2_idx] });
  if (arr[mid] <= arr[arr2_idx]) {
    return;
  }

  while (arr1_idx <= mid && arr2_idx <= end) {
    animations.push({ opr: COMPARE, idxs: [arr1_idx, arr2_idx] });
    if (arr[arr1_idx] <= arr[arr2_idx]) {
      arr1_idx++;
      continue;
    }

    let smaller_idx = arr2_idx;
    let smaller = arr[smaller_idx];

    animations.push({ opr: SHIFT, idxs: [arr1_idx, smaller_idx] });

    while (smaller_idx !== arr1_idx) {
      arr[smaller_idx] = arr[smaller_idx - 1];
      smaller_idx--;
    }

    arr[arr1_idx] = smaller;

    arr1_idx++;
    mid++;
    arr2_idx++;
  }
}

function mergeFunction(arr: number[], left: number, right: number, animations: animationsType) {
  if (left < right) {
    let mid = Math.floor((left + right) / 2);

    mergeFunction(arr, left, mid, animations);
    mergeFunction(arr, mid + 1, right, animations);

    merge(arr, left, mid, right, animations);
  }
}

function mergeSort(arr: number[]) {
  const result = [...arr];
  const animations: animationsType = [];

  mergeFunction(result, 0, result.length - 1, animations);

  for (let i = 0; i < result.length; i++) animations.push({ opr: SORTED, idxs: [i] });
  return { result, animations };
}

export default mergeSort;
