import { sortingFunction } from "../@types/main";
import bubbleSort from "./bubbleSort";
import insertionSort from "./insertionSort";
import mergeFunction from "./mergeSort";
import selectionSort from "./selectionSort";

const sortingAlgorithms: { name: string; fn: sortingFunction }[] = [
  { name: "Bubble", fn: bubbleSort },
  { name: "Selection", fn: selectionSort },
  { name: "Insertion", fn: insertionSort },
  { name: "Merge", fn: mergeFunction },
];

export default sortingAlgorithms;
