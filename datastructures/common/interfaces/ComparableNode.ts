import Comparable from "./Comparable";

export default interface ComparableNode<K,V> {
    getKey(): Comparable<K>;
    getValue(): V;
}
