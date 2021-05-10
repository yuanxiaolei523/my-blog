# JS 执行上下文和执行栈

## 理解 JavaScript 中的执行上下文和执行栈

执行上下文是当前 JavaScript 代码被解析和执行时所在环境的抽象概念。

### 执行上下文的类型

执行上下文一共有三种

-   全局执行上下文：只有一个，在浏览器中就是 window，在 nodejs 中就是 global，this 指向这个全局对象
-   函数执行上下文：无数个，每个函数调用时，都会产生一个函数执行上下文，
-   eval 函数执行上下文：`eval` 函数中的代码，很少用而且不建议使用。

#### 全局执行上下文
全局执行上下文中的变量对象就是window
#### 函数执行上下文

在函数上下文中，用活动对象(activation object, **AO**)来表示变量对象。

活动对象和变量对象的区别在于

-   1、变量对象（**VO**）是规范上或者是 JS 引擎上实现的，并不能在 JS 环境中直接访问。
-   2、当进入到一个执行上下文后，这个变量对象才会被**激活**，所以叫活动对象（**AO**），这时候活动对象上的各种属性才能被访问。

调用函数时，会为其创建一个**Arguments 对象**，并自动初始化局部变量 arguments，指代该 Arguments 对象。所有作为参数传入的值都会成为 Arguments 对象的数组元素。

##

### 执行栈

执行栈，通过`栈`这个字我们就可以看出来，它是一个栈结构，所以具备 LIFO 的性质，其作用是为了存储在执行执行期间创建的所有的执行上下文

首次运行 js 代码时，会创建一个全局上下文，并且将其 push 到执行栈中，每次当函数调用时，都会 push 一个函数执行上下文进入执行栈中(push 进执行栈的栈顶)，当函数执行完毕后，会将其 pop 出执行栈，控制权移交给当前执行栈的下一个执行上下文

```js
var a = "Hello World!";

function first() {
	console.log("Inside first function");
	second();
	console.log("Again inside first function");
}

function second() {
	console.log("Inside second function");
}

first();
console.log("Inside Global Execution Context");
```

我们来看上面这个例子，首先开始执行这段函数，js 引擎会将全局执行上下文 push 进执行栈，其次执行 first 时，会将 first 这个函数执行上下文 push 进去，此时执行站内有两个执行上下文了，然后当前控制权在 first 执行上下文中，然后执行到 second 函数时，将 second 执行上下文入栈，然后将控制权交给 second 执行上下文，在 second 函数执行完后，second 执行上下文出栈，然后控制权还给 first 执行上下文，此时 first 继续执行 console，当 first 执行完毕后，first 执行上下文 pop 出栈，然后继续执行 console.log('Inside Global Execution Context');执行完毕后，全局上下文出栈

![image-20210408160315843](/Users/qitmac001126/Library/Application Support/typora-user-images/image-20210408160315843.png)

### 执行上下文的创建

执行上下文的创建分为两步，第一是创建阶段，第二是执行阶段

#### 创建阶段

1. 确定 this 的值
2. 词法环境被创建
3. 变量环境被创建

##### 确定 this 的值

-   全局上下文中，this 指向 window。而在 nodejs 环境中，this 指向当前的 module
-   函数执行上下文，this 执行取决于函数的调用方式

##### 词法环境

词法环境由两部分组成

-   1、环境记录：存储变量和函数声明的实际位置
-   2、对外部环境的引用：可以访问其外部词法环境

词法环境有两种

-   1、全局环境：是一个没有外部词法环境的词法环境，其外部词法环境的引用为 null，拥有一个全局对象(window)、其关联的属性和方法以及任何用户自定义的全局变量，this 的值指向这个全局对象
-   2、函数环境：用户在函数中定义的变量被存储在环境记录中，包含了 arguments 对象，对外部环境的引用可以是全局环境，也可以是包含内部函数的外部函数环境。

