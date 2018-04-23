import List from "../../common/interfaces/List";
import Iterator from "../../common/interfaces/Iterator";

export class ListNode<T> {
    private value: T;

    private next: ListNode<T>;
    private previous: ListNode<T>;

    constructor(value: T) {
        this.value = value;
    }
    public getValue():T{
        return this.value;
    }
    public getNext(): ListNode<T>{
        return this.next;
    }
    public getPrevious(): ListNode<T>{
        return this.previous;
    }
    public setNext(next: ListNode<T>): ListNode<T> {
        this.next = next;
        return this;
    }
    public setPrevious(previous: ListNode<T>): ListNode<T> {
        this.previous = previous;
        return this;
    }
}

export class ListIterator<T> implements Iterator<T> {
    private current: ListNode<T>;

    constructor(head: ListNode<T>) {
        this.current = head;
    }

    public hasNext(){
        if (!this.current) {
            return false;
        } else {
            return this.current.getNext() !== null;
        }
    }

    public next(){
        if (!this.current) {
            return null;
        }
        const temp = this.current;
        this.current = this.current.getNext();
        return temp.getValue()
    }
}

export default class DoubleLinkedList<T> implements List<T> {
    private head: ListNode<T>;
    private tail: ListNode<T>;
    private listSize: number;

    constructor(){
        this.head = null;
        this.tail = null;
        this.listSize = 0;
    }

    public add(v: T) {
        if (!this.head) {
            this.head = new ListNode<T>(v);
            this.tail = this.head;
        } else {
            const newNode = new ListNode<T>(v)
            this.tail.setNext(newNode);
            newNode.setPrevious(this.tail);
            this.tail = newNode;
        }
        this.listSize ++;        
    }
    private find(i: number): ListNode<T> {
        if (i >= this.listSize || i < 0) {
            return null;
        }
        let curr = 0;
        let temp = this.head;
        while ( curr < i ) {
            temp = temp.getNext();
            curr ++;
        }
        return temp;
    }
    public get(i: number) {
        const temp = this.find(i);
        if (temp){
            return temp.getValue();
        } else {
            return null;
        }
    }
    public remove(i: number): T {
        if (this.listSize === 0) {
            return null;
        } else if (this.listSize === 1) {
            const res = this.head.getValue();
            this.head = null;
            this.tail = null;
            this.listSize = 0;
            return res;
        } else {
            const item = this.find(i);
            const prev = item.getPrevious();
            const next = item.getNext();
            if (prev) {
                prev.setNext(next);
            }
            if (next) {
                next.setPrevious(prev);
            }
            if (item === this.head) {
                this.head = next;
            } 
            if (item === this.tail) {
                this.tail = prev;
            }
            this.listSize --;
            return item.getValue();
        }
    }
    public size(): number {
        return this.listSize;
    }
    public clear() {
        this.listSize = 0;
        this.head = null;
        this.tail = null;
    }
    public getIterator(): Iterator<T> {
        return new ListIterator(this.head);
    }
}
