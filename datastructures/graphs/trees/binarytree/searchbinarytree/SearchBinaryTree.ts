import ISearchBinaryTree from "./interfaces/ISearchBinaryTree";
import BaseNode from "./BaseNode";

export class Node<V> extends BaseNode<string, V>{
    public compareByKeys(node: Node<V>){
        return this.getKey()
                .localeCompare(node.getKey());
    }
}

export default
class SearchBinaryTree<V> implements ISearchBinaryTree<string, V> {
    private root: Node<V>;

    constructor(){
        this.root = null;
    }

    public insert(node: Node<V>) {
        if (!node) {
            throw new Error("Node cannot be null or undefined");
        }
        if (this.root === null) {
            this.root = node;
        } else {
            const inserted = this.insertNode(this.root, node);
            if (!inserted) { // root has the same key as new node
                node.setLeft(this.root.getLeft());
                node.setRight(this.root.getRight());
                this.root = node;
            }
        }
    }

    private inorderNode(node: Node<V>, callback: (n: Node<V>) => void) {
        if (node) {
            this.inorderNode(node.getLeft(), callback);
            callback(node);
            this.inorderNode(node.getRight(), callback);
        }
    }

    private postOrderNode(node: Node<V>, callback: (n: Node<V>) => void) {
        if (node) {
            this.postOrderNode(node.getLeft(), callback);
            this.postOrderNode(node.getRight(), callback);
            callback(node);            
        }
    }

    private preOrderNode(node: Node<V>, callback: (n: Node<V>) => void) {
        if (node) {
            callback(node);                        
            this.preOrderNode(node.getLeft(), callback);
            this.preOrderNode(node.getRight(), callback);
        }
    }

    public inorder(callback: (n: Node<V>) => void) {
        this.inorderNode(this.root, callback);
    }

    public preorder(callback: (n: Node<V>) => void) {
        this.preOrderNode(this.root, callback);
    }

    public postorder(callback: (n: Node<V>) => void) {
        this.postOrderNode(this.root, callback);
    }

    private insertNode(parent: Node<V>, child: Node<V>) {
        const comparation = parent.compareByKeys(child);
        if ( comparation > 0 ) { // 1. new node has smaller key than parent, so, should be inserted into left subtree
            const left = parent.getLeft();
            if (left === null) { // left child is null OR equal to the new node
                parent.setLeft(child);
            } else if (!this.insertNode(left, child)) {
                child.setLeft(left.getLeft());
                child.setRight(left.getRight());
                parent.setLeft(child);
            }
            return true;
        } else if (comparation < 0) { // 2. new node has bigger key than parent, so, should be inserted into right subtree
            const right = parent.getRight();
            if (right === null) {  // right child is null OR equal to the new node
                parent.setRight(child);
            } else if (!this.insertNode(right, child)) {
                child.setLeft(right.getLeft());
                child.setRight(right.getRight());
                parent.setRight(child);
            }
            return true;
        } else {
            return false;
        }
    }
    public remove(key: string) {

    }
    public find(key: string): Node<V>{
        return null;
    }
}