
/**
 * 1. 当所有的promise resolve之后resolve
 * 2. 输入顺序和输出顺序相同
 * 
 * @param {*} promises 
 * @returns 
 */
function MyPromiseAll(promises) {
    if (!Array.isArray(promises)) {
        return;
    }
    let resArr = [];
    let count = 0;
    return new Promise((resolve, reject) => {
        promises.forEach((p, index) => {
            Promise.resolve(p).then(res => {
                resArr[index] = res;
                count++;
                if (count === promises.length) {
                    resolve(resArr);
                }
            }).catch(() => {
                reject();
            });
        });
    });
    
}

const p1 = new Promise((res) => {
    setTimeout(() => {
        res('1');
    }, 1000);
});
const p2 = new Promise((res) => {
    setTimeout(() => {
        res('2');
    }, 2000);
});

const p3 = new Promise((res) => {
    setTimeout(() => {
        res('3');
    }, 4000);
});
MyPromiseAll([p1, p2, p3])
    .then((res) => console.log(res))
    .catch((e) => {
        console.log(e);
    });
