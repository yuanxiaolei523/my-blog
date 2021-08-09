const urls = [
    {
        info: 'link1',
        time: 3000,
    },
    {
        info: 'link2',
        time: 3000,
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

function loadImg(url) {
    return new Promise((resolve) => {
        console.log('-----' + url.info + ' start!');
        setTimeout(() => {
            console.log('-----' + url.info + ' ok!');
            resolve();
        }, url.time);
    });
}

function limitLoad(urls, handler, limit) {
    let sequence = [].concat(urls);
    let promises = sequence.splice(0, limit).map((p, index) => {
        return handler(p).then(() => index);
    });
    let p = Promise.race(promises);

    for (let i = 0; i < sequence.length; i++) {
        p = p.then((index) => {
            promises[index] = handler(sequence[i]).then(() => index);
            return Promise.race(promises);
        });
    }

}
limitLoad(urls, loadImg, 3);
