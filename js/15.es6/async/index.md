## async/await的实现原理
async/await的实现原理
```js
async function fn(args) {

}
// 等同于
function fn(args) {
    return spawn(function * () {})
}
```
spawn就是自动执行器

下面给出spawn函数的实现，基本就是前文自动执行器的翻版。

```js
function spawn(genF) {
    return new Promise((resolve, reject) => {
        const gen = genF(); // generator函数，返回迭代器
        function step (nextF) { 
            let next;
            try {
                next = nextF();

            } catch(e) {
                reject(e)
            }
            if (next.done) {
                return resolve(next.value);
            }
            Promise.resolve(next.value).then(v => {
                step(function () {
                    return gen.next(v)
                }, (e) => {
                    step(function() { return gen.throw(e); });
                }),
            })
        }
        step(function() { return gen.next(undefined); });
    })
}
```