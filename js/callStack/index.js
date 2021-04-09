function cycle () {
    var o1 = {};
    var o2 = {};
    o1.a = o2;
    o2.a = o1;
    console.log(o1, o2)
}
cycle()