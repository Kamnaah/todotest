import React from 'react'
import { useState } from 'react';
import {Link} from "react-router-dom";
import "../CSS/login.css"

const Login = () => {
    const [userName,setUserName] = useState("");
    const [password,setPassword] = useState("");

    const handleLoginsubmit = async (e)=>{
        console.log(JSON.stringify({userName,password}))
        e.preventDefault();
        const url = "http://localhost:5000/login";
        const data = await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
            },
            body:JSON.stringify({userName,password})
        })
        const res = await data.json();
        if(res.token){
            localStorage.setItem('token',res.token);
            localStorage.setItem('userName',userName);
            alert("User Logged in")
            window.location.href="/";
        }else{
            alert(res.message);
        }
    }
  return (
    <div className='login-container'>
        <form method="post">
            <h1>Member Login</h1>
            <input name='userName' className='username-input' type="text" onChange={e=> setUserName(e.target.value)} placeholder="Username"/>
            <input name='password' className='password-input' type="password" onChange={e=> setPassword(e.target.value)} placeholder="Password"/>
            <button className='login-button' onClick={handleLoginsubmit}>Login</button>
            <Link to="/register">Create an Account</Link>
        </form>

    </div>
  )
}

export default Login;