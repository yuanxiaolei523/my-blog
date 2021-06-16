# IV

## Css

### 盒模型

css的盒模型包括标准盒模型和怪异盒模型

#### 标准盒模型

设置方式：box-sizing: content-box

宽度的组成：内容+padding+border+margin

#### 怪异盒模型

设置方式：box-sizing: border-box

宽度的组成：内容+padding+border



### 选择器

#### 简单选择器

1. 元素选择器

2. 类选择器

3. id选择器



#### 属性选择器

存在和值属性选择器

- \[attr\]:该选择器选择包含attr属性的所有元素
- \[attr=val\]:该选择器选择包含attr的值为val的所有元素
- \[attr~=val\]: 该选择器仅选择attr属性的值中有包含val值的所有元素

子串值属性选择器

- [attr|=val] : 选择attr属性的值以val（包括val）或val-开头的元素（-用来处理语言编码）。
- [attr^=val] : 选择attr属性的值以val开头（包括val）的元素。
- [attr$=val] : 选择attr属性的值以val结尾（包括val）的元素。
- [attr*=val] : 选择attr属性的值中包含字符串val的元素。

#### 伪类选择器

**伪类**

一个 CSS [伪类（pseudo-class）](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes) 是一个以冒号(:)作为前缀的关键字，当你希望样式在特定状态下才被呈现到指定的元素时，你可以往元素的选择器后面加上对应的伪类（pseudo-class）。你可能希望某个元素在处于某种状态下呈现另一种样式，例如当鼠标悬停在元素上面时，或者当一个 checkbox 被禁用或被勾选时，又或者当一个元素是它在 DOM 树中父元素的第一个孩子元素时。

:active
:any
:checked
:default
:dir()
:disabled
:empty
:enabled
:first
:first-child
:first-of-type
:fullscreen
:focus
:hover
:indeterminate
:in-range
:invalid
:lang()
:last-child
:last-of-type
:left
:link
:not()
:nth-child()
:nth-last-child()
:nth-last-of-type()
:nth-of-type()
:only-child
:only-of-type
:optional
:out-of-range
:read-only
:read-write
:required
:right
:root
:scope
:target
:valid
:visited

**伪元素**

[伪元素（Pseudo-element）](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements)跟伪类很像，但它们又有不同的地方。它们都是关键字 —— 但这次伪元素前缀是两个冒号 (::) —— 同样是添加到选择器后面达到指定某个元素的某个部分。

::after

::before

::first-letter

::first-line

::selection

::backdrop

#### 组合器

1. 后代选择器 用**空格**表示 可以是孙子元素
2. 子选择器 **>** 选择一个元素时另外一个元素的直接子元素
3. 相邻兄弟选择器 **+** 表示在同一层&&相邻&&在后面
4. 通用兄弟选择器 **~** 表示在同一层&& !相邻 &&在后面

#### 多用选择器





## Html

### 块级元素和行内元素的区别

#### 块级元素

##### 特点

1. 块级元素会独占一行，并且宽度自动填满父元素的宽度
2. 可以设置宽度和高度
3. 可以设置margin和padding
4. 能容纳其他块级元素和内敛元素

##### 常见元素

div、h1-h5、ul、li、ol、hr、p、center、article、section

#### 行内元素

##### 特点

1. 内敛元素和其他元素在同一行
2. 不可以设置宽度和高度
3. 可以设置水平方向的margin和padding，但是垂直方向上的不生效
4. 只能容纳文字或者内联元素

##### 常见元素

Sub、sup、br、b、strong、i、a、u



#### 行内块级元素

##### 特点

1. 和其他元素在同一行
2. 可以设置宽高并且可以设置margin和padding

##### 常见元素

Input,img





## JS

### ==和===的区别

