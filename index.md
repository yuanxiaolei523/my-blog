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



### 回流(重排)和重绘

重排：布局或者几何属性需要改变

重绘：当节点需要更改外观，而不是影响布局的是重绘

#### 导致重排的操作

1. 页面首次渲染

2. 浏览器窗口大小改变

3. 元素尺寸或者位置发生变化

4. 元素内容、字体大小发生变化

5. 添加和删除可见的dom

6. 激活css伪类

7. 查询某些属性或者调用某些和方法

   offsetTop、offsetHeight

#### 如何减少重绘的频率

使用createDocumentFragment，避免将元素一个个添加到dom树上



#### 如何避免重排

1. 尽可能在DOM最末端修改class
2. 让其脱离文档流，通过隐藏元素和文档片段等方法
3. 避免使用calc
4. 避免设置多层内敛样式



## Html

### 时间的捕获和冒泡



1. 基本概念

   事件流：首先是捕获阶段，然后是目标阶段，最后是冒泡阶段

   捕获是自顶向下

   冒泡是自下向上

2. window.addEventListener('click', function () {})监听的是什么阶段的事件

   当第三个参数不传或者为 false 时代表冒泡阶段

   当第三个参数为 true 时代表捕获阶段

3. 平常有哪些场景用到了这个机制

   事件代理

4. 场景考察：一个历史页面，有很多的 button，每个 button 都有自己的逻辑，有自己的 click 事件

   新需求：给每个访问的用户一个 banned 属性，如果 banned 属性为 true，那么点击页面上的任何元素都不可响应原来的函数，而是直接 alert 你被封禁了

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

### 前端捕获异常的方式

#### unhandledrejection

#### error



#### try...catch能捕获所有的异常吗

答案肯定是不能

1. **SyntaxError**不能被正常捕获

   ```js
   try{
     xiaoming.girl；
   }catch (e) {
     console.log(e)
   }
   
   ```

2. 异步错误

   ```js
   try {
     setTimeout(() => {
       undefined.map(v => v)
     })
   }.catch(e) {
     console.log(e)
   }
   ```

#### 有哪些捕获异常的方式

1. 静态资源加载异常

   * 使用onerror捕获

     ```html
     <script src="http://cdn.xxx.com/js/test.js" onerror="errorHandler(this)"></script>
     <script>
      function errorHandler(error) {log(error)}
     </script>
     ```

     

   * 使用addEventListener('error')捕获

     ```html
     <!DOCTYPE html>
     <html lang="zh">
      
     <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>error</title>
       <script>
         window.addEventListener('error', (error) => {
           console.log('捕获到异常：', error);
         }, true)
       </script>
     </head>
      
     <body>
       ![](https://itemcdn.zcycdn.com/15af41ec-e6cb-4478-8fad-1a47402f0f25.png)
     </body>
      
     </html>
     ```

     由于网络请求异常不会事件冒泡，所以必须在捕获阶段将其捕获才行

### 伪数组转数组

```js
// 1
Array.from(arguments);
//2 
[...arguments];
//3
[].slice.call(arguments);
//4 
[].splice.call(arguments, 0);

```



### 正则

#### 特殊符号

\*：表示任意次

?：表示0次或者1次

\+：表示至少1次

### 原型和原型链

#### 原型

首先我们要先来了解三个对象，一个是constructor，一个是原型对象，一个实例

* 原型对象：当你在创建对象的时候，会自动帮你关联一个对象，他可以说是你创建的那个对象的父类，我们可以从它那继承过来一些属性和方法，每一个原型对象都有一个constructor属性，用来执行当前的构造函数
* 构造函数：每个构造函数都有一个**prototype**属性，**prototype**属性是指向我们的原型对象的；实例是通过构造函数new出来的
* 实例：每个构造函数new出来的实例，都有一个**\_\_proto\_\_**属性，这个属性也是指向我们的原型对象的；实例的constructor属性指向构造函数(借用prototype的constructor属性)

#### 原型链

刚才我们提到原型也是一个对象，上面我们也说到对象(除null外)都会有一个原型对象，所以原型对象也是有他自己的原型对象的，这种方式其实构成了**原型链**

当我们在访问对象obj的某个属性时，如果在这个对象上没有找到这个属性，那么js就会去obj的原型对象上去找，如果找不到还是会往obj原型对象的原型对象上找，一直往上找，直至某个原型的原型对象为null为止，此时如果没有找到，那么就说明对象obj中没有这个属性。

#### 几个特殊的原型对象

Object.prototype.\_\_proto__ === null

Function.prototype.\_\_proto__ === Object.prototype





<img src="/Users/qitmac001126/Library/Application Support/typora-user-images/image-20210506180412328.png" alt="image-20210506180412328" style="zoom:25%;" />

### instanceof

