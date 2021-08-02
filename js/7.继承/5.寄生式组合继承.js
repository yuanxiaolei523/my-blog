function inherit(Child, Parent) {
    let proto = object(Parent.prototype);
    proto.constructor = Child;
    Child.prototype = proto;
}

function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

function parent () {}
function child () {
    parent.call(this);
}
