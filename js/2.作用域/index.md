# 作用域
作用域是指程序源代码中定义变量的区域

作用域规定了如何查找变量，也就是确定了当前执行代码对变量的访问权限
## 静态作用域和动态作用域
因为js采用的是词法作用域，所以函数的作用域在函数定义时就已经确定了

而与词法作用域相对的是动态作用域，函数的作用域是在函数调用的时候决定的
```js
var value = 1;
function foo() {
    console.log(value); // 1
}
function bar() {
    var value = 2;
    foo();
}
bar();
```

假设JavaScript采用静态作用域，让我们分析下执行过程：执行 foo 函数，先从 foo 函数内部查找是否有局部变量 value，如果没有，就根据书写的位置，查找上面一层的代码，也就是 value 等于 1，所以结果会打印 1。

假设JavaScript采用动态作用域，让我们分析下执行过程：执行 foo 函数，依然是从 foo 函数内部查找是否有局部变量 value。如果没有，就从调用函数的作用域，也就是 bar 函数内部查找 value 变量，所以结果会打印 2。

我们下面来看两个例子

```js
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f();
}
checkscope();//local scope
```

```js
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}
checkscope()(); //local scope
```

JavaScript 函数的执行用到了作用域链，这个作用域链是在函数定义的时候创建的。嵌套的函数 f() 定义在这个作用域链里，其中的变量 scope 一定是局部变量，不管何时何地执行函数 f()，这种绑定在执行 f() 时依然有效。

那么既然

## 执行上下文

### 执行上下文种类

1. 全局执行上下文
2. 函数执行上下文
3. eval执行上下文

js通过**执行上下文栈(ECStack)**来存储和管理执行上下文，当js要开始解释执行代码时，首先会遇到全局执行上下文，此时的上下文栈会入栈一个**全局执行上下文**(globalContext)，并且只有当整个应用程序结束的时候，ECStack 才会被清空，所以程序结束之前， ECStack 最底部永远有个 globalContext, 在程序的执行过程中，如果遇到函数的执行，则将函数上下文入栈，当函数执行完毕后出栈。

### 执行上下文的组成
1. 变量对象
2. 作用域链
3. this

#### 变量对象
变量对象是与执行上下文相关的作用域，存储了在执行上下文中定义的变量和函数声明

因为不同执行上下文下的变量对象稍有不同，所以我们来聊聊全局上下文下的变量对象和函数上下文下的变量对象。


##### 全局上下文的变量对象
全局上下文的变量对象就是window
##### 函数上下文的变量对象
在函数上下文中，我们用活动对象（AO）来表示变量对象

活动对象和变量对象其实是一个东西，只是变量对象是规范上的或者说是引擎实现上的，不可在 JavaScript 环境中访问，只有
当进入一个执行上下文中，这个执行上下文的变量对象才会被激活，所以才叫 activation object 呐，而只有被激活的变量对
象，也就是活动对象上的各种属性才能被访问。

活动对象是在进入函数上下文时刻被创建的，它通过函数的 arguments 属性初始化。arguments 属性值是 Arguments 对象。

















