/**
 * 算法实战-路径
 * 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。
 * 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。
 * 问总共有多少条不同的路径？
 */

/**
 * 路径寻找
 * @param {number} m 表示长为5
 * @param {number} n 表示宽为4
 */
function unquinePath (m, n) {
    if (m == 1 ||  n == 1) {
        return 1;
    }
    return unquinePath(m-1, n)+ unquinePath(m, n-1)
}

console.log(unquinePath(3, 2));