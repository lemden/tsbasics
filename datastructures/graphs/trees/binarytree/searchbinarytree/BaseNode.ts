import INode from "./interfaces/INode";

export default abstract class BaseNode<K,V> implements INode<K,V> {
    private key: K;    
    private value: V;
    private left: BaseNode<K,V>;
    private right: BaseNode<K,V>;
    private parent: BaseNode<K,V>;

    constructor(key: K, value: V){
        this.value = value;
        this.key = key;
        this.left = this.right = null;
    }
    public abstract compareKeys(key1: K, key2: K);

    public getKey(): K {
        return this.key;
    }
    public getRight(): BaseNode<K,V>{
        return this.right;
    }
    public getLeft(): BaseNode<K,V>{
        return this.left;
    }
    public setLeft(left: BaseNode<K,V>){
        this.left = left;
        if (left) {
            left.setParent(this);
        }
        return this;
    }
    public setRight(right: BaseNode<K,V>) {
        this.right = right;
        if (right) {
            right.setParent(this);        
        }
        return this;
    }
    public setParent(parent: BaseNode<K,V>) {
        this.parent = parent;
        return this;
    }
    public getParent(): BaseNode<K,V> {
        return this.parent;
    }
    public removeNode(subNode: BaseNode<K,V>) {
        this.replaceNode(subNode, null);
    }
    public replaceNode(subNode: BaseNode<K,V>, newSubNode: BaseNode<K,V>) {
        if (this.getLeft() === subNode) {
            this.setLeft(newSubNode);
        } else if (this.getRight() === subNode) {
            this.setRight(newSubNode);
        }
    }
    public getValue(): V{
        return this.value;
    }

    public isLeaf(){
        return this.getLeft() === null && this.getRight() === null;
    }
}