我们知道**`instanceof`** ***运算符***用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。

```js
Function instanceof Object; // true

Object instanceof Function; // true
```

#### **Function instanceof Object;**

因为Function是一个构造函数，Function.prototype数一个对象，所以对象的原型是Object.Prototype，所以原型链就变成了这样

Function --> Function.prototype --> Object.prototype --> null(可以理解为)

#### **Object instanceof Function**

首先Object(作为实例对象)是一个构造函数，构造函数的原型对象肯定是Function的原型对象,所以Object.\_\_proto__===Function.prototype，而Function.prototype的原型对象指向Object.prototype，所以Object instanceof Function 正确

### this

1. 在构造函数中的this是指向返回的那个实例的 
2. 在普通的函数中this是指向调用者的
3. 箭头函数的this指向当前所在的作用域
4. 构造函数的静态属性，实例是访问不到的
5. 在构造函数中通过this.xxx定义的，实例访问的时候，会先在构造函数中查找，找不到顺着原型链找(返回的不是对象或者返回this)



### 平时有关注过前端的内存处理吗

#### 1. 内存的生命周期

* 内存分配：声明变量、函数、对象的时候，js会自动分配内存
* 内存使用：使用变量、对象或者调用函数的时候
* 内存回收：垃圾回收机制

#### 2. js的垃圾回收机制

1. 引用计数法：

   a对象对b对象有访问权限，那么称为a引用b对象

   **弊端**：循环应用的时候，会造成内存泄露

2. 标记清除法

   从js的根部开始，然后如果某个变量没有达到，那么就表示该被回收了

   1. 在运行的时候给存储在内存的所有变量加上标记
   2. 从根部触发，能触及的对象，把标记清除
   3. 有标记的就是要删除的变量

#### 3. js中有哪些常见的内存泄露

1. 意外的全局变量

2. 对dom的引用

   ```js
   const element = {
     image: document.getElementById('image');
   }
   document.body.removeChild(document.getElementById('image'))
   // 此时还会有内存泄露，只要对象没有被回收，但是还是会被保存在内存中
   elements.image = nulll
   ```

3. 闭包

   内部函数有权访问外部函数的变量的函数，就称为闭包

4. 未被清除的定时器

#### 4. 如何避免内存泄露

1. 减少不必要的全局变量
2. 用完数据后，及时解除应用





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

1. 子类实例会共享父类的所有的属性和方法，一旦修改，则会，其他的实例继承过来的属性也会被修改
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
Child.prototype.constructor = Child;
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



## ES6

### 了解promise吗，平时用的多吗

#### 1.promise.all有什么特性

Promise.all 接受一个数组或者具有Iterator接口的数据结构作为参数

Promise.all返回的promise的状态有两种可能

1. 当所有的promise都fullfilled，返回的promise的状态就是fullfilled
2. 只要有一个promise的实例rejected，那么返回的promise的状态就是rejected

#### 2.当一个promise reject之后，其他的promise还会执行吗

会。因为Promise是在实例化的时候就开始执行了，所以并不会中断，而且也无法中断

#### 3.手写一个promise.all

1. promise.resolve对参数类型的理解
2. Promise.all的输入参数和输出参数要保持一致

```js
function MyPromiseAll (promiseArr) {
  if (!Array.isArray(promiseArr)) {
    throw new Error('必须是数组')
  }
  return new Promise((resolve, reject) => {
    if (promiseArr.length === 0) {
      resolve([]);
    }
    let res = [];
    let len = promiseArr.length
    let count = 0;
    for(let i = 0; i < len; i++) {
      Promise.resolve(promiseArr[i]).then(value => {
        count++;
        res[i] = value;
        if (count === len) {
          resolve(res)
        }
      }).catch(err => reject(e))
    }
  })
}
```



### 4.如何使用Promise的缓存来缓存一些比较常用的固定的结果

利用装饰器，结合Promise一创建就会初始化的特性实现

```js
const cacheMap = new Map();
function enableCache(target, name, descriptor) {
  const val = descriptor.value;
  descriptor.value = async function (...args) {
    const cacheKey = name + JSON.stringify(args);
    if (!cacheMap.get(cacheKey)) {
      const cacheValue = Promise.resolve(val.apply(this, args)).catch(_ => {catchMap.set(cacheKey, null)});
      cacheMap.set(cacheKey, cacheValue);
    }
  }
}

class PromiseClass {
	@enableCache
	static async getInfo() {}
}
```

### 5. 利用Promise实现一个并发控制，限制加载个数

