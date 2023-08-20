import { dfs, isLeaf } from "../algorithm";
import type { TNode } from "../algorithm";

function getPaths<N extends TNode>(n: N): Array<N[]> {
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
