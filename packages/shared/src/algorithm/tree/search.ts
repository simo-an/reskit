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

function bfs<N extends TNode>(n: N, onNode?: (n: N, level: number) => void) {
  let curr: N[] = [n];
  let next: N[] = [];
  let level = 0;

  while (true) {
    let node = curr.shift();

    if (!node) break;

    onNode && onNode(node, level);

    if (!isLeaf(node)) {
      node.items!.forEach((i) => next.push(i as N));
    }

    if (curr.length === 0) {
      curr = next;
      next = [];
      level += 1;
    }
  }
}

export { dfs, bfs, isLeaf };
export type { TNode };
