export default interface INode<K,V> {
    getValue(): V;
    getKey(): K;

    getLeft(): INode<K,V>;
    getRight(): INode<K,V>;
    setLeft(left: INode<K,V>);
    setRight(right: INode<K,V>);
    setParent(parent: INode<K,V>);
    getParent(): INode<K,V>;
    removeNode(subNode: INode<K,V>);
    replaceNode(subNode: INode<K,V>, newSubNode: INode<K,V>);
    isLeaf(): boolean;

    compareKeys(key1: K, key2: K);
}
