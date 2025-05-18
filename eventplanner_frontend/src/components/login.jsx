import React from "react";
import Header from './header';
import axiosInstance from '../axios';
import './login.css'

import { useState } from "react";
import { useNavigate  } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate ();

  // States for registration
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Handling the email change
  const handleEmail = (e) => {
      setEmail(e.target.value);
      setSubmitted(false);
  };

  // Handling the password change
  const handlePassword = (e) => {
      setPassword(e.target.value);
      setSubmitted(false);
  };

  // Handling the form submission
  const handleSubmit = (e) => {
      e.preventDefault();
      if (email === "" || password === "") {
          setError("Please supply all fields");
      } else {
        axiosInstance.post('token/', {
            email: email,
            password: password,
        })
        .then((res) => {
          localStorage.setItem('access_token', res.data.access);
          localStorage.setItem('refresh_token', res.data.refresh);
          axiosInstance.defaults.headers['Authorization'] = 'JWT ' + localStorage.getItem('access_token');
          navigate('/');
        })
        .catch(err => {
            setError(err.response.data.detail);
        })
      };
  };

  // Showing success message
  const successMessage = () => {
      return (
          <div
              className="success"
              style={{
                  display: submitted ? "" : "none",
              }}
          >
              <h1>User {name} successfully registered!!</h1>
          </div>
      );
  };

  // Showing error message if error is true
  const errorMessage = () => {
      return (
          <div
              className="error"
              style={{
                  display: error ? "" : "none",
              }}
          >
              {error}
          </div>
      );
  };

  return (
    <>
    <Header />
        <div>
            <div className="column">
                <h1>Please Log In</h1>
                <div className="login">
                    <form className="login-form">
                        <div>
                            <input className="input" type="email" value={email} placeholder="E-mail" onChange={handleEmail}/>
                        </div>
                        <div>
                            <input className="input" type="password" value={password} placeholder="Password" onChange={handlePassword}/>
                        </div>
                        <button className="login-box-button" type="submit" onClick={handleSubmit}>Submit</button>
                    </form>
                </div>
                <span>
                    New user? 
                    <a href='/register'>Register here</a>
                </span>

                {/* Error Box Display*/}
                {error ? 
                    <div className="error-message">
                        {errorMessage()}
                        {successMessage()}
                    </div>
                :
                    <>
                    </>
                }
            </div>
        </div>
    </>
  );
};

export default Login;