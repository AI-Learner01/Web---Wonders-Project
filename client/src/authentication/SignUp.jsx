import React, { useState } from 'react';
import loginBg from "../assets/login-bg.jpg";//backgrond IMG


/**
 * Developer guid =>
 * this is sing up page to create a non exiting account
 * 
 * flow => fill details ->check data -> veryfy -> check and create account
 * 
 *          fill details=>gives error when u write number wrong email wrong
 *          check data =>gives error when all fild not filled
 *          veryfy=>email and phone number veryfication usinf otp
 *          check and create account=>if not exits than create account and direct to login page
 * 
 * @returns sing Up page
 */

function Signup() {
    const inputClass =
        "w-full px-4 py-3.5 rounded-[10px] border border-[#d9d9d9] bg-[#fafafa] text-[15px] transition duration-300 placeholder:text-[#9a9a9a] focus:outline-none focus:border-[#16c784] focus:bg-white focus:shadow-[0_0_0_4px_rgba(22,199,132,0.12)]";

    //used to handle data---------------------------
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    //----------------------------------------------

    //handle otp ------------------------
    const [otp1, setOtp1] = useState('');
    const [otp2, setOtp2] = useState('');
    const [isOtpPopupOpen, setIsOtpPopupOpen] = useState(false);
    //-----------------------------------


    //animation of button------------------------------------------------------------------------------------------
    const totalFields = 5;
    const filledFields = [fullName, email, phone, password, confirmPassword].filter((val) => val.trim() !== "").length;
    const fillPercent = (filledFields / totalFields) * 100;
    //--------------------------------------------------------------------------------------------------------------


    //this function is used to send the data to the server and create a new account(only call after otp verification)
    const handleSignup = async () => { 
        const userData = { fullName, email, phone, password };
        try {
            const response = await fetch("http://localhost:5000/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (data.success) {
                alert(data.message);
                window.location.href = "/login";
            } else {
                alert(data.message);
            }
        }
        catch (error) {
            console.error("Error signing up:", error);
            alert("Something went wrong!");
        }
    };
    //---------------------------------------------------------------------------------------------

    //this function is used to open the otp window and check if all fields are filled and passwords match
    const openOtpWindow = (e) => {
        e.preventDefault();

        if (!fullName || !email || !phone || !password || !confirmPassword) {
            alert("Please fill in all fields");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        setOtp1('');
        setOtp2('');
        setIsOtpPopupOpen(true);
    };

    //this function is used to verify the otp and if correct then call the handleSignup function
    const handleOtpVerification = () => {
        if (otp1 === "12" && otp2 === "34") {
            alert("OTP Match Successful! Proceeding with signup.");
            setIsOtpPopupOpen(false);
            handleSignup();
        } else {
            alert("Incorrect OTP! Try again.");
        }
    };

    return (
        <div
            className="flex justify-center items-center min-h-screen bg-[#f4f7f6] font-sans p-6 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${loginBg})` }}
        >
            <form
                onSubmit={openOtpWindow}
                className="w-full max-w-[430px] bg-white p-10 rounded-[18px] shadow-[0_15px_40px_rgba(0,0,0,0.08)] flex flex-col max-[480px]:p-7 max-[480px]:rounded-2xl"
            >
                {/* Top Row */}
                <div className="flex justify-between items-center mb-7">
                    <p className="text-[2rem] font-bold text-[#222] max-[480px]:text-[1.7rem]">
                        Sign Up
                    </p>

                    <a
                        href="/contact"
                        className="no-underline text-[#2f6b1f] bg-[#eef8eb] border border-[#d8ead2] rounded-full px-[18px] py-2 text-[0.9rem] font-semibold transition duration-300 hover:bg-[#14c38e] hover:text-white hover:border-[#14c38e] hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(20,195,142,0.25)] max-[480px]:px-[15px] max-[480px]:py-[7px] max-[480px]:text-[0.82rem]"
                    >
                        Contact Us
                    </a>
                </div>

                <p className="text-[0.9rem] font-semibold text-[#444] mt-[18px] mb-2">
                    First Name ,Last Name
                </p>
                <input
                    type="text"
                    placeholder="Enter your First name and last name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={inputClass}
                />

                <p className="text-[0.9rem] font-semibold text-[#444] mt-[18px] mb-2">
                    Email
                </p>
                <input
                    type="text"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                />

                <p className="text-[0.9rem] font-semibold text-[#444] mt-[18px] mb-2">
                    Phone
                </p>
                <input
                    type="text"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={inputClass}
                />

                <div className="flex items-center mt-[18px] mb-2">
                    <p className="text-[0.9rem] font-semibold text-[#444] m-0">
                        Password
                    </p>
                    <p className="ml-auto mr-[10px] text-[#666] text-[0.85rem]">
                        View Passwords
                    </p>
                    <input
                        type="checkbox"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                        className="w-[17px] h-[17px] cursor-pointer accent-[#16c784]"
                    />
                </div>

                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputClass}
                />

                <p className="text-[0.9rem] font-semibold text-[#444] mt-[18px] mb-2">
                    Confirm Password
                </p>
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={inputClass}
                />

                {/* Signup Button with fill-percent progress effect */}
                <button
                    type="submit"
                    className="relative isolate overflow-hidden mt-[30px] border-none rounded-[10px] bg-[#0b6e46] text-white p-[15px] text-base font-semibold cursor-pointer transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(20,195,142,0.28)]"
                >
                    <span
                        className="absolute top-0 left-0 h-full bg-[#1fd694] transition-[width] duration-[400ms] ease-in-out -z-10"
                        style={{ width: `${fillPercent}%` }}
                    />
                    <span className="relative z-10">Sign Up</span>
                </button>

                <a
                    href="/login"
                    className="mt-7 pt-[18px] border-t border-[#ececec] text-center no-underline text-[#666] text-[0.92rem] transition duration-300 hover:text-[#14c38e]"
                >
                    Already have an account? Login
                </a>

            </form>

            {/* OTP Verification Window / Popup */}
            {
                isOtpPopupOpen && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black/60 flex justify-center items-center z-[999]">
                        <div className="w-full max-w-[430px] m-0 bg-white p-10 rounded-[18px] shadow-[0_15px_40px_rgba(0,0,0,0.15)] flex flex-col font-sans max-[480px]:p-7 max-[480px]:rounded-2xl max-[480px]:mx-5">
                            <p className="text-[1.6rem] font-bold text-[#222] mb-1">
                                OTP Verification
                            </p>
                            <p className="text-[0.88rem] text-[#666] font-normal mt-0 mb-5">
                                Enter the internal OTP to proceed (Test: 12 and 34)
                            </p>
                            <input
                                type="text"
                                placeholder="Enter OTP 1"
                                value={otp1}
                                onChange={(e) => setOtp1(e.target.value)}
                                className="w-full px-4 py-3.5 rounded-[10px] border border-[#d9d9d9] bg-[#fafafa] text-[15px] tracking-[2px] mb-[15px] transition duration-300 placeholder:tracking-normal placeholder:text-[#9a9a9a] focus:outline-none focus:border-[#16c784] focus:bg-white focus:shadow-[0_0_0_4px_rgba(22,199,132,0.12)]"
                            />
                            <input
                                type="text"
                                placeholder="Enter OTP 2"
                                value={otp2}
                                onChange={(e) => setOtp2(e.target.value)}
                                className="w-full px-4 py-3.5 rounded-[10px] border border-[#d9d9d9] bg-[#fafafa] text-[15px] tracking-[2px] mb-[15px] transition duration-300 placeholder:tracking-normal placeholder:text-[#9a9a9a] focus:outline-none focus:border-[#16c784] focus:bg-white focus:shadow-[0_0_0_4px_rgba(22,199,132,0.12)]"
                            />
                            <button
                                onClick={handleOtpVerification}
                                className="mt-[15px] bg-[#0b6e46] text-white border-none rounded-[10px] p-[15px] text-base font-semibold cursor-pointer transition duration-300 hover:bg-[#0ea875] hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(20,195,142,0.28)]"
                            >
                                Verify OTP
                            </button>
                            <button
                                onClick={() => setIsOtpPopupOpen(false)}
                                className="mt-[12px] bg-[#f4f4f4] text-[#555] border border-[#e0e0e0] rounded-[10px] p-3 text-[15px] font-semibold cursor-pointer transition duration-300 hover:bg-[#e8e8e8] hover:text-[#222]"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )
            }
        </div >
    );
}

export default Signup;