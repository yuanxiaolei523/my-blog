# recast

Recase暴露了两个基本的接口，一个是parse()用于解析js为ast，一个print()用于将ast渲染成ast树

## case
```js
import * as recast from "recast";

const code = [
  "function add(a, b) {",
  "  return a +",
  "    // Weird formatting, huh?",
  "    b;",
  "}"
].join("\n");

const ast = recast.parse(code)

```