export const SWAP = "SWAP";
export const COMPARE = "COMPARE";
export const SORTED = "SORTED";
export const SHIFT = "SHIFT";

type oprType = typeof SWAP | typeof COMPARE | typeof SORTED | typeof SHIFT;

export type animationsType = { opr: oprType; idxs: number[] }[];

// export type animationsType = (typeof SWAP | typeof COMPARE | typeof SORTED | typeof SHIFT | number)[][];

//flag
export type sortingFunction = (arr: number[]) => { result: number[]; animations: animationsType };
// | ((arr: number[], animations: animationsType) => { result: number[]; animations: animationsType })
// | any
