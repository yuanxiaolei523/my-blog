# webpack
## 1.webpack中的module指的什么
module就是模块，一个文件就是一个模块
webpack支持ESModule， CommonJS，AMD，Asset.(image, font, video, audio)

1. ESM
关键字 
   export: 允许你将ESM中的内容暴露给其他模块
   import: 允许其他模块引入ESM中的内容
   ```js
      import {aa} from './a.js'
      export {bb}
   ```
// package.json
 type: module -- 强制webpack下所有的模块都以ESM的方式打包
 type: commonjs -- Commonjs

2. CommonJS
module.exports: 允许你将CommonJS中的内容暴露给其他模块
require: 允许其他模块引入CommonJS中的内容

## 2. 所以webpack modules, 如何表达自己的各种依赖关系
* 通过ESM import语句和CommonJS的require和AMD中的define、require以及css/sass/less

## 我们常说的chunk和bundle的区别是什么？(important!!!)
1. chunk
chunk是webpack**打包工程中**Modules的集合，是打包过程中的概念。
webpack从一个入口模块开始，入口模块引入其他模块，其他模块引用其他模块，webpack通过引用关系逐步打包模块，
这些module形成了一个chunk。

如果有多个入口模块，可能会产出多条打包路径，每条路径都会形成一个chunk

2. bundle
bundle是webpack打包之后最终输出的一个或者多个打包好的文件
3. chunk和bundle的关系是什么？

大多数情况下，一个chunk会产生一个bundle，但是也有例外

如果加了sourcemap，一个entry，会产生一个chunk对应两个bundle

chunk是过程中代码块，bundle是打包结果输出的代码块，chunk在构建完成就呈现为bundle

4. 这段配置会产生几个chunk

### Plugin和Loader分别是做什么的？怎么工作的
1. Loader
模块转换器，将非js模块转换为webpack能识别的js模块
本质上，webpack loader将所有类型的文件，转换为应用程序的**依赖图**可以直接引用的模块
2. Plugin
本质上就是一个扩展，运行在webpack打包的各个阶段，都会广播出对应的事件。插件去监听对应的事件

3. Compiler
是一个对象，包含了webpack环境的所有配置信息，包含options、loaders、plugins，在webpack启动的时候实例化，他在全局是唯一的，也可以将其理解为webpack的实例
4. Compliation
包含了当前的模块资源、编译生成资源等等。当webpack在**开发模式**下运行的时候，每当检测一个文件变化时，就会创建一次新的Compliation

### 简单描述一下webpack的打包过程
1. 初始化参数： shell webpack.config.js中配置的
2. 开始编译：初始化一个Compiler对象，加载所有的配置，开始执行编译
3. 确定入口：根据entry中的配置找出所有入口文件
4. 编译模块：从入口文件开始，调用所有的loader，再去递归的找模块的依赖
5. 完成模块的编译：得到每个模块被翻译后的最终内容，以及他们之间的依赖关系
6. 输出资源：根据刚才得到的依赖关系，组装成一个个包含多个module的chunk
7. 输出完成：根据配置，确定要输出的文件名以及文件路径