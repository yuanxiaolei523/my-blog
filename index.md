#### 如何实现add(1)(2)(3)(4)....
```js
function curry (x) {
    function add (y) {
        x = x + y;
        return x;
    }
    add.toString = function () {
        return x;
    };
    return add;
}
```