```js
function LimitLoad (urls, handler, limit) {
  let sequence = urls.concat([]);
  let promises = [];
  promises = sequence.splice(0, limit).map((url, index) => {
    return handler(url).then(res => index;)
  });
  
  let p = Promise.race(promises);
  for (let i = 0; i < sequence.length; i++) {
    p = p.then(res => {// res为下标
      promises[res] = handler(sequence[i]).then(() => res;)
      return Promise.race(promises);
    })
  }
}

function loadImg(url) {
    return new Promise((resolve) => {
        console.log('-----' + url.info + ' start!');
        setTimeout(() => {
            console.log('-----' + url.info + ' ok!');
            resolve();
        }, url.time);
    });
}

const urls = [
    {
        info: 'link1',
        time: 3000,
    },
    {
        info: 'link2',
        time: 2000,
    },
    {
        info: 'link3',
        time: 5000,
    },
    {
        info: 'link4',
        time: 1000,
    },
    {
        info: 'link5',
        time: 1200,
    },
    {
        info: 'link6',
        time: 2000,
    },
    {
        info: 'link7',
        time: 800,
    },
    {
        info: 'link8',
        time: 3000,
    },
];

```





## 手写

### 数字转千位分隔符

```js
function thousand(num) {
  let arr = (num + '').split('.');
  let str = arr[0].split('').reverse().join();
  let res = [];
  for (let i = 0; i < str.length; i++) {
    if (i % 3 === 0 && i !== 0) {
      res.push(',')
    }
    res.push(str[i]);
  }
  res.reverse();
  if (arr[1]) {
    res = res.concat('.' + arr[1]);
  }
  return res.join('');
}
```





### 实现一个sizeOf函数，传入一个函数Object，计算这个Object占用了多少bytes

```js
const testData = {
    a: 111,
    b: 'cccc',
    2222: false,
};

function calculator(obj) {
    const objType = typeof obj;
    switch (objType) {
        case 'number':
            return 8;
        case 'string':
            return 2 * obj.length;
        case 'boolean':
            return 4;
        case 'object': 
            if (Array.isArray(obj)) {
                return obj.map(calculator).reduce((prev, cur) => prev + cur, 0);
            } else {
                return sizeOfObject(obj);
            }
    }
}

let ws = new WeakSet();
function sizeOfObject (obj) {
    if (obj === null) {
        return 0;
    }
    let bytes = 0;
    let keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const val = obj[key];
        bytes += calculator(key);
        if (typeof val === 'object' && !val) {
            if (ws.has(val)) {
                continue;
            }
            ws.add(val);
            
        }
        bytes += calculator(val);
    }
    return bytes;
}
console.log(calculator(testData));
```



### 实现一个Event Bus

```js
class EventEmitter {
    constructor() {
        this.events = [];
    }
    // 注册监听
    on(event, cb) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(cb);
        return this;
    }
    // 注册监听且只实现一次
    once (event, cb) {
        const fn = (...args) => {
            this.off(event, fn);
            cb.apply(this, args);
        };
        this.on(event, fn);
        return this;
    }
    // 触发监听
    emit(event, ...args) {
        let cbs = this.events[event];
        if (!cbs) {
            throw new Error('没有这个事件');
        }
        cbs.forEach(cb => {
            cb.apply(this, args);
        });
        return this;
    }
    // 卸载监听
    off(event, cb) {
        if (!cb) {
            this.events[event] = null;
        }
        this.events[event] = this.events[event].filter(curCb => {
            return curCb !== cb;
        });
        return this;
    }
}
```

### 能给 xhr 添加 hook，实现在各个阶段打印日志吗？

```js
class XhrHook {
    // 两个hooks，一个在调用的方法之前触发，一个在调用之后触发
    constructor(beforeHooks = {}, afterHooks = {}) {
        this.XHR = window.XMLHttpRequest;
        this.beforeHooks = beforeHooks;
        this.afterHooks = afterHooks;
        this.init();
    }

    init() {
        let _this = this;
        // 不能使用箭头函数
        window.XMLHttpRequest = function () {
            this._xhr = new _this();
            _this.overwrite(this);
        };
    }

    overwrite(proxyXHR) {
        for (const key in proxyXHR._xhr) {
            if (typeof proxyXHR._xhr[key] === 'function') {
                this.overwriteMethod(key, proxyXHR);
                continue;
            }
            this.overwriteAttributes(key, proxyXHR);
        }
    }
    overwriteMethod(key, proxyXHR) {
        let beforeHooks = this.beforeHooks; // 我们应该可以拦截原有行为
        let afterHooks = this.afterHooks;
        proxyXHR[key] = (...args) => {
            if (beforeHooks[key]) {
                const res = beforeHooks[key].call(proxyXHR, args);
                if (res === false) return; //假设如果返回false，则不执行后续的
            }
            const res = proxyXHR._xhr[key].apply(proxyXHR._xhr, args);
            afterHooks[key] && afterHooks[key].call(proxyXHR._xhr, res);
            return res;
        };
    }

    overwriteAttributes(key, proxyXHR) {
        Object.defineProperties(
            proxyXHR,
            key,
            this.setPropertyDescriptor(key, proxyXHR)
        );
    }
    setPropertyDescriptor(key, proxyXHR) {
        let obj = Object.create(null);
        let _this = this;
        obj.set = function (val) {
            if (!key.startsWith('on')) {
                proxyXHR['__' + key] = val;
                return;
            }
            // 如果beforeHooks中有这个属性，则需要做处理
            if (_this.beforeHooks[key]) {
                this._xhr[key] = function (...args) {
                    _this.beforeHooks[key].call(proxyXHR);
                    val.apply(proxyXHR, args);
                };
                return;
            }
            // 如果beforeHooks中没有这个属性，则可以直接赋值
            this._xhr[key] = val;
        };

        obj.get = function () {
            return proxyXHR['__' + key] || this._xhr[key];
        };
        return obj;
    }
}
```





