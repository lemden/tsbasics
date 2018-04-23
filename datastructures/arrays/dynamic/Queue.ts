import IQueue from "../../common/interfaces/Queue";
import Stack from "./Stack";

/**
 * I know it's not the best implementation
 * it just an example ...
 */
export default class Queue<T> implements IQueue<T> {
    private left: Stack<T>;
    private right: Stack<T>;

    constructor(){
        this.left = new Stack<T>();
        this.right = new Stack<T>();
    }
    public empty() {
        this.left.empty();
        this.right.empty();
    }
    public push(v: T) {
        this.left.push(v);
    }
    public pop(): T {
        if (this.right.size() === 0) {
            while (this.left.size()) {
                this.right.push(this.left.pop());
            }
        }
        return this.right.pop();
    }
    public size(): number {
        return this.left.size() + this.right.size();
    }
}
