import React from 'react';
import styled from 'styled-components';
import Robo from '../assests/robot.gif';

export default function Welcome({currentUser}) {
  return (
    <Container>
        <img src={Robo} alt='robo'/>
        <h1> 
        Welcome, <span>{currentUser?.username || "Guest"}! 😎</span>
        </h1>
        <h3>Please select a chat that you like for messaging.</h3>
    </Container>
  )
}


const Container = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
  gap:1rem;
  color:white;
  img{
    height:20rem;
  }
  span{
    color:#38ece7;
  }
`;

