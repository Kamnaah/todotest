import React from 'react'
import { useState } from 'react';
import {Link} from "react-router-dom";
import "../CSS/login.css"

const Register = () => {
    const [userName,setUserName] = useState("");
    const [password,setPassword] = useState("");
    const [cnfPassword,setCnfPassword] = useState("");
    const handleRegistersubmit = async (e)=>{
        console.log(JSON.stringify({userName,password,cnfPassword}))
        e.preventDefault();
        const url = "http://localhost:5000/register";
        const data = await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
            },
            body:JSON.stringify({userName,password,cnfPassword})
        })
        const res = await data.json();
        if(res.data){
            alert("User registered")
            window.location.href="/login";
        }else{
            alert(res.message);
        }
    }
  return (
    <div>
        <div className='login-container register-container'>
            <form method="post">
                <h1>Register</h1>
                <input name='userName' className='username-input' type="text" onChange={e=> setUserName(e.target.value)} placeholder="Username"/>
                <input name='password' className='password-input' type="password" onChange={e=> setPassword(e.target.value)} placeholder="Password"/>
                <input name='Cnfpassword' className='Cnfpassword-input' type="password" onChange={e=> setCnfPassword(e.target.value)} placeholder="Confirm Password"/>
                <button className='login-button' onClick={handleRegistersubmit}>Register</button>
                <Link to="/login">Member Login</Link>
            </form>
        </div>
    </div>
  )
}

export default Register;