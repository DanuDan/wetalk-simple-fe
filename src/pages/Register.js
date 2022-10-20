import React, {useState} from 'react'
import { Form, Container, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "react-query";
import { API } from "../config/api";
import Login from "./Login"

export default function Register() {

  const [message, setMessage] = useState(null);
  const [alertRegister, setAlertRegister] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
  });

  const navigate = useNavigate();

  const {email, password, name } = form;

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

      // Configuration Content-type
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data user to database
      const response = await API.post("/register", body, config);

      console.log(response);

      if (response.data.status === "Success") {
        navigate(<Login/>);
        const alert = (
          <Alert variant="success" className="py-1">
            Register Success
          </Alert>
        );
        setAlertRegister(alert);
        setForm({
          email: "",
          password: "",
          name: "",
        });
      } else {
        const alert = (
          <Alert variant="danger" className="">
            Failed Register
          </Alert>
        );
        setAlertRegister(alert);
      }
      // Handling response here
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="">
          Failed Register
        </Alert>
      );
      setAlertRegister(alert);
      console.log(error);
    }
  });

  return (
    
  <div className='d-flex justify-content-center align-items-center bg-brown' style={{height:'100vh'}}>
        <Container className='p-5 bg-yellow' style={{maxWidth:'500px', borderRadius:'5px'}}>
            <Form onSubmit={(e) => handleSubmit.mutate(e)}>
             {alertRegister && alertRegister}
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

                            <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                name="name"
                                id="name"
                                onChange={handleChange}
                                value={name}
                                placeholder="name"
                                style={{ borderColor: "brown" }}
                                autoFocus
                            />
                            </Form.Group>
                <button type="submit" style={{ width: "100%" }} className="btn btn-auth-brown">
                     Register
                </button>
             <p className='d-flex justify-content-center mt-3'>
                  Already have an account ? Click <Link to="/login" className='switch-btn ms-1 c-pointer'><strong className='switch-btn ms-1 c-pointer'>Here</strong></Link>
             </p>
            </Form>
        </Container>
   </div>
  )
}
