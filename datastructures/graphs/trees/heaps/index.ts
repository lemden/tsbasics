import BinaryMaxHeap from "./BinaryMaxHeap";
import Comparable from "../../../common/interfaces/Comparable";

export class HeapNode implements Comparable<number> {
    private value: number;
    constructor(value: number) {
        this.value = value;
    }
    public getValue(): number{
        return this.value;
    }
    public more(node: number) {
        return this.value > node;
    }
    public less(node: number) {
        return this.value < node;
    }
    public static fromArray(numbers: number[]): HeapNode[]{
        return numbers.map(n => new HeapNode(n));
    }
}

// const heap1 = new BinaryMaxHeap<number, HeapNode>();
// heap1.add(new HeapNode(100));
// heap1.add(new HeapNode(200));
// heap1.add(new HeapNode(300));
// heap1.add(new HeapNode(50));
// heap1.add(new HeapNode(75));
// heap1.add(new HeapNode(95));
// heap1.add(new HeapNode(195));
// heap1.add(new HeapNode(1000));
// heap1.add(new HeapNode(15));
// heap1.add(new HeapNode(27));
let next;
// while ( next = heap1.next()) {
//     console.log(next.getValue());
// }
// ----

// const heap2 = new BinaryMaxHeap<number, HeapNode>(
//     HeapNode.fromArray([111, 20, 32, 500, 21, 1003, 1244, 5, 99, 13, 77])
// );
// while ( next = heap2.next()) {
//     console.log(next.getValue());
// }

const heap31 = new BinaryMaxHeap<number, HeapNode>(
    HeapNode.fromArray([111, 20, 32, 500, 21])
);
const heap32 = new BinaryMaxHeap<number, HeapNode>(
    HeapNode.fromArray([1003, 1244, 5, 99, 13, 77])
);
heap31.append(heap32);
while ( next = heap31.next()) {
    console.log(next.getValue());
}
