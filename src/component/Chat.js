import React from 'react'
import { Navbar, Image, Form, Button} from "react-bootstrap";
import Messages from './Messages';

export default function Chat() {
  return (
    <div style={{flex:'2'}}>
     <Navbar className="bg-navbar-chat justify-content-between white">

        <div className='d-flex justify-content-center ms-2'>
        <Image src="https://images.pexels.com/photos/13866617/pexels-photo-13866617.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" 
                width="50px" height="50px" className="rounded-circle"/>
        <p className='d-flex align-items-center ms-3 me-2 mb-0'>Anita</p>
        </div>
     </Navbar>
     <Messages/>

     <div className='d-flex align-items-end chat-bg'>
        <Form.Control type="text" placeholder="Send messages..."/>
        <Button variant="light"className='send-bg'>Send</Button>
     </div>
    </div>
  )
}