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

1. **引用类型**的属性被**所有的实例共享**，只要有一个实例改变了，所有的都会被改变

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

方法都在构造函数中定义，每次创建实例都会执行一遍方法

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
  Parent.call(this, age);
}

Child.prototype = new Parent();
var c1 = new Child(18);
var c2 = new Child(19);
console.log(c1.names, c2.names)
c1.names.push('shineStone');
console.log(c1.names, c2.names)
```





























