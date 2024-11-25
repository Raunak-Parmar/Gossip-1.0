import React, { useEffect, useState } from 'react'
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../assests/logo.svg";
import {ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios';
import { registerRoute } from '../utils/APIRoutes';


function Register() {
  const navigate = useNavigate();
  const [values,setValues] = useState({
    username:"",
    email:"",
    password:"",
    confirmPassword:"",
  });
  useEffect(() => {
    if(localStorage.getItem('chat-app-user')){
      navigate('/');
    }
  })
  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(handleValidation()){
      console.log("in validation",registerRoute);
      const {password,username,email} = values;
      const {data} = await axios.post(registerRoute,{
        username,
        email,
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
    const {password,confirmPassword,username,email} = values;
    if(password!==confirmPassword) {
      toast.error("Opps! password and confirm password should be same",{
        position:"bottom-right",
        autoClose:5000,
        pauseOnHover:true,
        draggable:false,
        theme:"dark",
      });
      return false;
    }else if(username.length<3){
      toast.error("Username should be greater than 3 characters",{
        position:"bottom-right",
        autoClose:5000,
        pauseOnHover:true,
        draggable:false,
        theme:"dark",
      });
      return false;
    }else if(password.length<8){
      toast.error("Password should be of minimum 8 characters",{
        position:"bottom-right",
        autoClose:5000,
        pauseOnHover:true,
        draggable:false,
        theme:"dark",
      });
      return false;
    }else if(email ===""){
      toast.error("Email is required",{
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
          />
          <input 
            type='email'
            placeholder='Email'
            name='email'
            onChange={handleChange}
          />
          <input 
            type='password'
            placeholder='Password'
            name='password'
            onChange={handleChange}
          />
          <input 
            type='password'
            placeholder='Confirm Password'
            name='confirmPassword'
            onChange={handleChange}
          />
          <button type="submit">Create User</button>
          <span>Already a user ? <Link to='/login'>Login</Link></span>
        </form>
      </div>
      <ToastContainer/>
    </>
  );
}



export default Register