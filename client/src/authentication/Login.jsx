import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import ErrorModal from '../ReusableCards/ErrorModal.jsx';

const loginBg = "https://res.cloudinary.com/xzjjff1k/image/upload/f_auto,q_auto,w_1920/v1784311631/login-bg_our3np.jpg";

function Login() {
    const inputClass =
        "w-full px-4 py-3.5 rounded-[10px] border border-[#d9d9d9] bg-[#fafafa] text-[15px] transition duration-300 placeholder:text-[#9a9a9a] focus:outline-none focus:border-[#16c784] focus:bg-white focus:shadow-[0_0_0_4px_rgba(22,199,132,0.12)]";

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loadingPercent, setLoadingPercent] = useState(0); 
    const [btnMessage, setBtnMessage] = useState('');
    const [btnStatus, setBtnStatus] = useState('idle');

    const [errorMsg, setErrorMsg] = useState('');
    const [isErrorOpen, setIsErrorOpen] = useState(false);

    const triggerError = (msg) => {
        setErrorMsg(msg);
        setIsErrorOpen(true);
    };

    const totalFields = 2;
    const filledFields = [email, password].filter((val) => val.trim() !== "").length;
    const inputFillPercent = (filledFields / totalFields) * 100;

    const resetBtnState = () => {
        setBtnStatus('idle');
        setBtnMessage('');
        setIsSubmitting(false);
        setLoadingPercent(0);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        if (!email.trim() || !password) {
            triggerError("Please fill in all fields!");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            triggerError("Please enter a valid email address!");
            return;
        }

        if (password.length < 8) {
            triggerError("Password must be at least 8 characters long!");
            return;
        }

        setIsSubmitting(true);
        setBtnStatus('loading');
        setBtnMessage("Logging in...");
        setLoadingPercent(90);

        try {
            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email: email.trim(), password })
            });

            const data = await response.json();
            await new Promise((resolve) => setTimeout(resolve, 400));

            if (data.success) {
                setLoadingPercent(100);
                setBtnStatus('success');
                setBtnMessage("Login Successful! Redirecting...");
                setTimeout(() => { window.location.href = "/"; }, 1000);
            } else {
                resetBtnState();
                triggerError(data.message || "Invalid credentials!");
            }
        } catch (error) {
            console.error("Error logging in:", error);
            resetBtnState();
            triggerError("Server Connection Error! Please try again.");
        }
    };

    // Google Login Response Handler
    const handleGoogleSuccess = async (credentialResponse) => {
        setIsSubmitting(true);
        try {
            const response = await fetch("http://localhost:5000/auth/google", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ token: credentialResponse.credential })
            });

            const data = await response.json();

            if (data.success) {
                window.location.href = "/";
            } else {
                setIsSubmitting(false);
                triggerError(data.message || "Google authentication failed!");
            }
        } catch (error) {
            console.error("Google Auth Error:", error);
            setIsSubmitting(false);
            triggerError("Server Connection Error during Google Login!");
        }
    };

    return (
        <div
            className="min-h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat p-6 font-sans"
            style={{ backgroundImage: `url(${loginBg})` }}
        >
            <form
                onSubmit={handleLogin}
                className="w-full max-w-[430px] bg-white p-10 rounded-[18px] shadow-[0_15px_40px_rgba(0,0,0,0.08)] flex flex-col max-[480px]:p-7 max-[480px]:rounded-2xl"
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-7">
                    <p className="text-[2rem] font-bold text-[#222]">Login</p>
                    <a
                        href="/contact"
                        className="no-underline text-[#2f6b1f] bg-[#eef8eb] border border-[#d8ead2] rounded-full px-[18px] py-2 text-[0.9rem] font-semibold transition duration-300 hover:bg-[#14c38e] hover:text-white hover:border-[#14c38e] hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(20,195,142,0.25)]"
                    >
                        Contact Us
                    </a>
                </div>

                {/* Email Input */}
                <p className="text-[0.9rem] font-semibold text-[#444] mt-[18px] mb-2">Email Address</p>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    disabled={isSubmitting}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                />

                {/* Password Label */}
                <div className="flex items-center mt-[18px] mb-2">
                    <p className="text-[0.9rem] font-semibold text-[#444]">Password</p>
                    <p className="ml-auto mr-[10px] text-[#666] text-[0.85rem]">View Password</p>
                    <input
                        type="checkbox"
                        checked={showPass}
                        disabled={isSubmitting}
                        onChange={() => setShowPass(!showPass)}
                        className="w-[17px] h-[17px] accent-[#16c784] cursor-pointer"
                    />
                </div>

                <input
                    type={showPass ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    disabled={isSubmitting}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputClass}
                />

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`relative isolate overflow-hidden mt-[30px] border-none rounded-[10px] p-[15px] text-base font-semibold text-white transition-all duration-300
                        ${btnStatus === 'error' ? 'bg-[#d9534f]' : 'bg-[#0b6e46]'}
                        ${isSubmitting ? "cursor-not-allowed" : "cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(20,195,142,0.28)]"}
                    `}
                >
                    <span
                        className="absolute top-0 left-0 h-full bg-[#1fd694] transition-[width] duration-300 ease-out -z-20"
                        style={{ width: `${inputFillPercent}%` }}
                    />
                    <span
                        className={`absolute top-0 left-0 h-full transition-[width] duration-500 ease-in-out -z-10
                            ${btnStatus === 'error' ? 'bg-[#ff4d4d]' : ''}
                            ${btnStatus === 'loading' ? 'bg-[#12a16d]' : ''}
                            ${btnStatus === 'success' ? 'bg-[#00e676]' : ''}
                        `}
                        style={{ width: `${loadingPercent}%` }}
                    />
                    <span className="relative z-10 drop-shadow-sm flex items-center justify-center gap-2">
                        {btnStatus === 'idle' && "Login"}
                        {btnStatus !== 'idle' && btnMessage}
                    </span>
                </button>

                {/* OR Divider */}
                <div className="flex items-center my-5">
                    <div className="flex-1 border-t border-[#ececec]"></div>
                    <span className="px-3 text-sm text-[#888]">OR</span>
                    <div className="flex-1 border-t border-[#ececec]"></div>
                </div>

                {/* Google Login Wrapper */}
                <div className="flex justify-center w-full min-h-[44px]">
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => triggerError("Google Login Failed!")}
                        useOneTap
                        theme="outline"
                        shape="rectangular"
                        size="large"
                    />
                </div>

                {/* Forgot Password */}
                <a
                    href="/forgotpassword"
                    className="mt-[18px] text-right text-[#14c38e] text-[0.9rem] font-medium hover:text-[#0ea875] hover:underline"
                >
                    Forgot Password?
                </a>

                {/* Signup Link */}
                <a
                    href="/signup"
                    className="mt-7 pt-[18px] border-t border-[#ececec] text-center text-[#666] text-[0.92rem] no-underline transition duration-300 hover:text-[#14c38e]"
                >
                    Don't have an account? Sign Up
                </a>
            </form>

            <ErrorModal
                isOpen={isErrorOpen}
                message={errorMsg}
                onClose={() => setIsErrorOpen(false)}
            />
        </div>
    );
}

export default Login;