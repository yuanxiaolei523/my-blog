/*
输入某二叉树的前序遍历和中序遍历的结果，请重建该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。

前序遍历 preorder = [3,9,20,15,7]
中序遍历 inorder = [9,3,15,20,7]

返回如下的二叉树：
   3
   / \
  9  20
    /  \
   15   7
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */

function TreeNode(val) {
     this.val = val;
     this.left = this.right = null;
}
var buildTree = function(preorder, inorder) {
    if (!preorder.length || !inorder.length) {
        return null
    }
    if(preorder.length === 1){
        return new TreeNode(preorder[0]);
    }
    let value = preorder[0];
    const node = new TreeNode(value);
    let index = inorder.indexOf(value);
    node.left = buildTree(preorder.slice(1,index+1), inorder.slice(0, index));
    node.right = buildTree(preorder.slice(index + 1), inorder.slice(index + 1))
    return node;
};

// console.log(buildTree([3,9,20,15,7], [9,3,15,20,7]))
// [3,null,9,null,20,null,15,null,7]
// [3,9,20,null,null,15,7]

var buildTree2 = function(preorder, inorder) {
    if (!preorder.length || !inorder.length) {
        return null;
    }

    const rootVal = preorder[0];
    const node = new TreeNode(rootVal);

    let i = 0; // i有两个含义，一个是根节点在中序遍历结果中的下标，另一个是当前左子树的节点个数
    for (; i < inorder.length; ++i) {
        if (inorder[i] === rootVal) {
            break;
        }
    }

    node.left = buildTree(preorder.slice(1, i + 1), inorder.slice(0, i));
    node.right = buildTree(preorder.slice(i + 1), inorder.slice(i + 1));
    return node;
};

// console.log(buildTree2([3,9,20,15,7], [9,3,15,20,7]))
let arr = [1, 2, 3, 4, 5, 6, 7]

console.time()
for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 6) {
        break;
    }
}
console.timeEnd()
console.time()
let index = arr.indexOf(6);
console.timeEnd()