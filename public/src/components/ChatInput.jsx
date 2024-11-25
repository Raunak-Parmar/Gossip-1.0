import React, { useState } from 'react'
import styled from 'styled-components';
// import { BsEmojiSmileFill } from 'react-icons/bs';
import { IoMdSend } from 'react-icons/io';
// import Picker from 'emoji-picker-react';


export default function ChatInput({handleSendMsg}) {
    const [msg, setMsg] = useState("");
    // const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    // const handleEmojiPickerhideShow = () => {
    //   setShowEmojiPicker(!showEmojiPicker);
    // };

    // const handleEmojiClick = (event, emojiObject) => {
    //     let message = msg;
    //     message += emojiObject?.emoji || emojiObject;
    //     setMsg(message);
    //   };
    
    const sendChat = (event) =>{
        event.preventDefault();
        if(msg.length>0){
            handleSendMsg(msg);
            setMsg('');
        }
    }

  return (
    <Container>
        <div className="button-container">
            {/* <div className="emoji">
                <BsEmojiSmileFill onClick={handleEmojiPickerhideShow}/>
                {
                    showEmojiPicker && <Picker onEmojiClick={handleEmojiClick}/>
                }
            </div> */}
        </div>
        <form className='input-container' onSubmit={(e)=>sendChat(e)}>
            <input type='text' placeholder='Message' value={msg} onChange={(e)=>setMsg(e.target.value)}/>
            <button className="submit">
                <IoMdSend/>
            </button>
        </form>
    </Container>
  )
}

const Container = styled.div`
    display:grid;
    grid-template-columns:5% 95%;
    align-items:center;
    background-color:#080420;
    padding:0 2rem 5rem;
    margin-top:30px;
    @media screen and(min-width:720px) and (max-width:1080px){
        padding:0 1rem;gap:1rem; 
    }
    .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    padding-top:1rem;

    .emoji {
      position: absolute;
      padding-bottom:35rem;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
        margin-top:35rem;
      }
      .emoji-picker-react {
        position: absolute;
        top:-350px;
            }
        }
    }
    .input-container{
        width:100%;
        margin-top:1rem;
        border-radius:2rem;    
        display:flex;
        align-items:center;
        gap:2rem;
        background-color:#ffffff34;
        input{
            width:90%;
            height:60%;
            background-color:transparent;
            color:white;
            border:none;
            padding-left:1rem;
            font-size:1.2rem;
            &::selection{
                background-color:#9186f3;
            }
            &:focus{
                outline:none;
            }
        }
        button{
            padding:0rem 1.5rem;
            padding-bottom:0.1rem;
            border-radius:2rem;
            display:flex;
            justify-content:center;
            align-items:center;
            background-color:#9a86f3;
            border:none;
            @media screen and(min-width:720px) and (max-width:1080px){
                padding:0.3rem 1rem;
                svg{
                    font-size:1rem;
                }
            }
            svg{
                padding-left:0.2rem;
                font-size:2rem;
                color:white;
            }            
        }
    }
`;
