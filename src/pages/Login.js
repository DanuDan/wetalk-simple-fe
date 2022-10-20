import React, {useState, useContext} from 'react'
import { Form, Container, Alert } from "react-bootstrap";
import { UserContext } from '../context/userContext';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from 'react-query';
import { API } from '../config/api';


export default function Login() {

    const [state, dispatch] = useContext(UserContext);
    const [alertLogin, setAlertLogin] = useState(null);
    const navigate = useNavigate();


    const [form, setForm] = useState({
        email: "",
        password: "",
      });
    
    const {email, password } = form;
    console.log(state);

    const handleChange = (e) => {
        setForm({
        ...form,
        [e.target.name]: e.target.value,
        });
    };
  console.log(form);

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Data body

      // Configuration
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const Body = JSON.stringify(form);

      // Insert data for login process
      const response = await API.post("/login", Body, config);

      console.log(response.data.data);

      // Checking process
      if (response?.status == 200) {
        // Send data to useContext
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });
      }

    } catch(error) {
      const alertLogin = (
          <Alert variant='danger' className=''>
              Failed Login
          </Alert>
      );
      setAlertLogin(alertLogin);
      console.log(error);
  }
  });

  return (
    
  <div className='d-flex justify-content-center align-items-center bg-brown' style={{height:'100vh'}}>
        <Container className='p-5 bg-yellow' style={{maxWidth:'500px', borderRadius:'5px'}}>
            <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                {alertLogin && alertLogin}
                            <Form.Group className="mb-3">
                            <Form.Control
                                type="email"
                                name="email"
                                id="email"
                                placeholder="email"
                                value={email}
                                onChange={handleChange}
                                style={{ borderColor: "brown" }}
                                autoFocus
                            />
                            </Form.Group>
                            <Form.Group className="mb-3">
                            <Form.Control
                                type="password"
                                name="password"
                                id="password"
                                placeholder="password"
                                onChange={handleChange}
                                value={password}
                                style={{ borderColor: "brown" }}
                                autoFocus
                            />
                            </Form.Group>
                <button type="submit" style={{ width: "100%" }} className="btn btn-auth-brown">
                     Login
                </button>
             <p className='d-flex justify-content-center mt-3'>
                 Doesn't have an account ? Click <Link to="/register"><strong  className='switch-btn ms-1 c-pointer'>Here</strong></Link>
             </p>
            </Form>
        </Container>
   </div>
  )
}
