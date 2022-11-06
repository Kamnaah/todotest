import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import "../CSS/main.css"
import TaskRow from './TaskRow'

const Main = () => {
    const [data,setData] = useState([]);
    const [task,setTask] = useState("");
    const [toggle,setToggle] = useState(false);
    const [running, setRunning] = useState(false);

    const handleLogout = ()=>{
        localStorage.clear();
        window.location.href = "/login"
    }

    const getasks = async () =>{
        const url = "http://localhost:5000/task";
        const data = await fetch(url,{
            method:"GET",
            headers:{
                "Authorization":localStorage.getItem("token"),
                "Content-Type":"application/json",
                "Accept":"application/json",
            },
        })

        const res = await data.json();
        setData(res.data)
    }

    const addTasks = async (e)=>{
        e.preventDefault();
        const url = "http://localhost:5000/task/add";
        const data = await fetch(url,{
            method:"POST",
            headers:{
                "Authorization":localStorage.getItem("token"),
                "Content-Type":"application/json",
                "Accept":"application/json",
            },
            body:JSON.stringify({"activity":task})
        })

        const res = await data.json();
        alert(res.status);
        setToggle(!toggle);
    }
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(!token){
            window.location.href = "/login";
        }else{
            console.log(token)
            getasks();
        }
    },[toggle])

    const showHistory =()=>{
        alert(task)
    }
  return (
    <div>
        <div className="header">{localStorage.getItem("userName")}</div>
        <div className="main-section">
            <div className="left-section">
                <h3>To Do list</h3>
                <h3 onClick={showHistory}>History</h3>
                <h3 onClick={handleLogout}>Logout</h3>
            </div>
            <div className="table-section">
                <div className="add-activity">
                    <input type="text" name="tasks" id="tasks" onChange={e=>setTask(e.target.value)} placeholder='Add tasks'/>
                    <button onClick={addTasks}>Add Activity</button>
                </div>
                <div className="main-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Activity</th>
                                <th>status</th>
                                <th>Time Taken</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                    </table>
                    <tbody>
                            {data.map((item,i)=>(
                                <TaskRow key={i} activity={item.activity} status={item.status} id={item._id} running={running} handleRunning = {()=>setRunning(!running)}/> 
                            ))}
                    </tbody>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Main