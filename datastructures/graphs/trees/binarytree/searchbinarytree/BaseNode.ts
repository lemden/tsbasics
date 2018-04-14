import INode from "./interfaces/INode";

export default abstract class BaseNode<K,V> implements INode<K,V> {
    private key: K;    
    private value: V;
    private left: BaseNode<K,V>;
    private right: BaseNode<K,V>;

    constructor(key: K, value: V){
        this.value = value;
        this.key = key;
        this.left = this.right = null;
    }
    public abstract compareByKeys(node: BaseNode<K,V>);

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
        return this;
    }
    public setRight(right: BaseNode<K,V>) {
        this.right = right;
        return this;
    }
    public getValue(): V{
        return this.value;
    }
}