new Promise(resolve => {
    resolve(1);
}).then(res => {
    console.log(res);
    setTimeout(() => {
        new Error('123');
    });

}).then(res => {
    console.log(res);
    return '123';

}).catch(res => {
    console.log(res);
}).finally(() => {
    console.log('456');
});