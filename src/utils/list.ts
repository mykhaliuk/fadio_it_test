export class Node<T extends unknown> {
  constructor(public data: T, public next: Node<T> | null = null) {}
}

export class List<T> {
  private _head: Node<T> | null = null;
  private _length: number = 0;

  public insert(data: T) {
    this._head = new Node<T>(data, this._head);
    this._length++;
  }

  get length() {
    return this._length;
  }

  get head() {
    return this._head;
  }

  public iterate(cb: (node: Node<T>['data']) => void) {
    let _node = this._head;
    while (_node) {
      cb(_node.data);
      _node = _node.next;
    }
  }
  remove(value) {
    let prevNode: Node<T> | null = null;
    let currentNode = this._head;

    while (currentNode) {
      if (currentNode.data === value) {
        if (prevNode) {
          prevNode.next = currentNode.next;
        } else {
          this._head = currentNode.next;
        }
        currentNode = null;
        this._length--;
        return true;
      }
      prevNode = currentNode;
      currentNode = currentNode.next;
    }
    return false;
  }
}
