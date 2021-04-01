# React



## refs

### 1. 功能

refs提供了一个方式，允许我们访问DOM节点或者在render方法中创建的React元素

### 2. refs用于什么场景

1. 管理焦点、文件选择或者媒体播放
2. 强制触发动画
3. 集成第三方DOM库

> 注意：避免使用refs来做任何可以通过声明式实现来完成的事情

### 勿过度使用 Refs

你可能首先会想到使用 refs 在你的 app 中“让事情发生”。如果是这种情况，请花一点时间，认真再考虑一下 state 属性应该被安排在哪个组件层中。通常你会想明白，让更高的组件层级拥有这个 state，是更恰当的。查看 [状态提升](https://zh-hans.reactjs.org/docs/lifting-state-up.html) 以获取更多有关示例。

> 注意
>
> 下面的例子已经更新为使用在 React 16.3 版本引入的 `React.createRef()` API。如果你正在使用一个较早版本的 React，我们推荐你使用[回调形式的 refs](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html#callback-refs)。

### 创建Refs

Refs是通过使用 `React.createRef()` 创建的,并通过ref属性附加到React元素上，在构造组件时，通常将refs分配给实例属性，以便可以在整个组件中引用

```react
import React from 'react';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.refs = React.createRef();
  }
  render () {
    return <div ref={this.refs}/>
  }
}
```

### 访问Refs

当ref被传递给render中的某个元素时，对该节点的引用可以在ref的current属性中访问到

```react
const node = this.refs.current; // 这里就可以拿到上面的那个div了
```

ref的current属性的值会根据节点的类型而有所不同

1. 当ref用于HTML元素时，构造函数使用`React.createRef`创建的ref接收底层的DOM元素作为其current属性的值
2. 当ref用于class组件时，ref接收组件的挂在实例作为current属性的值
3. **你不能在函数式组件上使用ref**，因为函数式组件没有实例

#### 为 DOM 元素添加 ref

以下代码使用 `ref` 去存储 DOM 节点的引用：

```react
import React from 'react';

class CustomTextInput extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }
    handleClick () {
        this.myRef.current.focus();
    }
    render() {
        return (
            <div>
                <input ref={this.myRef} />
                <button onClick={this.handleClick.bind(this)}>点击</button>
            </div>

        )
    }
}
export default CustomTextInput;
```

React会在组件挂载时给current属性传入DOM元素，并在组件卸载时给current属性赋值为null，ref会在componentDidMount和componentDidUpdate生命周期钩子触发之前更新

#### 为Class组件添加ref

如果我们想包装上面的 `CustomTextInput`，来模拟它挂载之后立即被点击的操作，我们可以使用 ref 来获取这个自定义的 input 组件并手动调用它的 `focusTextInput` 方法：

```react
// AutoFocusTextInput.js
import React from 'react';
import CustomTextInput from './CustomTextInput'
export default class AutoFocusTextInput extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
    }

    componentDidMount() {
        console.log(this.textInput.current) // this是整个CustomTextInput组件的实例
        this.textInput.current.focusTextInput();
    }

    render() {
        return (
            <CustomTextInput ref={this.textInput} />
        );
    }
}

// CustomTextInput.js
import React from 'react';
class CustomTextInput extends React.Component {
    constructor(props) {
        super(props);
         this.myRef = React.createRef();
    }
    focusTextInput () {
        this.myRef.current.focus();
    }
    render() {
        return (
            <div>
                <input ref={this.myRef} />
                <button onClick={this.focusTextInput.bind(this)}>点击</button>
            </div>

        )
    }
}
export default CustomTextInput;
```

> 请注意：上面的代码仅在CustomTextInput为class组件的提前下才是有效地

#### ref与函数式组件

默认情况下，**你不能在函数组件上使用 `ref` 属性**，因为它们没有实例：

```react
function MyFunctionComponent() {
  return <input />;
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }
  render() {
    // This will *not* work!
    return (
      <MyFunctionComponent ref={this.textInput} />
    );
  }
}
```

上面的代码会直接报错，原因是不能将ref用于函数式组件，如果想要在函数式组件内使用ref，你可以使用 [`forwardRef`](https://zh-hans.reactjs.org/docs/forwarding-refs.html)， 或者可以将该组件转化为 class 组件。

如果想要在函数式组件内使用ref，我们可以通过`useRef()`来解决

```react
import React from 'react';
export default function Test(props) {
    let textInput = React.useRef(null)
    function handleClick() {
        textInput.current.focus();
    }

    return (
        <div>
            <input
                type="text"
                ref={textInput} />
            <input
                type="button"
                value="Focus the text input"
                onClick={handleClick}
            />
        </div>
    );
}
```

### 将DOM Refs暴露给父组件

如果你使用 16.3 或更高版本的 React, 这种情况下我们推荐使用 [ref 转发](https://zh-hans.reactjs.org/docs/forwarding-refs.html)。**Ref 转发使组件可以像暴露自己的 ref 一样暴露子组件的 ref**。关于怎样对父组件暴露子组件的 DOM 节点，在 [ref 转发文档](https://zh-hans.reactjs.org/docs/forwarding-refs.html#forwarding-refs-to-dom-components)中有一个详细的例子。



### 回调Refs

React也支持另外一种设置Refs的方式，称为回调Refs，他能帮你更精细的控制何时refs被设置和解除

不同于传递 `createRef()` 创建的 `ref` 属性，你会传递一个函数。这个函数中接受 React 组件实例或 HTML DOM 元素作为参数，以使它们能在其他地方被存储和访问。

下面的例子描述了一个通用的范例：使用 `ref` 回调函数，在实例的属性中存储对 DOM 节点的引用。

```react
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);

    this.textInput = null;

    this.setTextInputRef = element => {
      this.textInput = element;
    };

    this.focusTextInput = () => {
      // 使用原生 DOM API 使 text 输入框获得焦点
      if (this.textInput) this.textInput.focus();
    };
  }

  componentDidMount() {
    // 组件挂载后，让文本框自动获得焦点
    this.focusTextInput();
  }

  render() {
    // 使用 `ref` 的回调函数将 text 输入框 DOM 节点的引用存储到 React
    // 实例上（比如 this.textInput）
    return (
      <div>
        <input
          type="text"
          ref={this.setTextInputRef}
        />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```

当你将一个回调赋值给某个元素的ref之后，回调函数的参数就是当前这个元素

React 将在组件挂载时，会调用 `ref` 回调函数并传入 DOM 元素，当卸载时调用它并传入 `null`。在 `componentDidMount` 或 `componentDidUpdate` 触发前，React 会保证 refs 一定是最新的。



#### 总结

1. 通过正常的ref的形式，会将ref的current属性赋值为当前元素或者组件的实例
2. 通过回调ref的形式，会将当前的DOM元素赋值给ref的回调函数的参数