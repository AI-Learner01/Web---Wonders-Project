import React, { useState } from 'react';
import './Signup.css';

function Signup() {
    
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    

    const handleSignup = async (e) => {
        e.preventDefault(); 

       
        if (!fullName || !email ||!phone|| !password || !confirmPassword) {
            alert("Please fill in all fields");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }


        const userData = { fullName, email, phone, password };
        try{
            const response = await fetch("http://localhost:5000/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials:"include",
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (data.success) {
                alert(data.message);
                window.location.href = "/login"; // Redirect to login page after successful signup
            } else {
                alert(data.message);
            }
        }
        catch (error) {
            console.error("Error signing up:", error);
            alert("Something went wrong!");
        }
        

    };

    return (
        <div className='signupcontainer'>
            
            <form id="signupform" onSubmit={handleSignup}>
                <div id="signupTitleContainer">
                    <p id="SingUpPageTitle">Sign Up</p>
                    <a id="contact" href="/contact">Contact Us</a>
                </div>

                <p className='signuptitle'>First Name ,Last Name</p>
                <input 
                    type="text" 
                    placeholder='Enter your First name and last name' 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
                

                <p className='signuptitle'>Email</p>
                <input 
                    type="text" 
                    placeholder='Enter your email' 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <p className='signuptitle'>Phone</p>
                <input 
                    type="text"
                    placeholder='Enter your phone number'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <div className='viewpasswordcontainer_signup'>
                    <p id="signupPasswordLabel" className='signuptitle'>Password</p>
                    <p id="signupPasswordText">View Passwords</p>
                    
                    <input 
                        type="checkbox" 
                        checked={showPassword} 
                        onChange={() => setShowPassword(!showPassword)} 
                    />
                </div>

                
                <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder='Create a password' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <p className='signuptitle'>Confirm Password</p>
                <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder='Confirm your password' 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button id="signupButton" type="submit" onClick={handleSignup}>Sign Up</button>

                <a id="loginLink" href="/login">Already have an account? Login</a>
            </form>
        </div>
    );
}

export default Signup;