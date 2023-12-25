const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this._root = null;
  }
  root() {
    return this._root;
  }

  add(data) {
    if (!this._root) {
      this._root = new Node(data);
      return this._root;
    }
    return this.addWithin(this._root, data);
  }
  addWithin(node, data) {
    if (!node) {
      return new Node(data);
    }
    if (node.data === data) {
      return node;
    }

    data < node.data
      ? (node.left = this.addWithin(node.left, data))
      : (node.right = this.addWithin(node.right, data));

    return node;
  }

  has(data) {
    return Boolean(this.find(data));
  }

  find(data, node = this._root) {
    if (!node) {
      return null;
    }
    if (node.data === data) {
      return node;
    }
    return node.data < data
      ? this.find(data, node.right)
      : this.find(data, node.left);
  }

  remove(data, node = this._root) {
    if (!node) return null;

    if (data < node.data) {
      node.left = this.remove(data, node.left);
      return node;
    } else if (node.data < data) {
      node.right = this.remove(data, node.right);
      return node;
    } else {
      if (!node.right && !node.left) return null;

      if (!node.left) {
        node = node.right;
        return node;
      }
      if (!node.right) {
        node = node.left;
        return node;
      }

      let minFromLeft = node.left;
      while (minFromLeft.right) {
        minFromLeft = minFromLeft.right;
      }
      node.data = minFromLeft.data;

      node.left = this.remove(minFromLeft.data, node.left);

      return node;
    }
  }

  min() {
    let current = this._root;
    while (current.left) {
      current = current.left;
    }
    return current.data;
  }
  max() {
    let current = this._root;
    while (current.right) {
      current = current.right;
    }
    return current.data;
  }
}

module.exports = {
  BinarySearchTree,
};
