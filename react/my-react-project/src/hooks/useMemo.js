import React, {useMemo, useState} from 'react'
import { Button } from 'antd'
export default function UseMemo() {
    const [a, setCount] = useState(1);
    const [b, setValue] = useState(2);
    function getMax(a, b) {
        return Math.max(a, b);
    }
    let res = useMemo(() => getMax(a, b), [a])
    function handleClickA () {
        setCount(Math.random() * 100)

        console.log('a');
    }
    function handleClickB () {

        setValue(Math.random() * 100)
        console.log('b');
    }
    function handleClickc() {
        console.log('c');
    }
    return (
        <div>
            {a} {b} {res}
            <Button onClick={() => handleClickA()}>改变a</Button>
            <Button onClick={() => handleClickB()}>改变b</Button>
            <Button onClick={ () => handleClickc()}>no</Button>
        </div>
    )
    
}
