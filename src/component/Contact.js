import React, {useContext, useState, useEffect} from 'react'
import { Navbar, Image, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from '../context/userContext';
import { Link } from 'react-router-dom';
import profilePic from '../assetts/JasonMomoa.jpg'
import {useQuery} from 'react-query'
import { API } from '../config/api';

export default function Contact() {

  const [state, dispatch] = useContext(UserContext);
  const [profile, setProfile] = useState([]);
  let navigate = useNavigate();
  const { id } = useParams()

  //LOGOUT
  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/login");
  }

//   FETCH
  let { data: profiles } = useQuery("profilesCache", async () => {
    const response = await API.get("/profiles");
    return response.data.data;
});

console.log(profiles)
useEffect(() => {
  const profile = async () => {
      try {
          const response = await API.get('/profile')
          setProfile(response.data.data)
          } catch (error) {
               console.log(error);
          }
      };
      profile();
      }, [setProfile]);
console.log(profile)
  return (
    <div className="bg-brown ms-0" style={{flex:'1', borderRight:'solid'}}>
    {profile?.map((item, index) => (
    <Navbar key={index} className="bg-navbar-contact justify-content-between" style={{color:'white'}}>
    <Link  to={`/edit/${item.id}`}>
    <Image src= {item?.image === "https://wetalk-simple.herokuapp.com/" ? profilePic :  item.image}
      width="50px" height="50px" className="rounded-circle ms-2"/>
     </Link>
        <div className='d-flex align-items-center'>
          <p className='ms-2 me-2 mb-0'>{item.user.name.substr(0, 6)}</p>
           <Button className='ms-2 me-2 mb-0 p-0 d-flex justify-content-center align-items-center'
           style={{width:'60px', height:'25px'}} variant="danger" onClick={logout}>Logout</Button>
        </div>
          
    </Navbar>
    ))}

    
    <div className="vertical-scroll" style={{height:'89%'}}>
    {profiles?.map((item, index) => (
      <div className='ms-0 mt-2 pb-2 d-flex align-items-center borderBottom'style={{ color:'white'}} key={index}>
        <Image src={item?.image === "https://wetalk-simple.herokuapp.com/" ? profilePic : item.image}
               width="50px" height="50px" className="rounded-circle ms-2"/>
               <p className='ms-2 me-2 mb-0'>{item.user.name}</p>
      </div>
       ))} 
    </div>
    
    


    </div>
  )
}