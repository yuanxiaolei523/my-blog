# module
## 1. 概述
在ES6之前，有两种模块加载方案，一种是CommonJS，一种是AMD，前者用于服务端，后者用于浏览器，ES6中采用了一种新的方案，来同时满足服务端和客户端的模块加载

### 设计思想
ES6的设计思想就是想尽量的静态化，使得**编译时**就能确定模块间的依赖关系，以及输入和输出的变量，而CommonJS和AMD都只能在**运行时**才能确定

### CommonJs
CommonJS输出的其实就是对象
```js
let { stat, exists } =  require('fs');
// 其实等同于

let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
```
CommonJS其实就是**整体**加载fs模块，将fs内所有的方法和属性变成一个对象，然后在读取对象内的属性和方法,这种加载称为运行时加载，只有在运行时才能得到这个对象
,导致无法在编译时做静态优化

#### ES6
ES6 模块不是对象，而是通过export命令显式指定输出的代码，再通过import命令输入。

```js
 import { stat, exists, readFile } from 'fs';
```
上面的代码只是加载了这三个方法，这种加载称为编译时加载或者静态加载，即ES6可以在编译时就完成模块加载，当然这也导致了一个问题，ES6无法引用模块本身，因为不是一个对象

##### 好处
- 不再需要UMD模块格式了，将来服务器和浏览器都会支持 ES6 模块格式。目前，通过各种工具库，其实已经做到了这一点。
- 将来浏览器的新 API 就能用模块格式提供，不再必须做成全局变量或者navigator对象的属性。
- 不再需要对象作为命名空间（比如Math对象），未来这些功能可以通过模块提供。

## 2. 严格模式
ES6自动开启严格模式，严格模式的主要限制
- 变量必须声明后在使用
- 函数的参数不能有同名属性，否则报错
- 不能使用with语句
- 不能对只读属性赋值，否则报错
- 不能使用前缀 0 表示八进制数，否则报错
- 不能删除不可删除的属性，否则报错
- 不能删除变量delete prop，会报错，只能删除属性delete global[prop]
- eval不会在它的外层作用域引入变量
- eval和arguments不能被重新赋值
- arguments不会自动反映函数参数的变化
- 不能使用arguments.callee
- 不能使用arguments.caller
- 禁止this指向全局对象
- 不能使用fn.caller和fn.arguments获取函数调用的堆栈
- 增加了保留字（比如protected、static和interface）

在ES6中，顶层的this指向undefined

## 3. export命令
ES6的模块功能主要由两个命令组成，**export**和**import**，export用于对外暴露模块，import用于导入模块

一个模块就是一个独立的文件，该模块内的所有变量，外界无法获取，如果你希望外部能够读取模块内部的某个变量，就必须使用export关键字输出该变量
```js
// profile.js
export var firstName = 'zhang';
export var lastName = 'san';
```
上面代码是profile.js文件，保存了用户信息。ES6 将其视为一个模块，里面用export命令对外部输出了三个变量。

export的写法除了上面那样之外，还有一种写法
```js
var firstName = 'zhang';
var lastName = 'san';
export {firstName, lastName};
```
推荐使用这种方式，因为通过这种方式，我们可以一看就看出来该模块导出了哪些变量

### as关键字
我们在对外导出的时候，可以通过**as**关键字对导出的变量或者函数、类进行重命名
```js
// test.js
function getName(firstName, secondName) {
    return firstName + secondName;
}
export {getName};
```
```js
// index.js
import {getName} from './test.js';
console.log(getName('zhang', 'san')) // zhangsan
```

使用as进行重命名之后
```js
// test.js
function getName(firstName, secondName) {
    return firstName + secondName;
}
export {getName as getName2};

// index.js
import {getName2} from './test.js';
console.log(getName2('zhang', 'san')) // zhangsan
```
上面显示的是在export的时候进行重命名，这样的好处就是我们可以导出这个函数多次，当然我们也可以在导入的时候进行重命名
```js
// index.js
import {getName as getName2} from './test.js';
console.log(getName2('zhang', 'san')) // zhangsan
```

