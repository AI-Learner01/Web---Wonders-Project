import React from 'react'
import './Login.css'


function Login() {

    //email or phone  and pass
    //login buuutton
    //view password button
    //login
    //forgot password

    //dont have an account? sign up


    return (
        <div className='logincontainer'>
            <form id="loginform">
                <>
                <p className='logintitle'>Email or Phone</p>
                <input id="email" type="text" placeholder='Enter your email or phone' />
                </>
                <div className='viewpasswordcontainer'>
                <p id="passwordLabel" className='logintitle'>Password</p>
                <input id="viewPassword" type="checkbox" />
                
                </div>
               
                <input id="password" type="password" placeholder='Enter your password' />
                <button id="loginButton">Login</button>
                <a id="forgotPasswordLink" href="/forgot-password">Forgot Password?</a>
                <a id="signupLink" href="/signup">Don't have an account? Sign Up</a>
            </form>
        </div>
    );


}

export default Login;