import IStack from "../../common/interfaces/Stack";
import List from "./DoubleLinkedList";

export default class Stack<T> implements IStack<T> {

    private list: List<T>;

    constructor(){
        this.list = new List<T>();
    }

    public empty() {
        this.list.clear();
    }
    public push(v: T){
        this.list.add(v);
    }
    public pop(): T {
        return this.list.remove(0);
    }
    public size(): number {
        return this.list.size();
    }
}