需要特别注意的是，export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。
```
// 报错
export 1;

// 报错
var m = 1;
export m;
```
export 1 对外暴露了一个1，import时无法正常导入，export m最后导出的还是1，所以也不是对外暴露了一个接口，正确的写法有以下三种
```js
// 写法一
export var m = 1;

// 写法二
var m = 1;
export {m};

// 写法三
var n = 1;
export {n as m};
```
上面都是对外暴露了接口m，其他的脚本可以通过m取到值1，其本质是在接口名与模块内部变量之间，建立了一一对应的关系

注意： export语句导出的接口，与其对应的值是动态绑定的，即通过该接口，我们能取到模块内部实时的值

### import
通过export命令导出的接口，可以用import 命令加载这个模块
```js
// main.js
import { firstName, lastName, year } from './profile.js';

function setName(element) {
  element.textContent = firstName + ' ' + lastName;
}
```
import变量接受一对大括号，里面指定要从其他模块引入的变量名，括号内的变量名必须和使用export导出时的一致

如果想要为变量重新命名，那么我们可以使用as，可以参考上一章的as

通过import引入的变量都是**只读**的，因为他的本质是一个输入接口，所以**不允许在加载模块的脚本里面修改接口**
```js
import {a} from './index.js';

a = {}
```
如果a是一个对象，那么我们可以修改a的属性，但是这种方法我们不<font color='red'>推荐</font>

```js
import {a} from './index.js';
a.name = 'lisi';
```
import后面的from指定模块文件的位置，可以是相对路径，也可以是绝对路径。如果不带有路径，只是一个模块名，那么必须有配置文件，告诉 JavaScript 引擎该模块的位置。

注意，import命令具有**提升**效果，会提升到整个模块的头部，首先执行。
```js
foo();

import { foo } from 'my_module';
```
上面的代码不会报错，因为import的执行会早于foo的调用，这种行为的本质就是import是在<font color="red">编译阶段</font>执行的，在其他代码执行之前

由于import是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。
```js
// 报错
// import { 'f' + 'oo' } from 'my_module';

// 报错
// let module = 'my_module';
// import { foo } from module;

// 报错
// if (x === 1) {
// import { foo } from 'module1';
// } else {
// import { foo } from 'module2';
```

最后，import语句会执行所加载的模块，因此可以有下面的写法。
```js
import 'lodash';
```
如果多次重复执行同一句import语句，那么只会执行一次，而不会执行多次。
```js
import { foo } from 'my_module';
import { bar } from 'my_module';

// 等同于
import { foo, bar } from 'my_module';
```
上面代码中，虽然foo和bar在两个语句中加载，但是它们对应的是同一个my_module模块。也就是说，import语句是 Singleton 模式。

## 5. 模块的整体加载
上面我们都是通过import引入单独的模块，同时我们可以加载整个模块，首先我们看下语法
```js
// test.js
function getArea(rect) {
    return Math.PI * Math.pow(rect, 2);
}

function getLength(rect) {
    return 2 * Math.PI * rect
}
```
```js
// index.js

import * as circle from './test.js';

console.log(circle.getArea(2));
console.log(circle.getLength(2));
```

## 7. export default
1. 为什么有了export命令，还需要export default命令呢
首先我们看到，使用import的时候，我们必须要知道export命令导出的变量名，否则无法正常加载。但是新用户可能不知道模块内部有哪些变量和方法，所以export default 出现了
   
export default可以为模块指定默认输出（可以理解为输出一个匿名函数，本质上是输出一个名为default的变量和方法）
```js
// test.js
export default function getNumber() {
  return 123
}

// index.js
import number from './test.js';
console.log(number()); // 123
```
上面我们暴露的方法是getNumber，但是我们引入的时候将其命名为number，而且可以正常打印123了。要注意的一点是，import后面没有大括号了

