import React, { useEffect, useState } from 'react'
import '../styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../assests/logo.svg";
import {ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios';
import { loginRoute } from '../utils/APIRoutes';

function Login() {
  const navigate = useNavigate();
  const [values,setValues] = useState({
    username:"",
    password:"",
  });
  useEffect(() => {
    if(localStorage.getItem('chat-app-user')){
      navigate('/');
    }
  })
  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(handleValidation()){
      console.log("in validation",loginRoute);
      const {password,username} = values;
      const {data} = await axios.post(loginRoute,{
        username,
        password,
      });
      if(data.status===false){
        toast.error(data.msg,{
          position:"bottom-right",
          autoClose:5000,
          pauseOnHover:true,
          draggable:false,
          theme:"dark",
        });
      }
      if(data.status===true){
        localStorage.setItem('chat-app-user',JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  const handleValidation = ()=>{
    const {password,username} = values;
    if(password==="") {
      toast.error("Opps! Email and Password is required",{
        position:"bottom-right",
        autoClose:5000,
        pauseOnHover:true,
        draggable:false,
        theme:"dark",
      });
      return false;
    }else if(username.length === ""){
      toast.error("Sorry! Email and Password is required",{
        position:"bottom-right",
        autoClose:5000,
        pauseOnHover:true,
        draggable:false,
        theme:"dark",
      });
      return false;
    }
    return true;
  };
  const handleChange = (e) =>{
    setValues({...values,[e.target.name]:e.target.value});
  };
  return (
    <>
      <div className="FormContainer">
        <form onSubmit={handleSubmit}>
          <div className='brand'>
            <img src={Logo} alt="Logo"/>
            <h1>Gossip</h1>
          </div>
          <input 
            type='text'
            placeholder='Username'
            name='username'
            onChange={handleChange}
            minLength="3"
          />
          <input 
            type='password'
            placeholder='Password'
            name='password'
            onChange={handleChange}
          />
          <button type="submit">Login In</button>
          <span>Don't have an account ? <Link to='/register'>Register</Link></span>
        </form>
      </div>
      <ToastContainer/>
    </>
  );
}



export default Login;