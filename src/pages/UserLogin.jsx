

import  { useState } from 'react';
import CardLogin from '../componants/UI/CardLogin';
import LoginImg from '../assets/LoginImg.jpg';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
import useInput from './use-input';
import { Link } from 'react-router-dom';
import { Alert, AlertIcon } from '@chakra-ui/react';
const isNotEmpty = (value) => value.trim() !== '';


const UserLogin = () => {
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
 
 
    const [isFocused1, setFocused1] = useState(false);
    const [isFocused2, setFocused2] = useState(false);
     const {
        value: usernameValue,
        isValid: usernameIsValid,
        hasError: usernameHasError,
        valueChangeHandler: usernameChangeHandler,
        inputBlurHandler: usernameBlurHandler,
        reset: resetUsername,
      } = useInput(isNotEmpty);
      const {
        value: passwordValue,
        isValid: passwordIsValid,
        hasError: passwordHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: resetPassword,
      } = useInput(isNotEmpty);
    

      let formIsValid = false;
      

  if ( passwordIsValid && usernameIsValid) {
    formIsValid = true;
  }
 
  const onloginHandler=async(event)=>{
    if(!formIsValid){
        return;
    }
    event.preventDefault();
    try {
      const response = await fetch('https://petverse-3.onrender.com/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: usernameValue,
          password: passwordValue,
        }),
      });
    
      if (response.ok) {
        console.log('Login successful');
        window.location.href = `/user/main/${usernameValue}`;
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData.message);
        setAlertMessage('Login failed. Please try again.');
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  resetUsername()
  resetPassword()
   
  }
  const usernameClasses = usernameHasError ? 'form-control invalid' : 'form-control';
  const passwordClasses = passwordHasError ? 'form-control invalid' : 'form-control';
  

    const div1 = {
        height: '90vh',
       
    };

    const div2 = {
        display: 'flex',
        flexWrap: 'wrap',
   
    justifyContent: 'center',
    };


    const inputContainer = {
        position: 'relative',
        width: '100%',
        margin: '10px',
    };

    const inputStyle = {
        
        width: '80%',
       
        borderWidth: '0px 0px 1px',
        borderBottomStyle: 'solid',
        borderBottomColor: 'rgb(204, 204, 204)',
        fontSize: '16px',
        outline: 'none',
        borderRadius: '0',
    };

    const labelStyle1 = {
        
        position: 'absolute',
        pointerEvents: 'none',
        top: isFocused1 ? '-20px' : '12px',
        transition: 'top 0.2s, font-size 0.2s',
        fontSize: isFocused1 ? '12px' : '16px',
        color: isFocused1 ? '#007BFF' : 'inherit',
    };
    const labelStyle2 = {
        position: 'absolute',
        pointerEvents: 'none',
        top: isFocused2 ? '-20px' : '12px',
        transition: 'top 0.2s, font-size 0.2s',
        fontSize: isFocused2 ? '12px' : '16px',
        color: isFocused2 ? '#007BFF' : 'inherit',
    };
    
    const h1style = {
        fontFamily: 'sans-serif',
        lineHeight: '1.2',
        textAlign: 'center',
        color: 'rgb(15, 95, 175)',
    };

    const StyledButton = styled.button`
        padding: 10px 20px;
        border: none;
        cursor: pointer;
        transition: background-color 0.3s;
        width: 40vh;
        border-radius: 5px;
        background-color: #f2ecec;
        color: black;
        &:hover {
            background-color: rgb(15, 95, 175);
            color: white;
        }
    `;

    const paragraphStyle = {
        textAlign: 'center',
        marginTop: '0px',
        fontSize: 'small',
    };


    
    const Img = styled.img`
  height: 85vh;
  max-width: 95%;

  @media (max-width: 1180px) {
    height: 40vh;
    width:20vw;
    margin:10px // You can adjust this value based on your design
  }
  
`;
    
    


    return (
        <CardLogin>
        
            <div style={div1}>
                <div style={div2}>
                    <div style={{ flexBasis: '50%' }}>
                        <Img src={LoginImg} alt="Login" />
                    </div>
                    <div style={{ flexBasis: '45%', marginTop: '140px' }}>
                        <div>
                            <h1 style={h1style}>
                                <b>Login</b>
                            </h1>
                        </div>
                        <form onSubmit={onloginHandler}>
                        <div style={inputContainer}>
             
                            <FloatingLabel controlId="floatingInput" style={{border:'0px'}} className={usernameClasses} >
                                <Form.Control
                                    type="text"
                                    placeholder=""
                                    style={inputStyle}
                                    onFocus={() => setFocused1(true)}
                                    value={usernameValue}
            onChange={usernameChangeHandler}
            onBlur={usernameBlurHandler}
                                />
                                <Form.Label style={labelStyle1}>Username</Form.Label>
                                {usernameHasError && <p style={{ color: '#b40e0e',fontSize:'10px'}}>Please enter a valid username.</p>}
                            </FloatingLabel>
                           
                            <FloatingLabel controlId="floatingInput" className={passwordClasses} style={{border:'0px'}}>
    <Form.Control
    className={passwordClasses}
      type="password"
      placeholder=""
      style={inputStyle}
      value={passwordValue}
      onFocus={() => setFocused2(true)}
      onChange={passwordChangeHandler}
      onBlur={passwordBlurHandler}

    />
    <Form.Label style={labelStyle2}>Password</Form.Label>
    {passwordHasError && (
      <p style={{ color: '#b40e0e', fontSize: '10px' }}>
        Please enter a valid password.
      </p>
    )}
  </FloatingLabel>
      
                            <StyledButton type="submit">Login</StyledButton>
                           , <p style={paragraphStyle}>Dont have an account?<Link to='/user/signup'>Signup Here</Link></p>
                        </div>
                        </form>
                        {showAlert && (
                            <Alert status="error" variant="subtle" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" mt={5} pr={85}>
                                <AlertIcon boxSize="40px" mr={0} color="red"/>
                               <p style={{color:'red'}}> {alertMessage}</p>
                            </Alert>
                        )}
                    
                    </div>
                </div>
            </div>
        </CardLogin>
    );
};

export default UserLogin;
