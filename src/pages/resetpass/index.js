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
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export const Resetpass = () => {
  // const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  // const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get('token');


  const handleLogin = () => {
    // const user = username;
    const pass = password;


    // Perform your login logic here
    // console.log('Username:', user);
    console.log('Password:', pass);

    // Optionally, you can redirect or perform any other actions here
    navigate('/profile');
  };



  const validatePassword = () => {
    const minLength = 10;
    const regexUpperCase = /[A-Z]/;
    const regexLowerCase = /[a-z]/;
    const regexDigit = /\d/;
    const regexSpecialChar = /[!@#$%^&*]/;

    if (password.length < minLength) {
      setError('Password must be at least 10 characters long.');
      return false;
    }

    if (!regexUpperCase.test(password)) {
      setError('Password must contain at least one uppercase letter.');
      return false;
    }

    if (!regexLowerCase.test(password)) {
      setError('Password must contain at least one lowercase letter.');
      return false;
    }

    if (!regexDigit.test(password)) {
      setError('Password must contain at least one digit.');
      return false;
    }

    if (!regexSpecialChar.test(password)) {
      setError('Password must contain at least one special character.');
      return false;
    }

    return true;
  };

  const handleLoginSubmit = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    
      
      console.log(token)
      await axios.put('http://localhost:8081/user/reset-password', { token, password }).then(response=> {
        console.log("2");
        console.log(response.status);
        const data = response.data;
        console.log(data);
        setMessage('Password reset successfully');
        handleLogin();

      }).catch (error => {
        setMessage('Error resetting password');
      });
      


    // Proceed with login logic
    
  };

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
                <h2 className="mb-1x">Set Your Password</h2>
                <br />
                <div className="login-form">
        
                  <br />
                  <input
                    className="form__field"
                    type="password"
                    name="New Password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required/>
                  <br />
                  <input
                    className="form__field"
                    type="password"
                    name="Confirm Password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required/>
                  {error && <p className="text-danger">{error}</p>}
                  <br />
                  <div className="intro_btn-action pb-5">
                    <Button variant="primary" onClick={handleLoginSubmit}>
                      Login
                    </Button>
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
