import { sortingFunction } from "../@types/main";
import bubbleSort from "./bubbleSort";
import heapSort from "./heapSort";
import insertionSort from "./insertionSort";
import mergeFunction from "./mergeSort";
import quickSort from "./quickSort";
import selectionSort from "./selectionSort";

const sortingAlgorithms: { name: string; fn: sortingFunction }[] = [
  { name: "Bubble", fn: bubbleSort },
  { name: "Selection", fn: selectionSort },
  { name: "Insertion", fn: insertionSort },
  { name: "Merge", fn: mergeFunction },
  { name: "Heap", fn: heapSort },
  { name: "Quick", fn: quickSort },
];

export default sortingAlgorithms;