1. ==会做类型转换，===不会做类型转换
2. ==
   1. 如果两个类型相同，则会对两个值进行===的比较，相同则返回true，如果不相同，则返回false
   2. 如果两个类型不相同，则会做一次类型转换
      1. 如果x是null和y是undefined(反之亦然)，那么就返回true
      2. 如果x是number或者y是string，则返回将string转换为number去进行比较
      3. 如果x是boolean并且y是其他类型，那么将boolean转换成number与y进行比较
      4. 如果x既不是string、number，也不是symbol，并且y的类型是Object，那么将x与toPrimitive(y)进行比较
      5. 如果以上都不是，那么就返回false
3. ===
   1. 如果x和y的类型不同，则返回false
   2. 如果x和y的类型相同
      1. 如果x是undefined，那么返回true
      2. 如果x是null，返回ture
      3. 如果x是string类型，当且仅当x,y字符序列完全相同（长度相同，每个位置上的字符也相同）时返回true，否则返回false
      4. 如果x是boolean类型，如果x,y都是true或x,y都是false返回true，否则返回false
      5. 如果x是Symbol，如果x,y是相同的Symbol值，返回true,否则返回false
      6. 如果x是number
         1. 如果x是NaN，则返回false
         2. 如果y是NaN，返回false
         3. 如果x和y的数字值相同，则返回true
         4. 如果x是+0，y是-0，返回true
         5. 如果x是-0，y是+0，返回true
         6. 其他都返回false

### Object

本文列举一些Object上面的一些方法

#### create(obj, objs)

Object.create用于创建一个对象，使用现有的对象(obj)赋值给新对象的**\_\_proto\_\_**属性

```js
let obj = {
	name: 123,
	ages: [12, 10],
};
let c = Object.create(obj);
let c2 = Object.create(obj);
console.log(c.name, c.ages, c, c2) // 123, [12, 10], {}, {}
```

上述的c和c2都是一个空对象，但是却能访问到name和ages属性，这表明name和ages属性是在c和c2的原型上的

对上面的代码做如下操作

```js
// ...
c.ages.push(123);
console.log(c.__proto__.ages, obj.ages, c2.__proto__.ages); // { ages: [ 12, 10, 123 ]}
```

上面的结果表明，现有对象的属性被所有的实例所共享，一旦一个实例进行了修改，其他的也会被修改(本质上就是原型链继承)



Object.create的第二个参数是objs,其实就是Object.defineProperties的第二个参数相同



**MDN上对于Object.create()的实现**

```js
if (typeof Object.create !== "function") {
    //此方法未考虑create的第二个参数的实现
    Object.create = function (proto, propertiesObject) {
        if (typeof proto !== 'object' && typeof proto !== 'function') {
            throw new TypeError('Object prototype may only be an Object: ' + proto);
        } else if (proto === null) {
            throw new Error("This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument.");
        }

        if (typeof propertiesObject != 'undefined') throw new Error("This browser's implementation of Object.create is a shim and doesn't support a second argument.");
        //实现一个隐藏函数
        function F() {}
        //函数的原型设置为参数传进来的原型
        F.prototype = proto;
        // 返回一个F函数的实例，即此实例的__proto__指向为参数proto
        return new F();
    };
}
```



#### defineProperty



### 继承

#### 原型链继承

```js
function Parent () {
  this.name = 'shine';
}
Parent.prototype.sayName = function () {
  console.log(this.name);
}

function Child () {
  this.age = 14;
}
Child.prototype = new Parent();

let c = new Child();
console.log(c.name, c.age) // shine 14
c.sayName(); // shine
```

> 本质上时通过将父类的属性和方法以及原型上的属性和方法赋值给子类的原型上

**缺点**

1. 子类实例会共享父类的所有的属性和方法，一旦修改，则会，其他的实例的属性也会被修改
2. 无法向父类的构造函数传参

#### 构造函数继承

```js
function Parent () {
  this.name = 'shine';
  this.sex = 'male';
  this.sayHi = function() {
    console.log('hi');
  }
}
Parent.prototype.sayName = function () {
  console.log(this.name);
}

function Child () {
  Parent.call(this);
  this.age = 14;
  this.name = 'stone';
}

let c = new Child();
console.log(c.name, c.age) // shine 14
c.sayName(); // shine 
```

