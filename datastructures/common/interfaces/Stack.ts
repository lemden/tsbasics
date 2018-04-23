export default interface Stack<T> {
    empty();
    push(v: T);
    pop(): T;
    size(): number;
}