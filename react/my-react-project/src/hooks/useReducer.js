import React, {useReducer} from 'react'
import {Button} from 'antd';
export default function UseReducer() {
    const inital = {count: 0}
    function reducer (state,action) {
    console.log(0);

        switch(action.type) {
            case 'inc': 
                return {count: state.count + 1};
            case 'dec': 
                return {
                    count: state.count -1
                };
            default:
                return {count: state.count}
        }
    }
    let [state, dispatch] = useReducer(reducer, inital)
    return (
        <div>
            {state.count}
            <Button onClick={() => (dispatch({type: 'inc'}))}>增加</Button>
            <Button onClick={() => (dispatch({type: 'dec'}))}>减少</Button>
        </div>
    )
}
