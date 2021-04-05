let obj = {
    name: 124,
};

let o = Object.create(obj);

delete o.name;
console.log(o.name);
