import React, {useState, useEffect} from 'react'
import {Col, Container, Form, Row, Button, FloatingLabel} from 'react-bootstrap';
// import Clip from '../assets/Thumbnail.svg'
import { useMutation, useQuery, } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import {API} from '.././config/api'

function EditProfile() {
  const title = "Edit Profile";
    document.title = "Wetalk | " + title;

    // UPDATE

    
      
    const [previewName, setPreviewName] = useState(""); //name
    const [preview, setPreview] = useState(null); //image
    const [profile, setProfile] = useState([]);

    const { id } = useParams();
    let { data: profiles } = useQuery("profileCache", async () => {
        const response = await API.get("/profile/" + id);
        return response.data.data;
        
      });

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

    const [form, setForm] = useState({
        image:"",

      });

      //handle change data on from

    const handleChange = (e) => {
    setForm({
        ...form,
        [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });


    // Create image url for preview
    if (e.target.type === "file") {
        let url = URL.createObjectURL(e.target.files[0]);
        setPreview(url);
        setPreviewName(e.target.files[0].name);
        }

    };

    let navigate = useNavigate();

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();


            const formData = new FormData();
             formData.set("image", form.image[0], form.image[0].name);


            // Insert Profile data
            await API.patch("/profile/" + profiles.id, formData)
              console.log(formData);
            navigate("/");
            } catch (error) {
            console.log(error);
            }
        });

  return (
    <div>
    {profile?.map((item, index) => (
    <div className='d-flex justify-content-center align-items-center bg-brown' style={{height:'100vh'}}key={index}>
        <Container className='p-5 bg-yellow' style={{maxWidth:'500px', borderRadius:'5px'}}>
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
          {/* <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="name"
                  id="name"
                  onChange={handleChange}
                  placeholder={item.user.name}
                  style={{ borderColor: "brown" }}
                  autoFocus
                            />
            </Form.Group>

         <Form.Group className="mb-3">
             <Form.Control
                type="email"
                name="email"
                id="email"
                placeholder={item.user.email}
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
                style={{ borderColor: "brown" }}
                autoFocus
                            />
             </Form.Group> */}

         <Form.Group className="mb-3">
             <Form.Control
                type="file"
                name="image"
                id="image"
                placeholder={previewName === "" ? "Photo Profile" : previewName}
                onChange={handleChange}
                style={{ borderColor: "brown" }}
                autoFocus
                            />
             </Form.Group>

         <button type="submit" style={{ width: "100%" }} className="btn btn-auth-brown">
                     Save
                </button>
            </Form>
        </Container>
    </div>
    ))}
    </div>
  )
}

export default EditProfile
