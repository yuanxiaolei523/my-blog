# Redux



## Redux的三大原则

### 单一数据源

整个应用的state存储在一颗object tree中，并且这个object tree只存在于唯一一个store中

### state只读

唯一修改state的方法就是触发action，action是一个用于描述已发生事件的普通对象

### 使用纯函数来执行修改

为了描述action如何改变state tree， 你需要编写reducer， 即**reducer必须是纯函数**



## action

### 定义

**Action** 是把数据从应用传到store的有效荷载



## reducer

reducers指定了应用状态的变化如何响应actions并发送到store的