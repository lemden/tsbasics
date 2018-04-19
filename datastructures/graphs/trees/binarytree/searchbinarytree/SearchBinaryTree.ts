import ISearchBinaryTree from "./interfaces/ISearchBinaryTree";
import INode from "./interfaces/INode";

export default
class SearchBinaryTree<K,V, TNode extends INode<K,V>> implements ISearchBinaryTree<K,V> {
    private root: INode<K,V>;

    constructor(){
        this.root = null;
    }

    protected getRoot(): INode<K,V> {
        return this.root;
    }

    public insert(node: INode<K,V>) {
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

    private inorderNode(node: INode<K,V>, callback: (n: INode<K,V>) => void) {
        if (node) {
            this.inorderNode(node.getLeft(), callback);
            callback(node);
            this.inorderNode(node.getRight(), callback);
        }
    }

    private postOrderNode(node: INode<K,V>, callback: (n: INode<K,V>) => void) {
        if (node) {
            this.postOrderNode(node.getLeft(), callback);
            this.postOrderNode(node.getRight(), callback);
            callback(node);            
        }
    }

    private preOrderNode(node: INode<K,V>, callback: (n: INode<K,V>) => void) {
        if (node) {
            callback(node);                        
            this.preOrderNode(node.getLeft(), callback);
            this.preOrderNode(node.getRight(), callback);
        }
    }

    public inorder(callback: (n: INode<K,V>) => void) {
        this.inorderNode(this.root, callback);
    }

    public preorder(callback: (n: INode<K,V>) => void) {
        this.preOrderNode(this.root, callback);
    }

    public postorder(callback: (n: INode<K,V>) => void) {
        this.postOrderNode(this.root, callback);
    }

    private insertNode(parent: INode<K,V>, child: INode<K,V>) {
        const comparation = parent.compareKeys(parent.getKey(), child.getKey())
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
    public toArray(): INode<K,V>[] {
        const result: INode<K,V>[] = [];
        this.inorder(
            (n: INode<K,V>) => result.push(n)
        );
        return result;
    }

    private removeNode(node: INode<K,V>) {
        if (node) {
            const parent = node.getParent();
            if ( node.isLeaf() ) {
                if (parent) {
                    parent.removeNode(node);
                } else {
                    this.root = null;
                }
            } else if (node.getLeft() && node.getRight()){
                const minInRightSubTree = this.getMinInSubTree(node.getRight());
                this.removeNode(minInRightSubTree);
                minInRightSubTree.setRight(node.getRight());
                minInRightSubTree.setLeft(node.getLeft());
                if (parent) {
                    parent.replaceNode(node, minInRightSubTree);
                } else {
                    this.root = minInRightSubTree;
                    this.root.setParent(null);
                }
            } else {
                const onlyChild = node.getLeft() || node.getRight();
                if (parent) {
                    parent.replaceNode(node, onlyChild);
                } else {
                    this.root = onlyChild;
                    this.root.setParent(null);                    
                }
            }
        }
    }
    public remove(key: K) {
        this.removeNode(this.find(key));
    }
    public getMin(): INode<K,V> {
        return this.getMinInSubTree(this.root);
    }
    public getMax(): INode<K,V> {
        return this.getMaxInSubTree(this.root);
    }
    private getSomeInSubTree(node: INode<K,V>, 
            canMoveCallback: (node: INode<K,V>) => boolean,
            moveNextCallback: (node: INode<K,V>) => INode<K,V>) {
        if (!node) {
            return null;
        } else if ( canMoveCallback(node) ) {
            return this.getSomeInSubTree(moveNextCallback(node), 
                        canMoveCallback, moveNextCallback);
        } else {
            return node;
        }
    }
    private getMinInSubTree(node: INode<K,V>): INode<K,V> {
        return this.getSomeInSubTree(
            node, node => !!node.getLeft(), node => node.getLeft()
        );
    }
    private getMaxInSubTree(node: INode<K,V>): INode<K,V> {
        return this.getSomeInSubTree(
            node, node => !!node.getRight(), node => node.getRight()
        );
    }
    public isSearchTree(): boolean {
        return this.isSearchSubTree(this.root);
    }
    private isSearchSubTree(node: INode<K,V>): boolean {
        if (!node) {
            return true;
        }
        const nodeIsValid = this.isNodeValid(node);
        if (!nodeIsValid) {
            return false;
        }
        const leftSubTree = this.isSearchSubTree(node.getLeft());
        if (!leftSubTree) {
            return true;
        }
        return this.isSearchSubTree(node.getLeft());
    }
    private isNodeValid(node: INode<K,V>): boolean {
        return (node.getLeft() === null || node.compareKeys(node.getKey(), node.getLeft().getKey()) > 0) &&
                    (node.getRight() === null || node.compareKeys(node.getKey(), node.getRight().getKey()) < 0);
    }
    public find(key: K): INode<K,V>{
        return this.findInNode(this.root, key);
    }
    private findInNode(node: INode<K,V>, key: K) {
        if (!node){
            return null;
        } else {
            const comparation = node.compareKeys(node.getKey(), key);
            if (comparation > 0) {
                return this.findInNode(node.getLeft(), key);
            } else if (comparation < 0) {
                return this.findInNode(node.getRight(), key);                
            } else {
                return node;
            }
        }
    }
}