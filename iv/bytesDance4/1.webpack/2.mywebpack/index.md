# 实现一个自己的打包工具

webpack
本质上，webpack是一个现代js应用程序的静态模块打包器

当webpack处理应用程序的时候，他会递归的构建一个依赖关系图，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或者多个bundle

## 概览
1. 找到一个入口文件
2. 解析这个入口文件，提取它的依赖
3. 解析入口文件依赖的依赖，递归的区创建一个文件间的依赖图，描述所有文件的依赖关系
4. 把所有文件打包成一个文件

## 开始开发
1. 新建几个js源文件
* name.js
* message.js
* entry.js

2. 肉眼观察三个文件的依赖关系
entry 依赖 message， message 依赖 name
entry.js --> message.js --> name.js

3. 开始编写自己的打包工具，mywebpack.js

4. 分析ast，思考如何能够解析去entry的依赖

4.1 File -> program
4.2 program -> body
4.3 ImportDeclaration (引入的声明) source属性 source.value就是引入文件的地址

5. 生成entry.js的ast
recast

babylon 一个基于babel的js解析工具

6. 基于AST，找到entry.js的ImportDeclaration Node，通过babel-traverse
让你可以像遍历对象一样遍历ast

7. 获取entry.js的依赖

8. 优化createAsset函数，使其能够区分文件
因为要获取所有文件的依赖，所以要有一个id来标识所有文件
这里咱们使用一个简单的自增number，这样遍历的每个文件的id就唯一了

先获取到entry.js的id filename以及dependencies

9. 获取到单个文件的依赖之后，我们尝试建立依赖图
新增一个createGraph,吧createAsset调用移入createGraph

entry的路径是动态的，所以createGraph需要接受一个entry

10. 上面存储的是相对路径，但是我们需要使用绝对路径
有了绝对路径，咱们才能在各个地方获取到文件的assets

11. 我们需要一个Map用于记录depend中的相对路径和childAsset的对应关系

因为我们后面要做依赖的引入，需要这样一个对应关系.

12. 那么接下来开始遍历所有文件

13. 新增一个bundle

14. 创建整体的结果代码
因为他需要接受参数，且打包后的是一整个代码块，且需要立即执行，所以用一个自执行函数来包裹

自执行函数的参数是module，是每一个文件模块

15. 编译源代码
 ```js
const { code } = babel.transformFromAst(ast, null, {
    presets: ['env']
});
```
16. 把编译后的代码，加入到result中

CommonJS的规范要求：
1. module变量代表当前模块
这个变量是一个对象，它的exports属性是对外的接口，modules.exports。加载某个模块，其实就是加载该模块的module.export属性
2. require方法用于加载模块