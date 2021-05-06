# flex

## the priority of flex-basis and width and max-width and min-width
1. 当flex-basis设置值之后
如果没有max/min-width, 当flex-basis设置了值之后，会直接忽略width属性，flex-basis的值是多少，元素的宽度就是多少
如果有max/min-width, 那么如果flex-basis设置的值超过了max-width或者低于了min-width，那么将会以max/min-width为准
2. 当flex-basis没有设置值时，那么以width的优先级为准

## what is the differ or the similar when the value of flex-basis and width is 100 

### similar
1. 相似之处就是当容器的宽度不足时，弹性收缩的效果一样
### difference
1. 不同之处就是当内容的宽度过大时，在容器的宽度不足时，表现的效果不同

![flex-basis和width的差异](https://image.zhangxinxu.com/image/blog/201912/2019-12-30_222544.png)
