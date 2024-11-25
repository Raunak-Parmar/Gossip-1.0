import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Logo from "../assests/logo.svg";

export default function Contacts({contacts,currentUser,changeChat}) {
    const [currentUserName,setCurrentUserName] = useState(undefined);
    const [currentUserImage,setCurrentUserImage] = useState(undefined);
    const [currentSelected,setCurrentSelected] = useState(undefined);
    useEffect(() => {
        
        if(currentUser){
            setCurrentUserImage(currentUser.avatarImage);
            setCurrentUserName(currentUser.username);
        }
    },[currentUser,contacts]);
    const changeCurrentChat = (index,contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    }
  return (
    <>
    {
        currentUserImage && currentUserName && (
            <Container>
                <div className="brand">
                    <img src={Logo} alt='Logo'/>
                    <h3>gossip</h3>
                </div>
                <div className="contacts">
                    {
                        contacts.map((contact,index) => {
                            return (
                                <div onClick={()=>changeCurrentChat(index,contact)} key={index} className={`contact ${index === currentSelected ? "selected":""}`}>
                                    <div className="avatar">
                                        <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt=''/>
                                    </div>
                                    <div className="username">
                                        <h3>{contact.username}</h3>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                <div className="current-user">
                    <div className="avatar">
                        <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt=''/>
                    </div>
                    <div className="username">
                        <h2>{currentUserName}</h2>
                    </div>
                </div>
            </Container>
        )
    }
    </>
  )
}

const Container = styled.div`
    display:grid;
    grid-template-rows: 10% 75% 15%;
    overflow:hidden;
    background-color:#080420;
    .brand{
        display:flex;
        align-items:center;
        justify-content:center;
        gap:1rem;
        img{
            height:2rem;
        }
        h3{
            color:white;
            text-transform:uppercase;

        }
    }
    .contacts{
        display:flex;
        flex-direction:column;
        align-item:center;
        overflow:auto;
        gap: 0.8rem;
        &::-webkit-scrollbar{
            width:0.2rem;
            &-thumb{
                background-color:#ffffff39;
                width:0.1rem;
                border-radius:1rem;
                cursor:pointer;
            }
        }
        .contact{
            margin-left:0.8rem;
            background-color:#69afa5; /* 39 transparency ke liye hai*/
            min-height:5rem;
            width:90%;
            cursor:pointer;
            border-radius:0.2rem;
            padding:0.4rem;
            gap:1rem;
            align-items:center;
            transition:0.5s ease-in-out;
            .avatar{
                img{
                    height:3rem;
                }
            }
            .username{
                h3{
                    font-style:sans-serif;
                    color:white;
                }
            }
        }
        .selected{
            background-color:#9186f3;
        }
    }
    .current-user{
        margin-top:1.5rem;
        background-color:#289248;
        display:flex;
        justify-content:center;
        align-items:center;
        gap:2rem;
        .avatar{
            img{
                height:3rem;
                max-inline-size:100%;
            }
        }
        .username{
            h2{
                
                color:white;
            }
        }
        @media screen and (min-width:740px) and (max-width:1080px){
            
            gap:0.5rem;
            .username{
                h2{
                    font-size:1rem;
                }
            }
        }   
    }
`;