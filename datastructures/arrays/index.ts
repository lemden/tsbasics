import * as Alg from "./algorithms";

// const arr = Alg.Number.fromArray([1,2,3,4,5,6,7,8,9,10,11]);
// console.log(Alg.BinarySearch(arr, -1));
// console.log(Alg.BinarySearch(arr, 10));
// console.log(Alg.BinarySearch(arr, 5));
// console.log(Alg.BinarySearch(arr, 11));
// console.log(Alg.BinarySearch(arr, 2));

let a = 1;
const arr2 = Alg.Number.fromArray([1000,127,3,12,4,5,6,54,100]);
Alg.QSort(arr2);
console.log(arr2);