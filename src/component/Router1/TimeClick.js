import React, { useState, useEffect, useRef } from 'react';
import PropTypes from "prop-types";

export function ShowTimes(props){
    const [ minute, setMinute ] = useState(0);
    const [ time, setTime ] = useState(0);
    useEffect(()=>{
        console.log("副作用执行");
        setMinute(new Date().getMinutes());
        const timer = setInterval(()=>{
            setTime(new Date().getSeconds());
        }, 1000);
        return ()=>{
            console.log("hooks清除副作用");
            clearInterval(timer);
        }
    }, []);
    return (
        <p>你点击了按钮{ props.times }次<br/>现在时间是{ minute }分{ time }秒</p>
    )
}
ShowTimes.propTypes = {
    times: PropTypes.string.isRequired
};

export default function TimeClick(){
    const [ count, setCount ] = useState(0);
    const e1 = useRef(null);

    console.log(e1);

    return (
        <div>
            <ShowTimes times={ count } />
            <button ref={ e1 } onClick={ ()=>{ setCount(count + 1) } }>按钮</button>
        </div>
    )
}
