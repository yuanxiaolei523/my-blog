## arguments

### arguments对象的组成
#### length
我们知道伪数组中有length属性，可以获取到这个伪数组的长度(当然length的值是可以修改的)
```js
function getName(a, b, c) {
    console.log(arguments.length) // 1
}

getName(1) 

getName.length // 3
```
由上面我们可以得知，`arguments.length`获取到的是`实参`的个数，`函数名.length`获取到的是`形参`的个数

#### callee
Arguments 对象的 callee 属性，包含当前正在执行的函数
```js
function getName(a, b, c) {
    if(a == 1) {
        return 2 * arguments.callee(4)
    }
    return a;
}

console.log(getName(1)); // 8
```

#### arguments对象和各个参数的绑定
传入的参数，实参和 arguments 的值会共享，当没有传入时，实参与 arguments 值不会共享
```js
function getName(a, b, c) {
    a = 2;
    console.log(arguments[0]); // 2
    b = 2;
    console.log(arguments[1]); // undefined
}
getName(1);
```

#### 伪数组转数组
```js
let arguments = {
    0: 1,
    2: 3,
    length: 4
}

// 1
Array.from(arguments);
// 2
[].concat.apply([], arguments)
// 3
Array.prototype.slice.call(arguments)
// 4
Array.prototype.splice.call(arguments, 0);
// 5
[...arguments]
```