const recast = require('recast');

const code =
  `
  function add(a, b) {
    return a +
      // 有什么奇怪的东西混进来了
      b
  }
  `;
// 用螺丝刀解析机器
const ast = recast.parse(code);
const add = ast.program.body[0];

console.log(add);