### 如何实现add(1)(2)(3)(4)....

```js
function argsSum (args) { // 浏览器内调用
    return args.reduce((prev, cur) => prev + cur);
}

function add (...args1) {
    let sum = argsSum(args1);
    let curry = (...args) => add(sum + argsSum(args));
    curry.toString = function () {
        return sum;
    };
    return curry;
   
}

console.log(add(9, 2)(2)(3));
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



### 大数相加

```js
function num2Str(num) {
    return typeof num === 'number' ? num + '' : num;
}


function bigNumber (num1, num2) {
    num1 = num2Str(num1);
    num2 = num2Str(num2);
    let len1 = num1.length;
    let len2 = num2.length; 
    if (len1 > len2) {
        num2 = num2.padStart(len1, '0');
    } else if (len1 < len2) {
        num1 = num1.padStart(len2, '0');
    }
    let res = ''.padStart(18, '');
    console.log(num1, num2);

    for (let i = 0; i < num1.length; i++) {
        res += (Number(num1[i]) + Number(num2[i]));
    }
    return res;
}
```



### flat

#### 特点

1. 如果不传，默认扁平一层
2. 如果传入小于等于0的，则返回原数组
3. 如果传入的不是数组，报错
4. 如果有空值，则忽略
5. `Infinity` 关键字作为参数时，无论多少层嵌套，都会转为一维数组

```js
function flat(arr, deep = 1) {
    if (deep < 0) {
        return arr;
    }
    let res = [];
    if (!Array.isArray(arr)) {
        return;
    }
    arr.forEach((item) => {
        // console.log(item);
        if (Array.isArray(item)) {
            if (deep > 0) {
                res = res.concat(flat4(item, --deep));
            } else {
                res.push(item);
            }
        } else {
            res.push(item);
        }
    });
    return res;
}
```

```js
function flat5 (arr, deep = 1) {
    if (deep < 0) {
        return arr;
    }
    if (!Array.isArray(arr)) {
        return;
    }
    return deep > 0 
        ? arr.reduce((prev, cur) => prev.concat(Array.isArray(cur) ? flat5(cur, --deep) : cur), [])
        : arr.slice();
}
```



### debounce

```js
function debounce (fn ,delay) {
  let t = null
  return function () {
    if (t) clearTimeout(t);
    let ctx = this;
    let args = [...arguments];
    t = setTimeout(() => {
      fn.apply(ctx, args);
    }, delay);
  }
}

