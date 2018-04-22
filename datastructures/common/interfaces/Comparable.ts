export default interface Comparable<T> {
    more(c: T): boolean;
    less(c: T): boolean;
    getValue(): T;
}
