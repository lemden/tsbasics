import Queue from "../arrays/dynamic/Queue";
import MinHeap from "./trees/heaps/BinaryMinHeap";

export class Node {
    private children: Node[];
    private value: number;
    private visited: boolean;
    constructor(value: number) {
        this.value = value;
        this.children = [];
        this.visited = false;
    }
    public getChildren(){
        return this.children;
    }
    public addChild(n: Node) {
        this.children.push(n);
        return this;
    }
    public getValue(){
        return this.value;
    }
    public isVisited(){
        return this.visited;
    }
    public setVisited(v: boolean){
        this.visited = v;
    }
}

export class NodeLevel {
    private node: Node;
    private level: number;

    constructor(n: Node, l: number) {
        this.node = n;
        this.level = l
    }

    public getNode(){
        return this.node;
    }

    public getLevel(){
        return this.level;
    }
}

export const bfs = (node: Node, callback: (n: NodeLevel) => void) => {
    const allNodes: Node[] = [];
    const queue = new Queue<NodeLevel>();
    queue.push(new NodeLevel(node, 0));
    while (queue.size() > 0) {
        const n = queue.pop();
        callback(n);
        const children = n.getNode().getChildren();
        allNodes.push(n.getNode());
        n.getNode().setVisited(true);
        for (let i=0;i<children.length;i++) {
            const child = children[i];
            if (!child.isVisited()) {
                queue.push(new NodeLevel(child, n.getLevel() + 1));
            }
        }
    }
    allNodes.forEach(n => {
        n.setVisited(false);
    });
};

const _dfs = (node: Node, level: number, callback: (n: NodeLevel) => void, allNodes: Node[]) => {
    node.setVisited(true);
    allNodes.push(node);
    const children = node.getChildren();
    for (let i=0;i<children.length;i++) {
        if (!children[i].isVisited()) {
            _dfs(children[i], level + 1, callback, allNodes);
        }
    }
    callback(new NodeLevel(node, level + 1));
}

export const dfs = (node: Node, callback: (n: NodeLevel) => void) => {
    const allNodes: Node[] = [];    
    _dfs(node, 0, callback,allNodes);
    allNodes.forEach(n => {
        n.setVisited(false);
    });
}