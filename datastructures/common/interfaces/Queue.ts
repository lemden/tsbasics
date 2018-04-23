export interface Queue<T> {
    empty();
    push(v: T);
    pop(): T;
    size(): number;
}