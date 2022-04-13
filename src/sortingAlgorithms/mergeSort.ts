function mergeSort(arr: number[]) {
  return { result: arr, animations: [] };
  // if (array.length === 1) return { array, animations };
  // const mid = Math.floor(array.length / 2);
  // const {array:first} = mergeSort(array.slice(0, mid), animations);
  // const second = mergeSort(array.slice(mid), animations);
  // const sorted = [];
  // let i = 0,
  //   j = 0;
  // while (i < first.length && j < second.length) {
  //   if (first[i] < second[j]) {
  //     sorted.push(first[i++]);
  //   } else {
  //     sorted.push(second[j++]);
  //   }
  // }
  // while (i < first.length) sorted.push(first[i++]);
  // while (j < second.length) sorted.push(second[j++]);
  // return {};
}

export default mergeSort;
