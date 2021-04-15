/**
 * 输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）。
 * 输入：head = [1,3,2]
 * 输出：[2,3,1]
 * 0 <= 链表长度 <= 10000
 */


/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 */
var reversePrint = function(head) {
    if (!head || (!head.val && !head.next)) {
        return [];
    }
    let nums = []
    let node = head
    while(node !== null) {
        nums.unshift(node.val)
        node = node.next
    }
    return nums
}

/**
 * 输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）。
 * 输入：head = [1,3,2]
 * 输出：[2,3,1]
 * 0 <= 链表长度 <= 10000
 */
var reversePrint = function(head) {
    if(!head) return [];
    let arr = [];
    while (head !== null) {
        arr.unshift(head.val);
        head = head.next
    }
    return nums
}



