function throttle(fn, delay) {
  let startTime = Date.now();
  return function() {
    let now = Date.now();
    if (now - startTime > delay) {
      fn.apply(this, arguments);
      startTime = now;
    }
  }
}
```



### 回文数

```js
var isPalindrome = function(x) {
    if(x < 0) {
        return false;
    }
    let str = x + '';
    let left = 0;
    let right = str.length - 1 ;
    while(left < right) {
        if(str[left] !== str[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
};
```
### reverse

```js
// 1
function reverse (strArr) {
    return strArr.reverse();
}

// 2 双指针
function reverse2(strArr) {
    let left = 0;
    let right = strArr.length - 1 - left;
    while (left < right) {
        // 将right的值赋值给left，rightleft的值赋值给right
        [strArr[left], strArr[right]] = [strArr[right], strArr[left]];
        left++;
        right--;
    }
    return strArr;
}
```



### 素数

```js

/*
 判断一个数是否是素数/质数
 素数/质数：只能被1和自己整除
*/
/**
 * 因为1不是素数，所以循环从2开始，到num-1，只要有一个能做num的约数，那么就说明是素数，否则不是
 * @param {number} x 
 * @returns boolean
 */
function isPrime(x) {
    for (let i = 2; i <= x - 1; i++) {
        if (x % i === 0) {
            return false;
        }
    } 
    return true;
}
/**
 * 优化：因为一个数如果是质数，那么他的约数一个要大于等于该数的平方根，一个要小于等于该数的平方根，
 * 所以只要循环从2到当前数的平方根即可，如果有能被整除的，则说明是，如果没有则不是
 * @param {number}} num 
 * @returns 
 */
function isPrime2(num) {
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
 
}
console.log(isPrime2(6));
/**
 * 大于等于5的质数一定和6的倍数相邻
 * 大于5的质数: 5、7、11、13、17、19、23
 * @param {number}} num 
 * @returns boolean
 */
function isPrime3(num) {
    if (num === 2 || num === 3) {
        return true;
    }
   
    if (num % 6 !== 1 && num % 6 !== 5) {
        return false;
    }
    for (let i = 5; i <= Math.sqrt(num); i += 6) {
        // 如果num不是整除6的倍数-1或者6的倍数+1， 那么就不是质数
        if (num % i == 0 || num % (i + 2) == 0) {
            return false;
        }
    }
    return true;
}
console.log(isPrime3(23));
```
### arr unique

```js
function repeat1 (arr) {
    return [...new Set(arr)];
}

// 方式2 循环
function repeat2(arr) {
    let arr2 = [];
    arr.forEach(num => {
        if (!arr2.includes(num)) {
            arr2.push(num);
        }
    });
    return arr2;
}
repeat2(arr);

function repeat3 (arr) {
    return arr.filter((num, index, arr) => arr.indexOf(num) === index);
}

function repeat4 (arr) {
    var obj = {};
    return arr.filter(num => obj.hasOwnProperty(num) ? false : (obj[num] = true));
}
```



## VUE

### 把你了解的Vue响应式原理说一下

首先Vue内部有三个核心类：

1. Observer：给对象的属性添加getter和setter，用于收集依赖和派发更新
2. Watcher：观察者对象，有Render  Watcher、computed watcher和use Watcher
3. Dep：用于收集当前响应式对象的依赖关系，每一个响应式对象都有一个dep实例，当数据发生变更的时候，会通过notify()去通知各个watcher

* 依赖收集
  * initState：对computed属性初始化的时候，就会触发computed watcher依赖收集
  * 对watcher属性初始化的时候，会触发user watcher依赖收集
  * render：渲染的时候触发render watcher

* 派发更新

  Object.defineProperty()

  * 组件中对响应的数据进行了修改，会触发setter逻辑。
  * dep.notify()
  * 遍历所有的subs，调用每一个watcher的update方法

当创建Vue实例的时候，Vue会编译data内的属性，通过使用Object.defineProperty为属性添加getter/setter进行劫持, getter用于收集依赖，setter用于派发更新，且每个组件的实例都会有相应的watcher实例

### 计算属性的实现原理

computed watcher持有一个dep实例，通过dirty属性标记计算属性是否需要重新求值。

当computed的依赖值改变后，就会通知订阅的watcher进行更新，对于computed watcher会将dirty属性设置为true，并且进行计算属性方法的调用

























## React



## Ig

### 查看某个数据结构占用多少内存(字节)

```js
const testData = {
    a: 111,
    b: 'cccc',
    2222: false,
};
function calculator (obj) {
  let objType = typeof obj;
  switch(objType) {
  	case 'string':
      return object.length * 2;
    case 'boolean':
      return 4;
    case 'number':
      return 8;
    case 'object': {
      if (Array.isArray(obj)) {
        return obj.map(calculator).reduce((prev, cur) => prev + cur, 0)
      } else {
        return sizeOfObject(obj);
      }
    },
    default: 
      return 0;
  }
}
let ws = new WeakSet();
function sizeOfObject(obj) {
  let bytes = 0;
  let keys = Object.keys(obj);
  for(let i = 0; i < keys.length; i++) {
    bytes += calculator(keys[i]);
    let key = keys[i];
    if (typeof obj[key] === 'object' && object[key] !== null) {
      if (ws.has(obj[key])) {
        continue;
      } 
      ws.add(obj[key]);
    }
    bytes += calculator(obj[key])
    
  }
  return bytes
}
```





### 接雨水问题(字节)

给定n个非负整数表示每个宽度为1的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水

示例1：

输入： height = [0,1,0,2,1,0,1,3,2,1,2,1];

输入：6

interpretation:上面是由数组[0,1,0,2,1,0,1,3,2,1,2,1]表示的高度图，在这种情况下，可以接6个单位的雨水

示例2：

输入： height=[4,2,0,3,2,5]

输出：9

```js
/*
	穷举法：我们计算dp[i]中能接多少雨水
		我们首先找到当前元素左边最大的，然后找到当前元素右边最大的，找到之后然后用两个中更小的那个(木桶)减去dp[i]的高度就是
		dp[i]中可以接到的雨水了
*/
let arr = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];

function trap(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('参数必须是数组');
  }
  let n = arr.length;
  if (n === 0) {
    return 0;
  }
  
  let res = 0;
  for(let i =1; i < n - 1; i++) {
    let l_max = arr[0];
  	let r_max = arr[n - 1];
    for(let j = 1; j < i; j++) {
      l_max = Math.max(l_max, arr[j]);
    }
    for (let j = i + 1; j < n; j++) {
      r_max = Math.max(r_max, arr[j])
    }
    res += Math.max(0, Math.min(l_max, r_max) - arr[i]);
  }
}
/*
时间复杂度 o(n^2);
空间复杂度 o(1)
*/
```

```js
/*
	动态规划解题：

*/
let arr = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
function trap(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('参数必须是数组');
  }
  let n = arr.length;
  if (n === 0) {
    return 0;
  }
  
  let res = 0;
  let leftArr = new Array(n).fill(0);
  let rightArr = new Array(n).fill(0);
  leftArr[0] = arr[0];
  rightArr[n - 1] = arr[n - 1];
  for(let i = 1; i < n; i++) {
    leftArr[i] = Math.max(leftArr[i - 1], arr[i]);
  }
  for (let j = n - 2; j >= 0; j--) {
    rightArr[j] = Math.max(rightArr[j + 1], arr[j])
  }
  for (let i = 0; i < n; i++) {
    let min = Math.min(leftArr[i], rightArr[i])
    if (min > arr[i]) {
      res += min - arr[i]
    }
  }
  return res;
}
/*
	时间复杂度O(n), 空间复杂度O(n)
*/
```

```js
/*
	双指针
	
*/
let arr = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];

