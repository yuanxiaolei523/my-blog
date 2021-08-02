function limitLoad(urls, handler, limit) {
    const sequence = [].concat(urls); // 尽量不要影响到外在的数组或对象
    let promises = []; // 用来存储要执行的promise
    promises = sequence.splice(0, limit).map((url, index) => {
        return handler(url).then(() => {
            return index;
        });
    });

    // 此时是最快的那个执行完毕了
    let p = Promise.race(promises); 
    // 已经完成一个了，那么在并发数小于limit的条件下，在原位置增加一个新的promise执行
    for (let i = 0; i < sequence.length; i++) {
        p = p.then((res) => {
            // res 为索引
            promises[res] = handler(sequence[i]).then(() => {
                return res;
            });
            return Promise.race(promises); // then内部返回的是
        });
    }
}
function loadImg(url) {
    return new Promise((resolve) => {
        console.log('-----' + url.info + ' start!');
        setTimeout(() => {
            console.log('-----' + url.info + ' ok!');
            resolve();
        }, url.time);
    });
}

const urls = [
    {
        info: 'link1',
        time: 3000,
    },
    {
        info: 'link2',
        time: 2000,
    },
    {
        info: 'link3',
        time: 5000,
    },
    {
        info: 'link4',
        time: 1000,
    },
    {
        info: 'link5',
        time: 1200,
    },
    {
        info: 'link6',
        time: 2000,
    },
    {
        info: 'link7',
        time: 800,
    },
    {
        info: 'link8',
        time: 3000,
    },
];



// limitLoad(urls, loadImg, 3);


function limitLoad2(urls, handler, limit) {
    let sequence = [].concat(urls);
    let promises = urls.splice(0, limit);
    promises = promises.map((p, index) => handler(p).then(() => index));
    let p = Promise.race(promises);
    for (let i = 0; i < sequence.length; i++) {
        p = p.then((index) => {
            promises[index] = handler(sequence[i]).then(() => index);
            return Promise.race(promises);
        });
    }
}   
limitLoad2(urls, loadImg, 3);