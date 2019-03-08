import React, { useState, useEffect, useRef } from 'react';

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
        <p>你点击了按钮{ props.times }次,开始分数是{ minute },现在秒数是{ time }</p>
    )
}

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
