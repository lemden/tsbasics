import BaseNode from "./BaseNode";
import SearchBinaryTree from "./SearchBinaryTree";

class NumNode extends BaseNode<number, number> {
    constructor(k: number){
        super(k,k);
    }
    public compareKeys(k1: number, k2: number): number {
        return k1 > k2 ? 1 : k1 < k2 ? -1 : 0;
    }
}

const tree = new SearchBinaryTree<number, number, NumNode>();
tree.insert(new NumNode(100));
tree.insert(new NumNode(50));
tree.insert(new NumNode(150));
tree.insert(new NumNode(25));
tree.insert(new NumNode(75));
tree.insert(new NumNode(60));
tree.insert(new NumNode(80));
tree.insert(new NumNode(125));
tree.insert(new NumNode(175));
tree.insert(new NumNode(160));
tree.insert(new NumNode(180));



console.log(`Min: ${tree.getMin().getValue()} =? 25`); // expected 25
console.log(`Min: ${tree.getMax().getValue()} =? 180`); // expected 180
console.log(`Find(75): ${tree.find(75) !== null ? "found" : "not found"} =? found`); // expected 75
console.log(`Find(-1): ${tree.find(-1) !== null ? "found" : "not found"} =? not found`); // expected 75

tree.remove(100);
const maybeRoot1 = tree.find(125);
console.log("125 is now root ? ", maybeRoot1.getParent() === null);
tree.remove(125);
const maybeRoot2 = tree.find(150);
console.log("150 is now root ? ", maybeRoot2.getParent() === null);

const buffer1 = [];
tree.inorder( (n) => { buffer1.push(n.getValue()); });
console.log("In order WITH 150: ", buffer1.join(", "));

tree.remove(150);
console.log(`IsSearchTree: ${tree.isSearchTree()} =? true`);

const buffer2 = [];
tree.inorder( (n) => { buffer2.push(n.getValue()); });
console.log("In order without 150: ", buffer2.join(", "));
