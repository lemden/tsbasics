import INode from "./INode";

export default interface ISearchBinaryTree<K,V> {
    insert(node: INode<K,V>);
    remove(key: K): void;
    find(key: K): INode<K,V>;

    inorder(callback: (n: INode<K,V>) => void);
    preorder(callback: (n: INode<K,V>) => void);
    postorder(callback: (n: INode<K,V>) => void);
}
