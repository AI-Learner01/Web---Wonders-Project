import React, { useState } from 'react';
import './Login.css';

/*
    do not delete this
    ham password strong hai ki nahi ye bhi 
    check karenge
    
*/ 

function Login() {
    
    const [emailOrPhone , setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault(); 

        if (emailOrPhone === "" || password === "") {
            alert("Please fill in all fields");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials:"include",
                body: JSON.stringify({ emailOrPhone, password })
            });

            const data = await response.json();

            if (data.success) {

                
                alert("Login successful");
                // Redirect to dashboard or perform other actions

            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error logging in:", error);
            alert("Something went wrong!");
        }
    };

    return (
        <div className='logincontainer'>
            <form id="loginform" onSubmit={handleLogin}>
                <div id="LoginTitleContainer">
                    <p id="LoginPageTitle">Login</p>
                    <a id="contact" href="/contact">Contact Us</a>
                </div>

                <p className='logintitle'>Email or Phone</p>
                <input 
                    type="text" 
                    placeholder='Enter your email or phone' 
                    value={emailOrPhone}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <div className='viewpasswordcontainer'>
                    <p id="passwordLabel" className='logintitle'>Password</p>
                    <p id="passwordText">View Password</p>
                    <input 
                        type="checkbox" 
                        checked={showPass} 
                        onChange={() => setShowPass(!showPass)} 
                    />
                </div>

                <input 
                    type={showPass ? "text" : "password"} 
                    placeholder='Enter your password' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button id="loginButton" type='submit'>Login</button>
                <a id="forgotPasswordLink">Forgot Password?</a>
                <a id="signupLink" href="/signup">Don't have an account? Sign Up</a>
            </form>
        </div>
    );
}

export default Login;