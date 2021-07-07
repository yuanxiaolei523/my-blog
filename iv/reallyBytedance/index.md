function myPromiseAll(arr) {
    if (!Array.isArray(arr)) {
        throw new Error ('必须是一个数组');
    }
    return new Promise((resolve, reject) => {
        let resArr = [];
        let count = 0;
        for (let i = 0; i < arr.length; i++) {
            Promise.resolve(arr[i]).then(res => {
                count++;
                resArr.push(res);
                if (count === arr.length) {
                    resolve(resArr);
                }
            }).catch(err => reject(err));
        }
    })
}

// try ...catch








function main() {
    async function async1() {
      console.log('async1 start');
      await async2();
      console.log('async1 end');
    }
    async function async2() {
      console.log('async2');
    }
    console.log('script start');
    setTimeout(function() {
      console.log('setTimeout');
    }, 0);
    async1();
    new Promise(function(resolve) {
      console.log('promise1');
      resolve();
    }).then(function() {
      console.log('promise2');
    })
    console.log('script end');
}
main()

// script start -> async1 start -> async2 -> promise1 -> script end -> async1 end -> promise2 -> setTimeout

有什么捕获异常的方式吗
try...catch可以捕获所有异常吗 // finish
https的加密
是对称还是非对称
http的请求方法、状态码、头部
    form表单的content-type类型
    get请求可以有请求体吗
    post可以吗
缓存:强缓存和协商缓存。包括分别返回的状态码  // finish
session两个窗口打开同一个页面
单点登录
为什么要有宏任务和微任务队列
数据类型：Symbol和bigInt
底层存值的问题
为什么最大值是2*52 - 1和-2*52 + 1
Promise.all
函数
项目介绍
eslint配置
webpack配置
cookie 的domian属性
添加事件时同步的吗 
    WebAPIs是由C++实现的浏览器创建的线程，处理诸如DOM事件、http请求、定时器等异步事件;
    Event Loop是由javascript宿主环境（像浏览器）来实现的;
洋葱模型
eslint的配置 // finish
eslint想要使用jquery的全局的$
  env: {jquery: true}

跨域