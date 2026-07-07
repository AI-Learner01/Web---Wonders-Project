import React from 'react';
import './Signup.css';

function Signup() {

    function showPassword() {
        const passwordInput = document.getElementById('signupPassword');
        const confirmPasswordInput = document.getElementById('confirmPassword');
        const viewPasswordCheckbox = document.getElementById('viewSignupPassword');

        if (viewPasswordCheckbox.checked) {
            passwordInput.type = 'text';
            confirmPasswordInput.type = 'text';
        } else {
            passwordInput.type = 'password';
            confirmPasswordInput.type = 'password';
        }
    }

    return (
        <div className='signupcontainer'>
            <form id="signupform">
                <div id="signupTitleContainer">
                    <p id="SingUpPageTitle">Sign Up</p>
                    <a id="contect" href="/help">Contact Us</a>
                </div>
                <p className='signuptitle'>Full Name</p>
                <input id="fullName" type="text" placeholder='Enter your full name' />

                <p className='signuptitle'>Email or Phone</p>
                <input id="signupEmail" type="text" placeholder='Enter your email or phone' />


                <div className='viewpasswordcontainer_signup'>
                    <p id="signupPasswordLabel" className='signuptitle'>Password</p>
                    <p id="signupPasswordText">View Passwords</p>
                    <input id="viewSignupPassword" type="checkbox" onChange={showPassword} />
                </div>


                <input id="signupPassword" type="password" placeholder='Create a password' />


                <p className='signuptitle'>Confirm Password</p>
                <input id="confirmPassword" type="password" placeholder='Confirm your password' />


                <button id="signupButton">Sign Up</button>


                <a id="loginLink" href="/login">Already have an account? Login</a>
            </form>
        </div>
    );
}

export default Signup;