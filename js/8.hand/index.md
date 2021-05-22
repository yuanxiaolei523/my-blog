## bind
bind() 方法会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数。

bind的特点
1. 返回的是一个函数
2. 可以传入参数
### 返回函数的模拟实现
```js
var obj = {
    name: 'shine'
} 
function bar () {
    console.log(this.name);
}

var barBind = bar.bind(obj);
barBind(); // shine
```

## call、apply、bind的异同
### 相同
都是为了修改this指向
### 不同
call、bind传入的是一个参数列表，但是apply传入的是一个数组
bind返回一个新的函数，call和apply是立即执行

## new
new的实现过程
1. 创建一个空的js对象
2. 将空对象的原型指向构造函数的原型对象
3. 将this指向这个空对象，执行构造函数中的代码，以获取私有属性
4. 如果构造函数返回了一个对象res，就将该返回值res返回，如果返回值不是对象，就将创建的对象返回