import Tree from "./BinarySearchTree.js";

const arr=[1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree= new Tree(arr);
 console.log(`'''''''''''''''''''''''''''''''''''''''''''''''''''''`)
tree.deleteItem(5);
tree.deleteItem(1);
tree.deleteItem(7);
tree.deleteItem(3);
tree. rebalance();
tree.insert(23)
prettyPrint(tree.root);











function prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null || node.value===undefined) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };