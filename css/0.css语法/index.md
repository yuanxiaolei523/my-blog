

## 类型

### root类型

root类型是其他任何类型的父类型，他位于css的ast的最顶层

<img src="/Users/qitmac001126/Library/Application Support/typora-user-images/image-20210517151038428.png" alt="image-20210517151038428" style="zoom:50%;" />

### 主要有三种父类型

1. Atrule: @xxx的这种类型，比如@screen，@media等等
2. comment：注释
3. rule：普通的css规则

### 主要的子类型

1. decl:指的是每条具体的css规则
2. rule:作用于某个选择器上的css规则集合

### ast节点的内容

1. nodes：css规则的节点信息集合
   1. decl：每条css规则的节点信息
      1. prop：css的样式名
      2. value：css的样式值
      3. type：decl
      4. source
   2. 注意：type为root类型的nodes的结构并不是这样子
2. type：表示该节点是什么类型
3. source：包括start和end的位置信息，start和end里面都有line和column表示行和列
4. selector：type为rule时的选择器
5. name：type为atRule时紧接@后的值, @import 'xxx.css'`中的`import
6. params：type**atRule**时@紧接rule名后的值，譬如`@import 'xxx.css'`中的`xxx.css`
7. text：type为**comment**时的注释内容

