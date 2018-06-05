'use strict';

function Tree(data) {
  this.count = 1;
  this.root = new Node(null, data);
  this.root.tree = this;
}

function Node(parent, data, x) {
  this.data = data;
  if (x === "") {
    this.index = x;
  } else {
    this.index = "/" + x;
  }
  this.parent = parent;
  this.count = 0;
  this.prev = null;
  this.next = null;
  this.first = null;
  this.last = null;
  if (parent) {
    this.tree = parent.tree;
    this.tree.count++;
    if (!parent.count) {
      parent.first = this;
    }
    if (parent.last) {
      parent.last.next = this;
      this.prev = parent.last;
    }
    parent.last = this;
    parent.count++;
  }
}

Node.prototype.add = function(data, x) {
  return new Node(this, data, x);
};

Tree.prototype.build = function(obj, node) {
  if (typeof obj === "object") {
    const keys = Object.keys(obj);

    for (let i = 1; i <= keys.length; i++) {
      const key = keys[i - 1];
      const child = node.add(key, i);
      this.build(obj[key], child);
    }

  } else {
    const child = node.add(obj, "");
    this.build({}, child);
  }
};

Tree.prototype._print = function(node, child, count) {
  if (node) {
    console.log(' '.repeat(count * 10) + node.data);

    if (node.first) {
      count++;
      this._print(node.first, node.first.first, count);
      count--;
    }

    if (node.next) {
      this._print(node.next, node.next.first, count);
    }
  }
};

Tree.prototype.print = function() {
  if (this.root.first) {
    this._print (this.root, this.root.first, 0)
  } else {
    console.log(this.root.data);
  }
};

Tree.prototype._getChildren = function(node, child, str) {
    if (child) {
      str += "\n" + child.index + " " + child.data;

      if (child.next) {
        str = this._getChildren(node, child.next, str);
      }
    } else {
      str = "";
    }
    return str;
};

Tree.prototype.getChildren = function(node, callback) {
  let str = node.data + ":";
  if (node) {
    str = this._getChildren(node, node.first, str);
  } else {
    str = "";
  }
  if (typeof callback === 'function') {
    callback(str);
  }
};

Tree.prototype._findByIndex = function(curNode, child, x) {
  let node;
  if (child) {
    if (child.index === x) {
      node = child;
    } else {
      node = this._findByIndex(curNode, child.next, x);
    }
  } else {
  node = "";
  }
  return node;
};

Tree.prototype.findByIndex = function(curNode, x) {
  if (curNode) {
    return this._findByIndex(curNode, curNode.first, x);
  } else {
    return "";
  }
};

Tree.prototype._find = function(node, child, value) {
  if (node) {
    if (node.data === value) {
      return node;
    } else {
      if (node.first) {
        if (this._find(node.first, node.first.first, value)) {
          return this._find(node.first, node.first.first, value);
        }
      }

      if (node.next) {
        return this._find(node.next, node.next.first, value);
      } else {
        return "";
      }
    }
  }
};

Tree.prototype.find = function(value) {
  if (this.root.data === value) {
    return this.root;
  } else {
    if (this.root.first) {
      return this._find(this.root.first, this.root.first.first, value);
    } else {
      return "";
    }
  }
};

module.exports = { Node, Tree };
