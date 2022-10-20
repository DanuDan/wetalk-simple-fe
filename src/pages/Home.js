import React from 'react'
import { Container } from "react-bootstrap";
import Contact from '../component/Contact'
import Chat from '../component/Chat'

export default function Home() {
  return (
    <div className='d-flex justify-content-center bg-yellow' style={{height:'100vh'}}>
    <Container className='d-flex justify-content-center mt-5 p-0' 
               style={{width:'65%', height:'80%', borderRadius:'2px', border:'solid'}}>
    <Contact/>
    <Chat/>
    </Container>
    </div>
  )
}
