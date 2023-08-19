interface TNode {
  items?: Array<TNode>;
}

function isLeaf(n: TNode) {
  return !n.items || n.items.length === 0;
}

function dfs<N extends TNode>(n: N, onNode?: (n: N, isEnd?: boolean) => void) {
  function loop(node: N): void {
    if (!isLeaf(node)) {
      onNode && onNode(node, false);
      node.items!.forEach((item) => loop(item as N));
      onNode && onNode(node, true);
    } else {
      onNode && onNode(node);
    }
  }

  loop(n);
}

export { dfs, isLeaf };
export type { TNode };