```js
GlobalExectionContext = {  // 全局执行上下文
  LexicalEnvironment: {    	  // 词法环境
    EnvironmentRecord: {   		// 环境记录
      Type: "Object",      		   // 全局环境
      // 标识符绑定在这里
      outer: <null>  	   		   // 对外部环境的引用
  }
}

FunctionExectionContext = { // 函数执行上下文
  LexicalEnvironment: {  	  // 词法环境
    EnvironmentRecord: {  		// 环境记录
      Type: "Declarative",  	   // 函数环境
      // 标识符绑定在这里 			  // 对外部环境的引用
      outer: <Global or outer function environment reference>
  }
}
```

##### 变量环境

变量环境实际上也是一个词法环境，因为它具有词法环境所具有的所有属性

在 ES6 中，**词法** 环境和 **变量** 环境的区别在于前者用于存储**函数声明和变量（ `let` 和 `const` ）**绑定，而后者仅用于存储**变量（ `var` ）**绑定。

变量提升的原因: 在创建阶段，函数声明存放在环境中，使用 var 声明的变量会被置为 undefined，而使用 let、const 声明的变量会被置为**未初始化**

#### 执行阶段

此阶段，完成对所有变量的分配，最后执行代码。

如果 Javascript 引擎在源代码中声明的实际位置找不到 `let` 变量的值，那么将为其分配 `undefined` 值。

## JavaScript 深入之执行上下文栈和变量对象

JS 是单线程的语言，执行顺序肯定是顺序执行，但是 JS 引擎并不是一行一行地分析和执行程序，而是一段一段地分析执行，会先进行编译阶段然后才是执行阶段。

### 变量和函数的声明提升

首先变量的声明和普通函数的声明是可以进行声明提升的，但是他们两个之间还是有优先级的，那就是函数的声明提升的优先级大于变量声明提升的优先级

```js
foo();
var foo = function () {
	console.log("foo1");
};

foo();

function foo() {
	console.log("foo2");
}

foo();
// foo2 foo1 foo2
```

从上面代码中，我们可以看出来函数的优先级大于变量，其实也可以说变量的优先级提升到当前作用域最顶层的，其次才是函数的变量提升

### 执行过程

上下文的执行过程分为两步进行处理

1. 进入执行上下文
2. 代码执行

#### 进入执行上下文

此时的变量对象会包括（如下顺序初始化）：

1.  函数所有的形参(函数上下文)： 没有实参，属性值设为 undefined
2.  函数声明：如果变量对象已经存在相同名称的属性，则完全**替换**这个属性
3.  变量声明：如果变量名称跟已经声明的形参或函数相同，则变量声明**不会干扰**已经存在的这类属性。

```js
function foo(a) {
	var b = 2;
	function c() {}
	var d = function () {};

	b = 3;
}

foo(1);
```

对于上面的代码，这个时候的 AO 是

```js
AO = {
    arguments: {
        0: 1,
        length: 1
    },
    a: 1,
    b: undefined,
    c: reference to function c(){},
    d: undefined
}

```

#### 代码执行

这个阶段会顺序执行代码，修改变量对象的值，执行完成后 AO 如下

```js
AO = {
    arguments: {
        0: 1,
        length: 1
    },
    a: 1,
    b: 3,
    c: reference to function c(){},
    d: reference to FunctionExpression "d"
}

```

## 执行上下文的组成
执行上下文是由三部分组成的
1. 变量对象
2. 作用域链
3. this
#### 作用域
函数的作用域在函数定义的时候就确定了

##### 函数创建时
这是因为函数有一个内部属性 [[scope]]，当函数创建的时候，就会保存所有父变量对象到其中，你可以理解 [[scope]] 就是所有父变量对象的层级链，但是注意：[[scope]] 并不代表完整的作用域链！
```js
function foo() {
    function bar() {
        ...
    }
}
```
创建函数时，各自的scope属性为：
```js
foo.[[scope]] = [
  globalContext.VO
];

bar.[[scope]] = [
    fooContext.AO,
    globalContext.VO
];
```

##### 函数激活时
当函数激活时，进入函数上下文，创建 VO/AO 后，就会将活动对象添加到作用链的前端。

这时候执行上下文的作用域链，我们命名为 Scope：
`Scope = [AO].concat([[Scope]]);`