> 本质上是把父类的this绑定到child上

**优点**

1. 可以向父类的构造函数中传参
2. 子类不会在共享父类所有的属性和方法了

**缺点**

1. 无法继承父类的原型上的属性和方法
2. 方法都在构造函数中声明，所以无法实现函数的复用，即子类的每一个实例都会有一个sayHi方法

#### 组合继承

组合继承就是将原型链继承和构造函数继承结合起来

```js
function Parent() {
  this.name = 'shine';
}

function Child () {
  Parent.call(this); //用来获取Parent上的属性和方法
  this.age = 14;
}

Child.prototype = new Parent(); //用来获取父类原型上的属性和方法

let c = new Child();
console.log(c.name, c.age) // shine 14
c.sayName(); 
```

**优点**

1. 子类实例不会共享父类的属性了(除非你通过c.__proto\_\_来访问或者修改，这样还是会共享的)
2. 子类实例可以共享父类原型上的方法了
3. 子类可以向父类传参



**缺点**

1. 首先Parent的构造函数回调用两次
2. 因为调用两次，所以会导致父类的属性会出现两次，一次在子类实例上，一次在子类实例的原型上

#### 原型式继承

```js
function object(o) {
  function F () {}
  F.prototype = o;
  return new F();
}
```

> 其本质上就是ES5的Object.create的模拟实现

包含引用类型的属性值会被所有的实例所共享，一个修改了之后，其他的都会被修改

#### 寄生式继承

创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来做增强对象，最后返回对象。

```js
function createObj (o) {
  let obj = Object.create(o);
  obj.sayName = function () {}
  return obj;
}
```

**缺点**

1. 不能做到函数的复用，每一个实例都会有一个sayName函数
2. 引用类型的属性会被所有的实例所共享

#### 寄生组合式继承

```js
function object(o) {
  function F () {}
  F.prototype = o;
  return new F();
}
function inhreit(child, parent) {
  var prototype = object(parent.prototype);
  prototype.constructor = child;
  child.prototype = prototype;
}
function parent () {}
function child () {
  parent.call(this);
}
```

**优点**

只会调用一次parent的构造函数，并且instanceof和getPropertyOf可以正常使用



### 执行上下文和执行栈

执行上下文是当前js代码被解析和执行时所在环境的抽象概念

执行栈是用于存储执行上下文的，每当代码开始执行或者函数开始执行时，都会将上下文存入执行栈中，执行栈遵循后进先出的规则

执行上下文共有三种，分别是全局执行上下文、函数执行上下文、eval函数执行上下文

每个上下文的组成是：变量对象(活动对象)、作用域链、

#### 执行上下文的分类

##### 全局上下文

全局上下文只有一个，在浏览器中就是window，在nodejs中就是global，this指向这个全局上下文

全局上下文中的变量对象就是window或者当前模块



##### 函数上下文

函数上下文有无数个，每个函数**调用**时，都会产生一个函数执行上下文

###### 活动对象(变量对象)

在函数上下文中，用活动对象(AO)来表示变量对象。

变量对象和活动对象的区别就在于

1. 变量对象是规范上或者js引擎上实现，并不能在js环境中直接访问
2. 当进入到一个函数执行上下文中，这个变量对象才会被激活，所以称为活动对象，这时候活动对象上个各种属性才能被访问



调用函数时，会为其创建一个Arguments对象，并自动初始化局部变量arguments，指代该Arguments对象。所有作为参数传入的值都会称为Arguments对象的数组元素

##### eval函数上下文

eval函数执行时，会创建一个eval函数上下文，很少用而且不建议使用

#### 执行上下文的创建过程

执行上下文的创建分为两步，一是**创建阶段**，二是**执行阶段**

##### 创建阶段

创建阶段分为三步

