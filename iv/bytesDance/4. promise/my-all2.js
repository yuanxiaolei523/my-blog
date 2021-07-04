function MyPromiseAll(promiseArr) {
    if (!Array.isArray(promiseArr)) {
        throw new Error('');
    }
    return new Promise((resolve, reject) => {
        let res = [];
        if (promiseArr.length === 0) {
            resolve(res);
        }
        let count = 0;
        for (let i = 0; i < promiseArr.length; i++) {
            // const element = promiseArr[i];
            // promiseArr[i].then(thenres => {
            //     res[i] = thenres;
            //     index++;
            // });
            Promise.resolve(promiseArr[i]).then(value => {
                count++;
                res[i] = value;
                if (count === promiseArr.length) {
                    resolve(res);
                }
            }).catch((e) => reject(e));
            
        }
        
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
MyPromiseAll([])
    .then((res) => console.log(res))
    .catch((e) => {
        console.log(e);
    });
