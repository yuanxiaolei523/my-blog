import Vue from './my-vue/vue.js';

const vm =  new Vue({
    el: '#app',
    data: {
        msg: 'hello world',
    },
    methods: {
        handler() {
            alert(111)
        }
    }
})
console.log(vm);