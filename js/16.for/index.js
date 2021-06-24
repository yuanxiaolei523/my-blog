function myFor () {
    for(let i = 0; i < 5; i++) {
        if (i === 1 ){
            console.log(i);
            return;
        }
    }
    console.log(123);
}
myFor()