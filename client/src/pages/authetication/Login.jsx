import React from 'react'
import './Login.css'


function Login() {

    //email or phone  and pass
    //login buuutton
    //view password button
    //login
    //forgot password

    //dont have an account? sign up

    function showPassword() {
        const passwordInput = document.getElementById('password');
        const viewPasswordCheckbox = document.getElementById('viewPassword');
        if (viewPasswordCheckbox.checked) {
            passwordInput.type = 'text';
        } else {
            passwordInput.type = 'password';
        }
    }

    return (
        <div className='logincontainer'>
            
            <form id="loginform">
                <div id="LoginTitleContainer">
                    <p id="LoginPageTitle">Login Up</p>
                    <a id="contect" href="/contect">Contact Us</a>
                </div>
                <p className='logintitle'>Email or Phone</p>
                <input id="email" type="text" placeholder='Enter your email or phone' />
                <div className='viewpasswordcontainer'>
                <p id="passwordLabel" className='logintitle'>Password</p>
                <p id="passwordText">View Password</p>
                <input id="viewPassword" type="checkbox" onChange={showPassword} />
                </div>
                <input id="password" type="password" placeholder='Enter your password' />
                <button id="loginButton">Login</button>
                <a id="forgotPasswordLink">Forgot Password?</a>
                <a id="signupLink" href="/signup">
                    Don't have an account? Sign Up
                </a>
            </form>
        </div>
    );


}

export default Login;