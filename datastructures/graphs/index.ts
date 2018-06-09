import * as Alg from "./algorithms";
const n = new Alg.Node(1);
n.addChild(
    new Alg.Node(2)
        .addChild(new Alg.Node(6))
        .addChild(new Alg.Node(7))
        .addChild(new Alg.Node(8))
        .addChild(
            new Alg.Node(9)
                .addChild(new Alg.Node(10))
                .addChild(new Alg.Node(11))
                .addChild(new Alg.Node(12))
                .addChild(new Alg.Node(13))
                .addChild(new Alg.Node(14))
                .addChild(new Alg.Node(15))
        )
).addChild(
    new Alg.Node(3)
).addChild(
    new Alg.Node(4)
).addChild(
    new Alg.Node(5)
);

let lines: Alg.Node[][]  = [];
const callback = (n1: Alg.NodeLevel) => {
    if (!lines[n1.getLevel()]) {
        lines[n1.getLevel()] = [];
    }
    lines[n1.getLevel()].push(n1.getNode());
};
Alg.bfs(n, callback);
console.log ("--- BFS ---");
console.log(
    lines.map(
        line => line.map( n => n.getValue()).join(",")
    ).join('\n')
);

console.log ("--- DFS ---");
Alg.dfs(n, (n1: Alg.NodeLevel) => {
    console.log(`${n1.getNode().getValue()}: ${n1.getLevel()}`);
});
