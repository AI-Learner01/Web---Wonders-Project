import React, { useState } from 'react';
// import loginBg from "../assets/login-bg.jpg";//backgrond IMG
const loginBg = "https://res.cloudinary.com/xzjjff1k/image/upload/f_auto,q_auto,w_1920/v1784311631/login-bg_our3np.jpg";


/**
 * Developer Guide:
 * 
 * this is the login page, you can use this page to login to your account.
 * 
 * flow => fill details ->check data -> direct to Home if all things are correct
 *  
 * @returns Login Page
 */


/*
    do not delete this
    ham password strong hai ki nahi ye bhi 
    check karenge

    we need to make a forget password page and a reset password page
*/

function Login() {
    const inputClass = "w-full px-4 py-3.5 rounded-[10px] border border-[#d9d9d9] bg-[#fafafa] text-[15px] transition duration-300 placeholder:text-[#9a9a9a] focus:outline-none focus:border-[#16c784] focus:bg-white focus:shadow-[0_0_0_4px_rgba(22,199,132,0.12)]";
    //abve is the class for input fields, you can use it for all input fields in this form

    //data for login form   
    const [emailOrPhone, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);

    //this used for button animation----------
    const totalFields = 2;
    const filledFields = [emailOrPhone, password].filter((val) => val.trim() !== "").length;//this used for button animation
    const fillPercent = (filledFields / totalFields) * 100;
    const [cooldown, setCooldown] = useState(0);
    //--------------------------------------



    //check if the fields are filled and then send the data to the server
    const handleLogin = async (e) => {
        e.preventDefault();

        if (cooldown > 0) return;

        // Empty fields
        if (!emailOrPhone.trim() || !password) {
            alert("Please fill in all fields");
            return;
        }

        // Check if input is email or phone
        const isEmail = emailOrPhone.includes("@");

        if (isEmail) {
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(emailOrPhone)) {
                alert("Please enter a valid email address");
                return;
            }
        } else {
            // Phone validation
            if (!/^\d{10}$/.test(emailOrPhone)) {
                alert("Please enter a valid 10-digit phone number");
                return;
            }
        }

        // Password validation
        if (password.length < 8) {
            alert("Password must be at least 8 characters long");
            return;
        }

        // Start cooldown
        setCooldown(5);

        const timer = setInterval(() => {
            setCooldown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        // fetch login API...


        try {
            setCooldown(5);

            const timer = setInterval(() => {
                setCooldown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
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
    //---------------------------------------------------------------------------------------------

    return (
        <div
            className="min-h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat p-6"
            style={{ backgroundImage: `url(${loginBg})` }}
        >
            <form
                onSubmit={handleLogin}
                className="w-full max-w-[430px] bg-white p-10 rounded-[18px] shadow-[0_15px_40px_rgba(0,0,0,0.08)] flex flex-col max-[480px]:p-7"
            >

                {/* Header */}
                <div className="flex justify-between items-center mb-7">
                    <p className="text-[2rem] font-bold text-[#222]">
                        Login
                    </p>

                    <a
                        href="/contact"
                        className="no-underline text-[#2f6b1f] bg-[#eef8eb] border border-[#d8ead2] rounded-full px-[18px] py-2 text-[0.9rem] font-semibold transition duration-300 hover:bg-[#14c38e] hover:text-white hover:border-[#14c38e] hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(20,195,142,0.25)]"
                    >
                        Contact Us
                    </a>
                </div>

                {/* Email */}
                <p className="text-[0.9rem] font-semibold text-[#444] mt-[18px] mb-2">
                    Email or Phone
                </p>

                <input
                    type="text"
                    placeholder="Enter your email or phone"
                    value={emailOrPhone}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                />

                {/* Password Label */}
                <div className="flex items-center mt-[18px] mb-2">

                    <p className="text-[0.9rem] font-semibold text-[#444]">
                        Password
                    </p>

                    <p className="ml-auto mr-[10px] text-[#666] text-[0.85rem]">
                        View Password
                    </p>

                    <input
                        type="checkbox"
                        checked={showPass}
                        onChange={() => setShowPass(!showPass)}
                        className="w-[17px] h-[17px] accent-[#16c784] cursor-pointer"
                    />

                </div>

                <input
                    type={showPass ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputClass}
                />

                {/* Login Button */}

                <button
                    type="submit"
                    disabled={cooldown > 0}
                    className={`mt-6 w-full rounded-lg p-3 font-semibold text-white transition-all duration-300 shadow-[0_4px_12px_rgba(22,199,132,0.2)] hover:shadow-[0_6px_20px_rgba(22,199,132,0.3)]
                        ${cooldown > 0
                            ? "bg-[#a3e9d0] cursor-not-allowed text-white/80 shadow-none"
                            : "bg-[#16c784] hover:bg-[#12b375] hover:-translate-y-0.5"
                        }`}
                >
                    {cooldown > 0 ? `Wait ${cooldown}s` : "Login"}
                </button>

                {/* Forgot Password */}

                <a
                    href="/forgotpassword"
                    className="mt-[18px] text-right text-[#14c38e] text-[0.9rem] font-medium hover:text-[#0ea875] hover:underline"
                >
                    Forgot Password?
                </a>

                {/* Signup */}

                <a
                    href="/signup"
                    className="mt-7 pt-[18px] border-t border-[#ececec] text-center text-[#666] text-[0.92rem] no-underline transition duration-300 hover:text-[#14c38e]"
                >
                    Don't have an account? Sign Up
                </a>

            </form>
        </div>
    );
}

export default Login;