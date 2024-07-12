import React, { useState } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { introdata, meta } from "../../content_option";
import gifImage from '../../assets/images/my-gif.gif';
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Account } from "../account";
import { useAuth } from "../auth";

export const Portfolio = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  let responseData;
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  // const { login } = useAuth();

  // Function to handle changes in the email input
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  

  const handleClose = () => {
    setShow(false);
    setLoginError('');
  };
  
  const handleShow = () => setShow(true);

  const handleLogin = async () => {
    const user = username;
    const pass = password;

   await axios.post('http://localhost:8081/user/login', {username:username,password:password}  )
        .then((response) => {
            // Handle success
            console.log(response)
            if(response.status === 200){
              responseData = response.data;
              // console.log('Response:', response.data);
              console.log(responseData.role)
              console.log(responseData.firstTimeLogin)

              // login(userDetails, token);
          }
        })
        .catch((error) => {
            // Handle error
                // console.log(error.response.data)
          if (error.response.status) {
            // If the server responds with an error message
            setError(error.response.data);
          } else if (error.request) {
            // If the request was made but no response was received
            setError('No response from server. Please try again later.');
          } else {
            // If something else went wrong
            setError('An error occurred. Please try again later.');
          }
        });

    if (!user || !pass) {
      setLoginError('Please enter username and password.');
      return; // Stop further execution
    }

    if (responseData.firstTimeLogin) {
      navigate(`/change-password/${responseData.userid}/${responseData.username}/${responseData.role}`);
    } else {
      if (responseData.role === "ARTIST") {
        // Correct credentials
        console.log('Login successful');
        navigate(`/artistdash/${responseData.userid}`); 
        // Redirect to artist dashboard with userid
      } else if (responseData.role === "MANAGER") {
        console.log('Login successful');
        navigate(`/managerdash/${responseData.userid}`); 
        // Redirect to manager dashboard with userid
      }
      else if(responseData.role === "ADMIN"){
        navigate(`/login`);  
      }
    }
  };
  const handleSubmit = () => {
    // Here you can perform any action with the email, such as sending it to a server
    console.log('Email submitted:', email);
    
    try {
      const response = axios.patch('http://localhost:8081/user/forgot-password', { email });
      setMessage(response.data);
    } catch (error) {
      setError(error.response.data);
    }
    
    // Close the modal
    handleClose();
  };


   
  

  // Rest of your JSX code...
  // You can continue writing your JSX code here, such as HTML elements, other components, etc.

  return (
    <HelmetProvider>
      <section id="home" className="home">
        <Helmet>
          <meta charSet="utf-8" />
          <title>{meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>

        <div className="intro_sec d-block d-lg-flex align-items-center">
          <div
            className="h_bg-image order-1 order-lg-2 h-100"
            style={{ backgroundImage: `url(${gifImage})` }}
          ></div>
          <div className="text order-2 order-lg-1 h-100 d-lg-flex justify-content-center">
            <div className="align-self-center">
              <div className="intro mx-auto">
                <h2 className="mb-1x">Login</h2>

                <br />
                <div className="login-form">
                  <input
                    className="form__field"
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <br />
                  <input
                    className="form__field"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />


                  <a href="#" className="forgot-password" onClick={handleShow}>Forgot Password?</a>

                  <br />


                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Forgot Password? </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label>Email address</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="name@example.com"
                            autoFocus
                            onChange={handleEmailChange}
                            required
                          />

                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlTextarea1"
                        >

                        </Form.Group>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal>

                  {/* Error message for incorrect login */}
                  {loginError && (
                    <div className="alert alert-danger" role="alert">
                      {loginError}
                    </div>
                  )}

                  <div className="intro_btn-action pb-5">
                    {/* <Link to="/login" className="text_2">
                      <div id="button_p" className="ac_btn btn " onClick={handleLogin}>
                        Login
                        <div className="ring one"></div>
                        <div className="ring two"></div>
                        <div className="ring three"></div>
                      </div>
                    </Link> */}
                    <button className="text_2" onClick={handleLogin}>
                      <div id="button_pp" className="ac_btn btn ">
                        Login
                        <div className="ring one"></div>
                        <div className="ring two"></div>
                        <div className="ring three"></div>
                      </div>
                    </button>
                    {error && <p>{error}</p>}
                  </div>
                </div>

                <p className="mb-1x">{introdata.description_five}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
};

export default Portfolio;
