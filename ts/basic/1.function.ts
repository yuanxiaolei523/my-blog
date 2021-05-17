function flatten(arr: any) {
    var ret: any =[];
    arr.map(function(el: any) {
        if (Array.isArray(el)) {
            ret = ret.concat(el);
        } else{
            ret.push(el);
        }
    });
    return ret;
}