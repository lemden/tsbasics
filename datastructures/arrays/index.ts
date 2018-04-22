import * as Alg from "./algorithms";
const arr = Alg.Number.fromArray([1,2,3,4,5,6,7,8,9,10,11]);
console.log(Alg.BinarySearch(arr, -1));
console.log(Alg.BinarySearch(arr, 10));
console.log(Alg.BinarySearch(arr, 5));
console.log(Alg.BinarySearch(arr, 11));
console.log(Alg.BinarySearch(arr, 2));
