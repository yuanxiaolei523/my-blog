const recast = require('recast');
const code =
  `
  function add(a, b) {
    return a +
      // 有什么奇怪的东西混进来了
      b
  }
  `
// 用螺丝刀解析机器
const ast = recast.parse(code);
const add  = ast.program.body[0]

// console.log(add)

const { variableDeclaration, variableDeclarator, functionExpression } = recast.types.builders


ast.program.body[0] = variableDeclaration('const', [
    variableDeclarator(add.id, functionExpression(null, add.params, add.body))
])

const output = recast.print(ast).code;

console.log(output);