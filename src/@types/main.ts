export const SWAP = "SWAP";
export const COMPARE = "COMPARE";
export const SORTED = "SORTED";

export type animationsType = (typeof SWAP | typeof COMPARE | typeof SORTED | number)[][];

export type sortingFunction = (arr: number[]) => { result: number[]; animations: animationsType };
