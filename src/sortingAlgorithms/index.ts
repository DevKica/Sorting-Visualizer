import { sortingFunction } from "../@types/main";
import bubbleSort from "./bubbleSort";
import insertionSort from "./insertionSort";
import mergeSort from "./mergeSort";
import selectionSort from "./selectionSort";

const sortingAlgorithms: { name: string; fn: sortingFunction }[] = [
  { name: "Bubble", fn: bubbleSort },
  { name: "Merge", fn: mergeSort },
  { name: "Selection", fn: selectionSort },
  { name: "Insertion", fn: insertionSort },
];

export default sortingAlgorithms;
