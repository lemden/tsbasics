import SearchBinaryTree, { Node } from "./SearchBinaryTree";

const binaryTree = new SearchBinaryTree<string>();
binaryTree.insert(new Node<string>("F", "F-V"));
binaryTree.insert(new Node<string>("B", "B-V"));
binaryTree.insert(new Node<string>("G", "G-B"));
binaryTree.insert(new Node<string>("A", "A-V"));
binaryTree.insert(new Node<string>("D", "D-V"));
binaryTree.insert(new Node<string>("I", "I-V"));
binaryTree.insert(new Node<string>("C", "C-V"));
binaryTree.insert(new Node<string>("E", "E-V"));
binaryTree.insert(new Node<string>("H", "H-V"));
// binaryTree.insert(new Node<string>("E", "E-V2"));

new Promise(
    ( done ) => {
        const keys = [];
        binaryTree.inorder( (node: Node<string>) => {
            keys.push(node.getKey());
        });
        done (`inorder: ${keys.join(",")}`);
    }
).then (console.log);

new Promise(
    ( done ) => {
        const keys = [];
        binaryTree.preorder( (node: Node<string>) => {
            keys.push(node.getKey());
        });
        done (`pre-order: ${keys.join(",")}`);
    }
).then (console.log);

new Promise(
    ( done ) => {
        const keys = [];
        binaryTree.postorder( (node: Node<string>) => {
            keys.push(node.getKey());
        });
        done (`post-order: ${keys.join(",")}`);
    }
).then (console.log);
