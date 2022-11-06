import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

const TaskRow = ({activity,status,id,running,handleRunning}) => {
    const [time,setTime] = useState(0);
    const [startToggle,setStartToggle] = useState(false);
    const[isActive,setIsActive] = useState(false);
    const[isPaused,setIsPaused] = useState(true);
    const[statuses,setstatuses] = useState("");

    const formatTime = (time)=>{
        let min = Math.floor((time/60000)%60);
        let sec = (Math.floor(time/1000)%60);
        let hr = (Math.floor(time/3600000)%60);
        if(hr<10) hr = "0"+hr;
        if(min<10) min = "0"+min;
        if(sec<10) sec = "0"+sec;
        time = `${hr}:${min}:${sec}`;
        return time;
    }

    const handleStart = ()=>{
        if(running) return alert("Task Already ongoing. Please complete or pause that task")
        setStartToggle(!startToggle);
        setIsActive(true);
        setIsPaused(false);
        setstatuses("Ongoing")
        handleRunning();
    }

    const handlePauseresume = ()=>{
        setIsPaused(!isPaused);
        handleRunning();
    }

    const handleEnd = (e)=>{
        setstatuses("Completed")
        setIsActive(false);
        handleRunning();
    }

    useEffect(()=>{
        let interval = null;
        if(isActive && !isPaused){
            interval = setInterval(()=>{
                setTime((time)=>time+10)
            },10)
        }else{
            clearInterval(interval);
        }

        return ()=>{clearInterval(interval)}
    },[isActive,isPaused])
  return (
    <div>
        <tr>
            <td>{activity}</td>
            <td>{statuses ? statuses : "pending"}</td>
            <td>{formatTime(time)}</td>
            <td>{startToggle ? <div><button onClick={handleEnd}>End</button><button onClick={handlePauseresume}>Pause/Resume</button></div> : <button onClick={handleStart}>Start</button>}</td>
        </tr>
    </div>
  )
}

export default TaskRow