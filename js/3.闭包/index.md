# 

## 闭包

### 定义
闭包是指那些能够读取其他函数内部变量的函数

### case
```js
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}

var foo = checkscope();
foo();
```
这里直接给出简要的执行过程：

进入全局代码，创建全局执行上下文，全局执行上下文压入执行上下文栈
全局执行上下文初始化
执行 checkscope 函数，创建 checkscope 函数执行上下文，checkscope 执行上下文被压入执行上下文栈
checkscope 执行上下文初始化，创建变量对象、作用域链、this等
checkscope 函数执行完毕，checkscope 执行上下文从执行上下文栈中弹出
执行 f 函数，创建 f 函数执行上下文，f 执行上下文被压入执行上下文栈
f 执行上下文初始化，创建变量对象、作用域链、this等
f 函数执行完毕，f 函数上下文从执行上下文栈中弹出

当函数checkscope执行完毕后，他的执行上下文已经被删除了，那么为什么函数f还能读到scope的值呢？

这是因为f的执行上下文维护了一个作用域链，因为这个作用域链，所以函数f仍然可以读到 checkscopeContext.AO 的值，明当 f 函数引用了 checkscopeContext.AO 中的值的时候，即使 checkscopeContext 被销毁了，但是 JavaScript 依然会让 checkscopeContext.AO 活在内存中，f 函数依然可以通过 f 函数的作用域链找到它，正是因为 JavaScript 做到了这一点，从而实现了闭包这个概念。
```js
fContext = {
    Scope: [AO, checkscopeContext.AO, globalContext.VO],
}
```

### 面试题
```js
var data = [];

for (var i = 0; i < 3; i++) {
  data[i] = function () {
    console.log(i);
  };
}

data[0]();
data[1]();
data[2]();
```
答案是都是 3，让我们分析一下原因：
因为当data[0]()执行的时候，其作用域链为
```js
data[0]Context = {Scope: [AO, 匿名函数Context.AO,globalContext.VO]}
```
data[0].AO并没有i值，所以会从globalContext.VO中读取，此时全局的VO里面的i为3，所以打印的就是3

改成闭包后
```js
var data = [];

for (var i = 0; i < 3; i++) {
  data[i] = (function (i) {
        return function(){
            console.log(i);
        }
  })(i);
}

data[0]();
data[1]();
data[2]();
```
当执行到 data[0] 函数之前，此时全局上下文的 VO 为：
```js
globalContext = {
    VO: {
        data: [...],
        i: 3
    }
}
```
此时data[0] 函数的作用域链为：
```js
data[0]Context = {
    Scope: [AO, 匿名函数Context.AO globalContext.VO]
}

```
而匿名函数执行上下文的AO的组成为
```js
匿名函数Context = {
    AO: {
        arguments: {
            0: 0,
            length: 1
        },
        i: 0
    }
}
```
data[0]Context 的 AO 并没有 i 值，所以会沿着作用域链从匿名函数 Context.AO 中查找，这时候就会找 i 为 0，找到了就不会往 globalContext.VO 中查找了，即使 globalContext.VO 也有 i 的值(值为3)，所以打印的结果就是0。

### 闭包的实际使用场景
1. 形成块级作用域
2. 私有变量
3. 防抖节流
### 闭包的优点
1. 可以读取外部函数的变量，让这些变量的值始终保持在内存中。
3. 私有成员的存在
4. 避免全局的变量污染

### 闭包的缺点
1. 使得函数的变量都保存在内存中，内存会消耗很大，还有可能会造成内存泄露














