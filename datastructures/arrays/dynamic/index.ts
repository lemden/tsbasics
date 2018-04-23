import Stack from "./Stack";
import Queue from "./Queue";

// import DoubleLinkedList from "./DoubleLinkedList";
// const list = new DoubleLinkedList<string>();
// for (let i=0;i<10;i++) {
//     list.add(`str#${i}`);
// }
// console.log(list.size());
// console.log(list.get(0));
// console.log(list.get(9));
// console.log(list.get(4));

// const iterator = list.getIterator();
// while (iterator.hasNext()) {
//     const str = iterator.next();
//     console.log(`iterator: ${str}`);
// }

// while(list.size())
//     console.log(`removed: ${list.remove(0)}`);

// console.log(`Size = ${list.size()}`);
// const stack = new Stack<number>();
// for (let i=0;i<10;i++) {
//     stack.push(i);
// }
// let val;
// while ( (val = stack.pop()) !== null ) {
//     console.log(`pop: ${val}`);
// }

const queue = new Queue<number>();
for (let i=0;i<10;i++) {
    queue.push(i);
}
console.log("Queue size: ", queue.size());
let qValue;
while (null !== (qValue = queue.pop()) ) {
    console.log(`qValue: ${qValue}`);
}
