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
