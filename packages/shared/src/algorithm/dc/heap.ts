abstract class Heap {
  public data: number[] = [];

  public get size() {
    return this.data.length;
  }

  protected left(i: number) {
    return 2 * i + 1;
  }
  protected right(i: number) {
    return 2 * i + 2;
  }
  protected parent(i: number) {
    return Math.floor((i - 1) / 2);
  }

  protected isLeaf(i: number) {
    return this.left(i) >= this.size;
  }
  protected isRoot(i: number) {
    return i === 0;
  }

  public push(n: number) {
    this.data.push(n);
    this.shiftUp(this.size - 1);
  }

  public pop() {
    this.swap(0, this.size - 1);

    const res = this.data.pop();

    this.shiftDown(0);

    return res;
  }

  protected abstract shiftDown(i: number): void;
  protected abstract shiftUp(i: number): void;

  protected swap(i: number, j: number) {
    [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
  }
}
class MaxHeap extends Heap {
  protected shiftUp(i: number) {
    if (this.isRoot(i)) return;

    const p = this.parent(i);

    if (this.data[p] < this.data[i]) {
      this.swap(p, i);
      this.shiftUp(p);
    }
  }

  protected shiftDown(i: number) {
    if (this.isLeaf(i)) return;

    const l = this.left(i);
    const r = this.right(i);

    if (r >= this.size) {
      // 没有右叶子
      if (this.data[i] < this.data[l]) {
        this.swap(i, l);
        this.shiftDown(l);
      }
    } else {
      // 左右节点都有
      if (this.data[l] >= this.data[r] && this.data[l] > this.data[i]) {
        // 左节点比较小
        this.swap(l, i);
        this.shiftDown(l);
      }
      if (this.data[r] >= this.data[l] && this.data[r] > this.data[i]) {
        this.swap(r, i);
        this.shiftDown(r);
      }
    }
  }
}

class MinHeap extends Heap {
  protected shiftUp(i: number): void {
    if (this.isRoot(i)) return;

    const p = this.parent(i);

    if (this.data[p] > this.data[i]) {
      this.swap(p, i);
      this.shiftUp(p);
    }
  }
  protected shiftDown(i: number): void {
    if (this.isLeaf(i)) return;

    const l = this.left(i);
    const r = this.right(i);

    if (r >= this.size) {
      // 没有右叶子
      if (this.data[i] > this.data[l]) {
        this.swap(i, l);
        this.shiftDown(l);
      }
    } else {
      // 左右节点都有
      if (this.data[l] <= this.data[r] && this.data[l] < this.data[i]) {
        // 左节点比较大
        this.swap(l, i);
        this.shiftDown(l);
      }
      if (this.data[r] <= this.data[l] && this.data[r] < this.data[i]) {
        this.swap(r, i);
        this.shiftDown(r);
      }
    }
  }
}

function maxHeap() {
  return new MaxHeap();
}

function minHeap() {
  return new MinHeap();
}

export { minHeap, maxHeap };