一个模块只能有一个export default命令。export default可以和export同时存在
```js
// modules.js
function add(x, y) {
  return x * y;
}
export {add as default};
// 等同于
// export default add;

// app.js
import { default as foo } from 'modules';
// 等同于
// import foo from 'modules';
```
由于export输出的是一个名为default的变量，所以他后面不能跟变量声明语句
```js
// 正确
export var a = 1;

// 正确
var a = 1;
export default a;

// 错误
// export default var a = 1;
```
上面代码中，export default a的含义是将变量a的值赋给变量default。所以，最后一种写法会报错。
同样地，因为export default命令的本质是将后面的值，赋给default变量，所以可以直接将一个值写在export default之后。

```js
// 正确
export default 42;

// 报错
// export 42;
```
上面代码中，后一句报错是因为没有指定对外的接口，而前一句指定对外接口为default。

```js
import _, { each, forEach } from 'lodash';

export default function (obj) {
    // ···
}

export function each(obj, iterator, context) {
    // ···
}

export { each as forEach };
```
上面代码的最后一行的意思是，暴露出forEach接口，默认指向each接口，即forEach和each指向同一个方法。

## 7. export 与 import 的复合写法
如果在一个模块之中，先输入后输出同一个模块，import语句可以与export语句写在一起。
```js
export { foo, bar } from 'my_module';

// 可以简单理解为
import { foo, bar } from 'my_module';
export { foo, bar };
```
上面代码中，export和import语句可以结合在一起，写成一行。但需要注意的是，写成一行以后，foo和bar实际上并没有被导入当前模块，
只是相当于**对外转发**了这两个接口，导致当前模块不能直接使用foo和bar。

模块的接口改名和整体输出，也可以采用这种写法。

```js
// 接口改名
export { foo as myFoo } from 'my_module';

// 整体输出
export * from 'my_module';
```

ES2020可以支持下面这种写法
```js
export * as ns from "mod";

// 等同于
import * as ns from "mod";
export {ns};

```

注意：`export *` 语句会忽略模块的default方法

## import()
import无法在运行时加载模块，所以我们通过import()在运行时加载模块
```js
if(true) {
    import('./index.js')
}
```
import函数可以用于任何地方，不一定非要在模块作用域的顶层

### 适应场合
1. 按需加载
```js
button.addEventListener('click', event => {
  import('./dialogBox.js')
  .then(dialogBox => {
    dialogBox.open();
  })
  .catch(error => {
    /* Error handling */
  })
});

```
上面代码中，import()方法放在click事件的监听函数之中，只有用户点击了按钮，才会加载这个模块。

2. 条件加载
   import()可以放在if代码块，根据不同的情况，加载不同的模块。

3. 动态的模块路径
   
```js
import(f())
.then();
```
上面代码中，根据函数f的返回结果，加载不同的模块。

**注意**
import()加载模块成功以后，这个模块会作为一个对象，当作then方法的参数。因此，可以使用对象解构赋值的语法，获取输出接口。
```js
import('./myModule.js')
.then(({export1, export2}) => {
  // ...·
});
```
如果模块有default输出接口，可以用参数直接获得。
```js
import('./myModule.js')
.then(myModule => {
  console.log(myModule.default);
});
```
如果想要加载多个模块
```js
Promise.all([
  import('./module1.js'),
  import('./module2.js'),
  import('./module3.js'),
])
.then(([module1, module2, module3]) => {
   // ···
});
```
当同时有export default和export的时候，想要将default重命名
```js
import('./test.js')
.then(({default: getNumber, getName}) => {
    console.log(getNumber, getName)
})
```



## CommonJS和ES6的区别
1. ES6中是在编译时确定模块间的依赖关系以及输入输出的变量，CommonJS是在运行时才能确定
2. ES6导出的是接口，这些接口与模块内部的变量一一对应，CommonJS导出的是整个模块对象
3. ES6通过接口取值可以取到实时的值，CommonJS模块输出的是值的缓存
4. export和import可以出现在当前模块的任意**顶层**的位置，CommonJS不可以