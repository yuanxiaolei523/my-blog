import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
export default function UseEffect() {
    let [obj, setCount] = useState({ count: 1 });
    function handleClick() {
        setCount(((prev) => ({
            count: prev.count + 1
        })))
        // setTimeout(() => {
        //     setCount(((prev) => ({
        //         count: prev.count + 1
        //     })))
        //     // setCount({
        //     //     count: obj.count + 1
        //     // })
        // }, 1000);

    }
    useEffect(() => {
        document.title = obj.count + '次'
        console.log(obj);
        return () => {
            document.title = 'react'
        }
    }, [obj])


    let [isShow, setIsShow] = useState(true);
    useEffect(() => {
        console.log('isShow');
    })
    return (
        <>
            <div>{obj.count}</div>
            <Button type="text" onClick={handleClick}>点击设置</Button>
            <div>{isShow + ' '} </div>
            <Button onClick={() => setIsShow(!isShow)}>显示/隐藏</Button>
        </>
    )
}