function trap(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('参数必须是数组');
  }
  let n = arr.length;
  if (n === 0) {
    return 0;
  }
  let r_max = 0;
  let l_max = 0;
  let left = 0;
  let right = n - 1;
  let res = 0;
  while (left <= right) {
    l_max = Math.max(l_max, arr[left]);
    r_max = Math.max(r_max, arr[right]);
    if (l_max < r_max) {
      res += l_max - arr[left];
      left++;
    } else {
      res += r_max - arr[right];
      right--;
    }
  }
  return res;
}
/*
	时间复杂度：o(n)
	空间复杂度：o(1)
*/
```



### 01背包问题

```js

```









## Webpack

### webpack中的module指的什么

module就是模块，一个文件就是一个模块

webpack支持ESModule， CommonJS，AMD，Asset.(image, font, video, audio)

#### ESM

export: 允许你将ESM中的内容暴露给其他模块

 import: 允许其他模块引入ESM中的内容      

```js
import {aa} from './a.js'
export {bb}
```



#### CommonJS

module.exports: 允许你将CommonJS中的内容暴露给其他模块

require: 允许其他模块引入CommonJS中的内容

### Webpack Modules如何表达自己的各种依赖关系

通过ESM的import语句或者CommonJS的require语句来引入其他模块



### 我们常说的chunk和bundle有什么区别(!!!!)

#### chunk

chunk是webpack打包过程中的Modules的集合，是打包过程中的概念

webpack从一个入口模块开始，引入其他模块，其他模块又引入了另外的模块，webpack通过引用关系逐步打包模块，这些模块形成了一个chunk

如果有多个入口模块，那么就会有多条打包路径，每条路径都会形成一个chunk

#### bundle

bundle是webpack打包后的产物，是webpack打包之后最终输出的一个或者多个打包好的文件

#### chunk和bundle的关系

一个chunk对应一个bundle，当设置了sourcemap的时候，一个chunk会对应两个bundle

chunk是过程中的代码块，bundle是打包结果输出的代码块，chunk完成构建后就呈现为bundle



#### 下面的配置会产生几个chunk

```js
module.exports = {
    mode: 'production',
    entry: {
        // 这种情况下产生的还是一个chunk
        // index: ['./src/index.js', './src/add.js']
        // 下面这种情况会有两个chunk，因为有devtool，所以会有四个bundle(dist文件中的就是bundle) 
        index: './src/index.js',
        other: './src/multiply.js'
    },
    output: {
        filename: '[name].js'
    },
    // devtool: 'source-map', // 会产生double bundle
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                commons:{
                    chunks: 'initial',
                    minChunks: 2, // 如果两个文件用到了同一行，那么就生成一个chunk
                    minSize: 0 //提出来的commonChunk最小的体积为0时才能生成一个chunk
                },
                vendor: { // 打包第三方包
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    enforce: true
                }
            }
        }
    }
};
```



### Plugin和Loader分别是做什么的？怎么工作的？

#### Loader

模块转换器，将非js模块转换为webpack能识别的js模块

本质上，webpack loader将所有类型的文件，转换为应用程序的依赖图可以直接饮用的模块



#### plugin

本质上是一个扩展，运行在webpack打包的各个阶段，webpack打包的各个阶段都会广播出对应的事件。然后插件就是去监听对应的事件



#### Compiler

是一个对象，包含了webpack环境的所有配置信息，包含options、loaders、plugins，在webpack启动的时候实例化，他在全局是唯一的，也可以将其理解为webpack的实例



#### Compliation

包含了当前的模块资源、编译生成资源等等，当webpack在开发模式下运行的时候，每当检测一个文件变化时，就会创建一次新的Compliation

### 简单描述一下webpack的打包过程

1. 初始化参数：shell webpack.config.js中配置的
2. 开始编译：初始化一个Compiler对象，加载所有的配置，开始执行编译
3. 确认入口：根据entru中的配置找到所有的入口文件
4. 编译模块：从入口文件开始，调用所有的loader，再去递归的找模块的依赖关系
5. 完成模块的编译：得到每个模块被翻译成的最终内容，以及他们之间的依赖关系
6. 输出资源：根据刚才得到的依赖关系，组装成一个个包含多个module的chunk
7. 输出完成：根据配置，确定要输出的文件名以及文件路径





## Node



## HTTP

### 聊一下HTTP请求相关

#### 1. 平时怎么解决跨域问题

1. jsonp
2. cors
3. Node 正向代理：如果有一个api，跨域了，此时我们可以将其转发到同域的node服务上，然后在node服务上继续请求/api，然后将数据返回给前端(跨域只限于浏览器端)
4. Nginx 反向代理， proxy_pass. /api --> /same/api



### 三次握手四次挥手

#### 三次握手

1. 第一次握手：客户端发送一个请求连接报文
2. 第二次握手：服务端收到客户端发送的请求连接报文之后，给客户端发送一个响应报文，表示我已经收到了
3. 第三次握手：客户端发送请求，表示自己要发送数据了(防止已经失效的请求报文段突然传到了服务端，然后服务端以为是客户端新传过来的，发送响应报文，建立连接)



#### 四次挥手

1. 客户端向服务端发送释放报文段，并停止发送数据
2. 服务端收到了之后，发出响应报文段，表示自己已经知道了，此时处于半关闭状态，即A没有数据发送到b了，但是b还可以发送给数据到a
3. 服务端没有要发送的数据之后，此时服务端向客户端发送释放请求报文
4. 客户端收到了之后，向服务端发送响应报文，收已经收到

#### 输入URL到页面渲染的整个流程

1. 首先在页面中输入一个url地址的时候，会做一个DNS查询，通过DNS查询到具体的IP

   查询过程：

   1. 首先会在本地缓存中查询ip
   2. 没有的话就去系统配置的本地DNS服务器中查询
   3. 如果还没有的话，就会直接去DNS根服务器查询
   4. 然后去该服务器查询二级域名
   5. 接下来三级域名的查询是我们自己配置的

2. 客户端和服务端经过三次握手，简历TCP连接，浏览器向服务器发送http请求

3. 服务器处理请求，并返回状态码和html文件

4. 此时浏览器会判断状态码是什么，如果是200就解析，如果是400、500就报错，如果是300就重定向

5. 之后浏览器会开始解析html结构，加载外部脚本以及资源文件，解析执行脚本，根据html构建解析dom树，css构建cssom树，如果遇到script标签，会判断是否存在async或者defer，前者会并行下载并执行js，后者会先下载文件，等待html解析完成后顺序执行，渲染显示。然后cssom和dom树结合构造出render tree.

6. 构造完毕之后，就是layout，计算出每个阶段在屏幕中的位置

7. 绘制，遍历render树，佳凝器渲染到页面上







## TS









## Chrome

### webp

我们首先要知道webp是有兼容性问题的。所以如何检测浏览器是否支持webp就变成了一个首要前提。所以我们下面通过一个函数来判断浏览器是否支持webp

```js
function supportWebp() {
  // 防止有些浏览器不支持webp报错
  try {
    return doucument.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;
  } catch (e) {
    return false;
  }
}

