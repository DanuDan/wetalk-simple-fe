import "bootstrap/dist/css/bootstrap.min.css";
import './assetts/style.css'
import { Route, Routes, useNavigate} from 'react-router-dom';
import { useContext, useEffect } from "react";
import { API, setAuthToken } from "./config/api";
import { UserContext} from "./context/userContext";
import EditProfile from "./pages/UpdateProfile"
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";



function App() {

  const [state, dispatch] = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect Auth
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    if (state.isLogin == false) {
      navigate("/login"); navigate("/register");
    } else {
        navigate("/"); 
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(state);
  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
  }, []);

  return (
    <div className="bg.yellow">
  <Routes>
    <Route exact path="/" element={<Home/>}/>
    <Route exact path="/edit/:id" element={<EditProfile/>}/>
    <Route exact path="/register" element={<Register/>}/>
    <Route exact path="/login" element={<Login/>}/>
  </Routes>
  </div>
  );
}

export default App;
