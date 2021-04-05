let obj = {
    name: 123,
    getName: () => {
        console.log(this, this.name);
    },
};

let getName = obj.getName;
getName();
// console.log(getName);
