
/**
 * 1. 当所有的promise resolve之后resolve
 * 2. 输入顺序和输出顺序相同
 * 
 * @param {*} promises 
 * @returns 
 */
function MyPromiseAll (arr) {
    
    return new Promise((resolve, reject) => {
        if (!Array.isArray(arr)) {
            reject('必须传入的是一个数组');
            return;
        }
        let resArr = [];
        let count = 0;
        let len = arr.length;
        arr.forEach((p, index) => {
            Promise.resolve(p).then(res => {
                count++;
                resArr[index] = res;
                if (count === len) {
                    resolve(res);
                }
            }).catch(e => {
                reject(e);
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
