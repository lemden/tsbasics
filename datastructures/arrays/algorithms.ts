import ComparableNode from "../common/interfaces/ComparableNode";
import Comparable from "../common/interfaces/Comparable";

export const BinarySearch = <K,V>(arr: Array<ComparableNode<K,V>>, key: K): ComparableNode<K,V> => {
    if (!arr.length) {
        return null;
    }
    let left = 0;
    let right = arr.length;
    
    while (left < right) {
        let middleIndex = Math.floor( (right + left) / 2);
        let midleNode = arr[middleIndex];
        let middleNodeKey = midleNode.getKey();
        if (middleNodeKey.less(key)) {
            left = middleIndex;
        } else if (middleNodeKey.more(key)) {
            right = middleIndex;
        } else {
            return midleNode;
        }
    }
    return null;
}

class NumberKey implements Comparable<number> {
    private key: number;
    constructor(key: number) {
        this.key = key;
    }
    public more(c: number): boolean {
        return this.key > c;
    }
    public less(c: number): boolean {
        return this.key < c;
    }
    public getValue(): number {
        return this.key;
    }
}
export class Number implements ComparableNode<number,number> {
    private key: NumberKey;
    constructor(v: number) {
        this.key = new NumberKey(v);
    }
    public getKey(): NumberKey{
        return this.key;
    }
    public getValue():number {
        return this.key.getValue();
    }
    public static fromArray(arr:number[]) {
        return arr.map(n => new Number(n));
    }
}

const swap = <K,V>(arr: Array<ComparableNode<K,V>>, i: number, j: number) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    return arr;
}

const partition = <K,V>(arr: Array<ComparableNode<K,V>>, left: number, right: number) => {
    const middleIndex = Math.floor( (left + right) / 2 );
    const middle: ComparableNode<K,V> = arr[middleIndex];
    let leftSide = left;
    let rightSide = right;
    while (leftSide <= rightSide) {
        while (arr[leftSide].getKey().less(middle.getKey().getValue())) {
            leftSide ++;
        }
        while (arr[rightSide].getKey().more(middle.getKey().getValue())) {
            rightSide --;
        }
        if (leftSide >= rightSide) {
            break;
        }
        
        swap(arr, leftSide, rightSide);
        leftSide ++;
        rightSide --;
    }

    return rightSide;
}

const QSortWithLeftRight = <K,V>(arr: Array<ComparableNode<K,V>>, left: number, right: number) => {
    if (left < right) {
        const q = partition(arr, left, right);
        QSortWithLeftRight(arr, left, q);
        QSortWithLeftRight(arr, q + 1, right);
    }
};

export const QSort = <K,V>(arr: Array<ComparableNode<K,V>>) => {
    QSortWithLeftRight(arr, 0, arr.length - 1);
}
