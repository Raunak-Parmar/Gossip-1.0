import React, { useEffect, useState } from 'react'
import { setAvatarRoute } from './../utils/APIRoutes';
import styled from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { Buffer } from 'buffer';
import loader from "../assests/loader3.gif";
import { useNavigate } from 'react-router-dom';


export default function SetAvatar() {
    const navigate = useNavigate();
    const api='https://api.multiavatar.com/45678945';
    const [avatars,setAvatars] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [selectedAvatar,setSelectedAvatar] = useState(undefined);

    useEffect(() => {
        const checkUser = async () => {
            if (!localStorage.getItem("chat-app-user")) {
                navigate("/login");
            }
        };
        checkUser();
    }, [navigate]);

    const setProfilePicture = async()=>{
        if(selectedAvatar === undefined){
            toast.error("Please select an avatar",{
                position:"bottom-right",
                autoClose:5000,
                pauseOnHover:true,
                draggable:false,
                theme:"dark",
            });
        }else{
            const user = await JSON.parse(localStorage.getItem("chat-app-user"));
            const {data} = await axios.post(`${setAvatarRoute}/${user._id}`,{
                image:avatars[selectedAvatar],
            });
            if(data.isSet){
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem("chat-app-user",JSON.stringify(user));
                navigate('/');
            }else{
                toast.error("Error setting avatar. Please try again",{
                    position:"bottom-right",
                    autoClose:5000,
                    pauseOnHover:true,
                    draggable:false,
                    theme:"dark",
                })
            }
        }
    };
    useEffect(() => {
        const fetchAvatars = async () => {
            const data = [];
            for (let i = 0; i < 4; i++) {
                try {
                    await new Promise((resolve) => setTimeout(resolve, 1000)); 
                    const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
                    const buffer = new Buffer(image.data);
                    data.push(buffer.toString('base64'));
                } catch (error) {
                    console.error('Error fetching image:', error);
                }
            }
            setAvatars(data);
            setIsLoading(false);
        };
        fetchAvatars();
    }, []);
    
  return(
  <>
  {
    isLoading ? <Container>
        <img src={loader} alt='loader' className='loader'/>
    </Container> : (
        <Container>
        <div className="title-container">
            <h1>Hey, pick an avatar as your profile image</h1>
        </div>
        <div className='avatars'>
            {
                avatars.map((avatar,index) =>{
                    return (
                        <div key={index} className={`avatar ${selectedAvatar===index?"selected":""}`}>
                            <img src={`data:image/svg+xml;base64,${avatar}`} alt='avatar'
                                onClick={()=>setSelectedAvatar(index)}
                            />
                        </div>
                    )
                })
            }
        </div>
        <button className='submit' onClick={setProfilePicture}>Set as profile picture</button>
    </Container>
    )
  }
    <ToastContainer/>
  </>
  );
}


const Container = styled.div`
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
gap:3rem;
background-color:#136668;
height:100vh;
width:100vw;
    .loader{
        max-inline-size:100%;
    }
    .title-container{
        h1{
            color:white;
        }
    }
    .avatars{
        display:flex;
        gap:2rem;
        .avatar{
            border:0.4rem solid transparent;
            padding:0.4rem;
            border-radius:5rem;
            display:flex;
            justify-content:center;
            align-items:center;
            transition:0.5s ease-in-out;
            img{
                height:6rem;            
            }
        }
        .selected{
            border:0.4rem solid #92a8d1;
        }
    }
    .submit{
    background-color: #997af0;
    color: white;
    padding: 1rem 4rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;
    &:hover{
        background-color: #4e0eff;
    }
    }
`;
