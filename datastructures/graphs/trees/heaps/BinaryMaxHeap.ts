import Comparable from "../../../common/interfaces/Comparable";

export default
class BinaryMaxHeap<V, T extends Comparable<V>> {
    private list: T[];
    constructor(list: T[] = null){
        this.list = list || [];
        this.heapify();
    }

    public append(heap: BinaryMaxHeap<V,T>) {
        this.list = this.list.concat(heap.list);
        this.heapify();
    }

    private printme(){
        console.log(this.list);
    }

    private heapify(){
        for (let i = Math.floor(this.list.length / 2); i >= 0 ; i--) {
            this.shiftDown(i);
        }
    }

    public add(value: T) {
        this.list.push(value);
        const i = this.list.length - 1;
        this.shiftUp(i);
    }

    public next(): T {
        if (this.list.length > 1) {
            const root = this.list[0];
            this.list[0] = this.list.pop();
            this.shiftDown(0);
            return root;
        } else if (this.list.length === 1) {
            const result = this.list[0];
            this.list = [];
            return result;
        } else {
            return null;
        }
    }

    private shiftUp(i: number) {
        let currentIndex = i;
        while (currentIndex > 0) {
            const parentIndex =  Math.floor( (currentIndex - 1) / 2 );
            if (this.list[parentIndex].less(this.list[currentIndex].getValue())) {
                this.swap(parentIndex, currentIndex);
            }
            currentIndex = parentIndex;
        }
    }

    private shiftDown(i: number) {
        let currentIndex = i;
        while (currentIndex < this.list.length) {
            const leftIndex = 2 * currentIndex + 1;
            const rightIndex = 2 * currentIndex + 2;

            if (leftIndex >= this.list.length) {
                break;
            }
            let target = leftIndex;
            if (rightIndex < this.list.length 
                    && this.list[rightIndex].more(this.list[leftIndex].getValue())) {
                target = rightIndex;
            }
            if (this.list[currentIndex].less(this.list[target].getValue())) {
                this.swap(currentIndex, target);
                currentIndex = target;
            } else {
                break;
            }
        }
    }

    private swap(i1: number, i2: number) {
        if (i1 < this.list.length && i2 < this.list.length) {
            const temp: T = this.list[i1];
            this.list[i1] = this.list[i2];
            this.list[i2] = temp;
        }
    }
}
