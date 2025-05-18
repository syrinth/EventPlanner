import React from "react";
import Header from './header';
import axiosInstance from '../axios';
import './login.css'

import { useState } from "react";
import { useNavigate  } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate ();

  // States for registration
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Handling the name change
  const handleName = (e) => {
      setName(e.target.value);
      setSubmitted(false);
  };

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
      if (name === "" || email === "" || password === "") {
        setError("Please supply all fields");
      } else {
        axiosInstance.post('register/', {
            email: email,
            user_name: name,
            password: password,
        })
        .then(response => {
          const data = response.data;
          console.log(data);
          navigate('/');
        })
        .catch(err => {
            if(err.response.data.email){
                setError(err.response.data.email);
            }
            else{
                console.log(err);
            }
        });
      }
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
            <h1>Register Account</h1>
                <div className="login">
                    <form className="login-form">
                        <div className="">
                            <input className="input" type="text" value={name} placeholder="Username" onChange={handleName}/>
                        </div>
                        <div>
                            <input className="input" type="email" value={email} placeholder="E-mail" onChange={handleEmail}/>
                        </div>
                        <div>
                            <input className="input" type="password" value={password} placeholder="Password" onChange={handlePassword}/>
                        </div>

                        <button className="login-box-button" type="submit" onClick={handleSubmit}>Submit</button>
                    </form>
                </div>

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

export default Register;