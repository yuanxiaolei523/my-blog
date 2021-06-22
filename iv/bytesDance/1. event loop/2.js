console.log('start');
setTimeout(() => {
    console.log('children2');
    Promise.resolve().then(() => {
        console.log('children3');
    });
}, 0);

new Promise((resolve) => {
    console.log('children4');
    setTimeout(() => {
        console.log('children5');
        resolve('children6');
    }, 0);
}).then((res) => {
    console.log('children7');
    setTimeout(() => {
        console.log(res);
    });
});

// start=>children4=>children2=>children3=>children5=>children7=>children6
// 栈 setTimeout=>promise setTimeout =>
// 队列 children3