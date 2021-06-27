import { once } from 'lodash';
import add from './add';
import multiply from './multiply';
// import 
const onceAdd = once(Add); // 只会执行一次

const addResult = add(1, 2);
const mulResult = multiply(2, 3);
console.log(addResult, mulResult);