function getWebomageUrl (url) {
  if (!url){
    throw
  }
  if (url.startsWith('data:')) {
    return url
    
  }
  if (!supportWebp) {
    return url;
  }
  return url + '?x-oss-xxxx';
}
```

上述代码中，我们创建了一个canvas元素，通过canvas元素的toDataURL()方法将webp转成base64形式的图片，如果转换之后的url包含

`data:image/webp`, 那么就说明浏览器支持wbep，否则就说明不支持  



toDataURL中的参数，默认是`image/png,如果传入参数后，返回的url还是以data:image/png开头的话，那么就说明浏览器不支持这个类型

### 垃圾回收器的优缺点

**优点**

可以大幅度的简化程序的内存管理代码，同时也减少了长时间运转的程序的内存泄露

**缺点**

程序中无法完全掌控内存，ECMA标准中没有暴露任何垃圾回收的接口

### 垃圾回收算法

#### 回收栈空间

栈空间是后进先出的数据结构，当有某个函数执行完毕后或者全局代码执行完毕后，上下文就会出栈，此时指向当前执行上下文的指针就会下移，下移之后，已经执行完的这个上下文就会被销毁了，当有新的上下文进入时，就会直接覆盖被销毁的上下文

#### 回收堆空间

##### 组成

1. 新生区：用来存放生存周期较短的小对象，一般只支持1-8M的容量
2. 老生区：用来存放生存周期较长的对象或者大对象
   1. 指针区：主要存放指向其他对象的指针的对象，大多数在新生区存活一段时间之后的对象都会被挪到这里。
   2. 数据区：这里存放只包含原始数据的对象（这些对象没有指向其他对象的指针）。字符串、封箱的数字以及未封箱的双精度数字数组，在新生区存活一段时间后会被移动到这里。
   3. 大对象区：这里存放体积超越其他区大小的对象。每个对象有自己`mmap`产生的内存。垃圾回收器从不移动大对象。
