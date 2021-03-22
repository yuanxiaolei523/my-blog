import React, { useState } from 'react'
import { Button } from 'antd'


export default function GetName() {
    const [obj, setCount] = useState({ count: 1 })
    console.log(obj);
    function handleClick() {
        setCount({ count: obj.count + 1 })
    }
    return (
        <div>
            <div>{obj.count}</div>
            <Button onClick={() => handleClick()}>onClick</Button>
        </div>
    )

}
function handleClick(obj, setCount) {
    setCount(obj.count + 1)
}
