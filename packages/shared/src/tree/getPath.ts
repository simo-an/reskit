import { dfs, isLeaf } from "./dfs";
import type { TNode } from "./dfs";

function getPaths<N extends TNode>(n: N, onNode?: (n: N) => void): Array<N[]> {
  let nodes: N[] = [];
  let paths: Array<N[]> = [];

  dfs(n, (node, isEnd) => {
    if (isLeaf(node)) {
      return paths.push([...nodes, node]);
    }

    return isEnd ? nodes.pop() : nodes.push(node);
  });

  return paths;
}

export { getPaths };