3. **代码区**：代码对象，也就是包含JIT之后指令的对象，会被分配到这里。这是唯一拥有执行权限的内存区

分代回收

**新生代**

新生代使用副垃圾回收器(Scavenge算法)

将新生代空间分为两个区域，一半是对象区域，一半是空闲区域

新加入的对象都加入对象区域，当对象区满的时候，就会进行一次垃圾回收，首先对区域内的对象进行标记，然后进行垃圾清理：将对象区的活动对象复制到空闲区域，并进行有序的排列，复制完成后，对象区域和空闲区域进行翻转，空闲区域晋升为对象区域，对象区域为空闲区域。翻转后，对象区域是没有碎片的。

因为新生区的空间很小，所以采用对象晋升策略，只要对象经过两次垃圾回收之后仍然存活，就会被晋升到老生代区域中



##### 老生代

老生代使用主垃圾回收器(标记-清除)

老生代因为内存空间较大， 所以如果采用Scavenge算法会消耗过大，所以采用**标记-清除**法。

主要流程

1. 标记：遍历调用栈，看老生代区域堆中的对象是否被引用，被引用的对象标记为活动对象 ，没有被引用的对象标记为垃圾数据
2. 清除：将垃圾数据清除
3. 内存整理：标记-整理策略，将所有的活动对象整理到一起，方便留出充足的内存空间

### 增量标记

因为V8浏览器会自动执行垃圾回收，一单旦执行，那么就会打断js的执行，所以会造成页面的卡顿，所以V8决定采用增量标记算法回收

**增量标记**允许堆的标记发生在几次5-10ms的小停顿中，增量标记在堆的大小达到一定的阈值时启用，启用之后每当一定量的内存分配后，脚本的执行就会停顿并进行一次增量标记，增量标记也是深度优先搜索(活跃对象黑色，死对象白色)

### 你了解浏览器的事件循环吗

浏览器的事件循环是：每执行一个宏任务，就去清空微任务队列

#### 为什么浏览器会有事件循环的机制

因为js是`单线程`的，举一个例子，我们都知道js是可以操作DOM的，如果我们同时对一个DOM进行两个操作，一个是删除DOM，一个是修改DOM，那么到底以哪个为准呢，所以js就是单线程的，既然是单线程的，也就是说某个时间段，只能执行一个任务

#### 你了解过event loop吗

了解过

#### 那你知道两种任务类型吗

**宏任务**：整体的script代码，setTimeout，setInterval，I\O操作等等都是宏任务

**微任务** ：new Promise的then、catch、finally的回调，MutationObserver

#### 聊聊 MutationObserver 主要是做什么的

MutationObserver 主要是用来监视对 DOM 的修改，new 的时候会创建并返回一个新的 MutationObserver，他会在指定的 DOM 发生变化时被调用

#### 为什么要同时有宏任务和微任务，只有宏任务可以吗

不可以，因为宏任务是一个队列结构，具有先进先出的性质，如果此时有一个紧急的任务，那么只能排队等候了

#### nodejs和浏览器的事件循环有什么不同呢？

nodejs中宏任务的执行顺序

1. timer定时器：执行已经被安排过的setTimeout和setInterval的回调函数
2. pending、callback回调：执行延迟到下一个事件循环的I\O回调
3. idle、prepare：内部使用
4. poll：检索新的I\O事件，执行相关的I\O回调函数
5. check：执行setImmediate的回调函数
6. close callback：关闭socket

宏任务和微任务的执行顺序

V10之前：

1. 执行一个阶段内的所有的宏任务
2. 执行nextTick的内容
3. 清空微任务队列

V10之后：

1. 执行一个宏任务
2. 执行nextTick
3. 清空微任务队列