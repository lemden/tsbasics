export default interface INode<K,V> {
    getValue(): V;
    getKey(): K;

    getLeft(): INode<K,V>;
    getRight(): INode<K,V>;
    setLeft(left: INode<K,V>);
    setRight(right: INode<K,V>);

    compareByKeys(node: INode<K,V>);
}
