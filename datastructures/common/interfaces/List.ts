import Iterator from "./Iterator";

export default interface List<T> {
    add(v: T);
    get(i: number): T;
    remove(i: number): T;
    size(): number;
    clear();
    getIterator(): Iterator<T>;
}