1. 确定this的值
2. 词法环境被创建
3. 变量环境被创建

**确定this的值**

- 在全局上下文中，this执行window。而在nodejs中，this指向当前module
- 函数执行上下文中，this取决于函数的调用方式

**词法环境**

词法环境由两部分组成

1. 环境记录：存储变量和函数声明的实际位置
2. 对外部环境的引用：可以访问其外部词法环境(确定作用域链)

词法环境有两种

- 全局环境：拥有一个全局对象，其关联的属性和方法以及任何用户自定义的全局变量，this指向全局变量，其外部词法环境的引用为null
- 函数环境：用户在函数中定义的变量被存储在环境记录中，包含了arguments对象，对外部词法环境的引用可以是全局环境或包含该函数的外部函数环境

```js
​```js
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
​```
```





## 手写

### 如何实现add(1)(2)(3)(4)....

```js
function add (x) {
  function inner(y) {
    x = x+y;
    return x;
  }
  inner.toString = function () {
    return x;
  }
  return add;
}
```



### 实现一个深克隆

```js
function deepClone(obj, map = new Map()) {
  if (obj === null || typeof obj !== 'object') {
    return throw new Error('obj必须是对象')
  }
  
  let newObj = Array.isArray(obj) ? [] : {}
  
  if (typeof obj === 'object') {
    if (map.get(obj)) { // 解决循环引用的问题
      return obj;
    }
    map.set(obj, newObj);
    for(const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        newObj[key] = typeof obj[key] === 'object' ? deepClone(obj) : obj[key];
      }
    }
  }
  return newObj;
}
```



### 实现一个trim

```js
function trim(str) {
  return str.replace(/^\s\s*/, '').replace(/\s*\s$/, '');
}
function trim(str) {
  return str.replace(/^\s+/, '').replace(/\s+$/, '');
}
function trim(str) {
    while(str) {
        if (str.startsWith(' ')) {
            str = str.substring(1);
        } else if (str.endsWith(' ')) {
            str = str.substring(0, str.length - 1);
        } else {
            break;
        }
    }
    return str
}
```



### new

```js
function myNew () {
  let obj = {}; // 创建一个新的对象
  let Constructor = [].shift.call(arguments); // 拿到当前的构造函数
  obj.__proto__ = Constructor.prototype; // 将构造函数的原型对象绑定到新对象的原型，以便访问原型对象上的属性和方法
  // 将构造函数执行一遍(将构造函数的属性和方法绑定到新对象上，并且看构造函数是否有返回值)
  var ret = Constructor.apply(obj, arguments); 
  // 如果返回值是对象，那么就将对象返回，如果不为对象，那么就将obj返回
  return typeof ret === 'object' ? ret : obj;
}
```



### apply

```js
Function.prototype.myApply = function (ctx, arr) {
  ctx = ctx || window; // 判断第一个参数是否给出，如果没有则为window
  ctx.fn = this; // 将当前函数绑定到ctx上
  let result = arr ? ctx.fn() : ctx.fn(arr); // 将函数执行，得到返回的结果
  delete ctx.fn; // 避免变量污染，将当前函数从传入的对象上删除
  return result; // 将结果返回
}
```



### call

```js
Function.prototype.myCall = function (ctx) {
  ctx = ctx || window;
  ctx.fn = this;
  var args = [].slice.call(arguments, 1);
  let ret = ctx.fn(...args);
  delete ctx.fn;
  return ret;
}
```



### bind

```js
Function.prototype.myBind = function(ctx) {
  if (typeof this !== 'function ') {
    throw new Error('必须是函数')
  }
  ctx = ctx || window;
  let self = this;
  let args = [].slice.call(arguments, 1);
  var fNop = function () {}
  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(this instanceof fNop ? this : ctx, args.concat(bindArgs));
  }
  fNop.prototpye = this.prototype;
  fBound.prototype = new fNop();
  return fBound;
}
```





## VUE



## React



## Ig



## Webpack



## Node

d