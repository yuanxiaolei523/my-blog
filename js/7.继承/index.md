# 继承

本文主要介绍各种继承方式以及各种继承方式的优缺点

## 格式各样的继承

### 原型链继承

原型链继承就是通过修改原型的方式来实现继承

```js
function Parent() {
	this.name = "shine";
}

Parent.prototype.getName = function () {
	console.log(this.name);
};

function Child() {}
Child.prototype = new Parent();
var c1 = new Child();
c1.getName(); // shine
```

此时调用 c1.getName()会打印原型链上的 name 属性，其值为 shine

#### 缺点：

1. **引用类型**的属性被**所有的实例共享**，只要有一个实例改变了，所有的都会被改变(注意：其实不只是引用类型，基本类型也会变，只不过一般我们访问的时候不会使用c1.\_\_proto\_\_.name去访问, c1.name是为c1添加了一个name属性)

   ```js
   function Parent() {
   	this.obj = {
       name: "shine"
     }
   }
   function Child() {}
   Child.prototype = new Parent();
   var c1 = new Child();
   var c2 = new Child();
   console.log(c1.obj, c2.obj); // { name: 'shine' } { name: 'shine' }
   c1.obj.name = 'stone';
   console.log(c1.obj, c2.obj); // { name: 'stone' } { name: 'stone' }
   Child.prototype.obj.name = "shineStone";
   console.log(c1.obj, c2.obj); // { name: 'shineStone' } { name: 'shineStone' }
   ```

2. 在创建Child的实例时，不能向父类传参

### 借用构造函数

```js
function Parent(age) {
  this.obj = {
    name: 'shine',
    age: age
  }
}

function Child() {
  Parent.call(this, 13);
}
var c1 = new Child();
var c2 = new Child();
console.log(c1.obj.name, c2.obj.name); // shine shine
c1.obj.name = 'stone';
console.log(c1.obj.name, c2.obj.name);// stone shine
```

#### 优点

1. 各个实例间不再共享父类中的属性了
2. 可以在子类中向父类传参

#### 缺点

1. 方法都在构造函数中定义，因此无法实现函数复用
2. 父类的原型中定义的方法对于子类也是不可见的

### 组合继承

组合继承就是将上面的两种方式结合起来

```js
function Parent(age) {
  this.names = ['shine', 'stone'];
  this.age = age;
}

Parent.prototype.getAge = function () {
  console.log(this.age)
}

function Child(age) {
  Parent.call(this, age); //继承构造函数上的属性和方法
}

Child.prototype = new Parent(); // 继承原型上的属性和方法
Child.prototype.constructor = Child; // 将Child原型的constructor属性重新赋值
var c1 = new Child(18);
var c2 = new Child(19);
console.log(c1.names, c2.names)
c1.names.push('shineStone');
console.log(c1.names, c2.names)
```

#### 优点：

1. 各个实例之间不再共享父类中的属性了
2. 可以在子类中向父类传参

#### 缺点：

1. 创建的实例和原型上存在两份相同的属性

2. 会调用两次超类的构造函数

   

### 原型式继承

```js
function createObj(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
```

其本质上就是ES5的Object.create的模拟实现

#### 缺点

包含引用类型的属性值会被所有的实例所共享，一个修改了之后，其他的都会被修改

### 寄生式继承

创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来做增强对象，最后返回对象。

```js
function createObj(o) {
  var clone = Object.create(o);
  clone.sayName = function () {
    console.log('hi');
  }
  return clone;
}
```

#### 缺点

不能做到函数的复用，每一个实例都会有一个sayName函数



### 寄生组合式继承

由于之前的组合继承会存在调用两次超类构造函数的情况，所以我们来看一下寄生组合式继承，寄生组合式继承是通过借用构造函数来继承属性，通过原型链的方式来继承方法

```js
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
};

function prototype (child, parent) {
  var prototype = object(parent.prototype);
  prototype.constructor = child;
  child.prototype = prototype;
}
function parent () {}
function child () {
  parent.call(this);
}
```

```js
// 组合式继承
function parent () {}
function child() {
  parent.call(this);
}
child.prototype = new Parent();
```

只会调用一次parent的构造函数，并且instanceof和getPropertyOf可以正常使用











