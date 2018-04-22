import * as Alg from "./algorithms";

// const arr = Alg.Number.fromArray([1,2,3,4,5,6,7,8,9,10,11]);
// console.log(Alg.BinarySearch(arr, -1));
// console.log(Alg.BinarySearch(arr, 10));
// console.log(Alg.BinarySearch(arr, 5));
// console.log(Alg.BinarySearch(arr, 11));
// console.log(Alg.BinarySearch(arr, 2));

// let a = 1;
// const arr2 = Alg.Number.fromArray([1000,127,3,12,4,5,6,54,100]);
// Alg.QSort(arr2);
// console.log(arr2);

// const arr1 = Alg.Number.fromArray([1,3,5,7,9]); 
// const arr2 = Alg.Number.fromArray([0,2,4,6,8]); 
// const merged = Alg.MergeSorted(arr1, arr2);
// console.log(merged);

const merged = Alg.MSort(Alg.Number.fromArray([6,5,2,10,1,12]));
console.log(merged);