import React, { useState } from 'react';


/**
 * 
 * this component provides a signup form for users to create an account. It includes fields for full name, email, phone number, password, and confirm password, along with validation checks. Upon submission, it sends the data to the backend and handles OTP verification, displaying appropriate success or error modals.
 * @returns JSX Element representing the signup form and its functionalities
 */


// Reusable Cards
import SuccessModal from '../ReusableCards/SuccessModal';
import ErrorModal from '../ReusableCards/ErrorModal';

const loginBg = "https://res.cloudinary.com/xzjjff1k/image/upload/f_auto,q_auto,w_1920/v1784311631/login-bg_our3np.jpg";

function Signup() {
    const inputClass =
        "w-full px-4 py-3.5 rounded-[10px] border border-[#d9d9d9] bg-[#fafafa] text-[15px] transition duration-300 placeholder:text-[#9a9a9a] focus:outline-none focus:border-[#16c784] focus:bg-white focus:shadow-[0_0_0_4px_rgba(22,199,132,0.12)]";

    // Used to handle data
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Handle OTP
    const [otp1, setOtp1] = useState('');
    const [isOtpPopupOpen, setIsOtpPopupOpen] = useState(false);
    
    // OTP Button States: 'idle' | 'verifying' | 'verified'
    const [otpStatus, setOtpStatus] = useState('idle');

    // Button progress / cooldown state
    const totalFields = 5;
    const filledFields = [fullName, email, phone, password, confirmPassword].filter((val) => val.trim() !== "").length;
    const fillPercent = (filledFields / totalFields) * 100;
    const [cooldown, setCooldown] = useState(0);

    // Game-like OTP Loading Bar State
    const [otpProgress, setOtpProgress] = useState(0);

    // Modals Control
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [onSuccessCloseAction, setOnSuccessCloseAction] = useState(() => () => {});

    // Helper functions for modals
    const showSuccess = (msg, callback) => {
        setModalMessage(msg);
        setOnSuccessCloseAction(() => callback || (() => {}));
        setIsSuccessModalOpen(true);
    };

    const showError = (msg) => {
        setModalMessage(msg);
        setIsErrorModalOpen(true);
    };

    // Account Creation API (Wait for success state)
    const handleSignup = async () => {
        const userData = { fullName, email, phone, password };
        try {
            const response = await fetch("http://localhost:5000/auth/signup", {// Send user data to backend for account creation
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (data.success) {
                // Final 100% Fill on Success
                setOtpProgress(100);

                setTimeout(() => {
                    setIsOtpPopupOpen(false);
                    setOtpProgress(0);
                    showSuccess(data.message || "Account created successfully!", () => {
                        window.location.href = "/login";
                    });
                }, 400); // Small visual delay to show 100% complete bar
            } else {
                setIsOtpPopupOpen(false);
                setOtpProgress(0);
                setOtpStatus('idle');
                showError(data.message || "Failed to create account.");
            }
        }
        catch (error) {
            console.error("Error signing up:", error);
            setIsOtpPopupOpen(false);
            setOtpProgress(0);
            setOtpStatus('idle');
            showError("Something went wrong on the server!");
        }
    };

    // Open OTP window & send OTP to backend
    const openOtpWindow = async (e) => {
        if (cooldown > 0) return;
        e.preventDefault();

        // Validations
        if (!fullName.trim() || !email.trim() || !phone.trim() || !password || !confirmPassword) {
            showError("Please fill in all fields");
            return;
        }

        if (fullName.trim().length < 3) {
            showError("Enter a valid full name");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError("Enter a valid email address");
            return;
        }

        if (!/^\d{10}$/.test(phone)) {
            showError("Phone number must contain exactly 10 digits");
            return;
        }

        if (password.length < 8) {
            showError("Password must be at least 8 characters long");
            return;
        }

        if (password !== confirmPassword) {
            showError("Passwords do not match");
            return;
        }

        setCooldown(10);// Start 10-second cooldown
        setOtp1('');
        setOtpStatus('idle');
        setOtpProgress(0);

        try {
            const timer = setInterval(() => {
                setCooldown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            const response = await fetch("http://localhost:5000/auth/send-otp", {// Send OTP to backend
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (data.success) {
                setIsOtpPopupOpen(true);
            } else {
                showError(data.message || "Failed to send OTP.");
            }
        }
        catch (error) {
            console.error("Error sending OTP:", error);
            showError("Failed to send OTP. Please try again.");
        }
    };

    // Stepwise Game Loading Verification
    const handleOtpVerification = async () => {
        if (!otp1) {
            showError("Please enter the OTP");
            return;
        }

        setOtpStatus('verifying');
        
        // Step 1: Initial quick load (30%)
        setOtpProgress(30);

        // Step 2: Next stage load (75%) after short pause
        setTimeout(() => {
            setOtpProgress(75);
        }, 300);

        try {
            const response = await fetch("http://localhost:5000/auth/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp1 })
            });

            const data = await response.json();

            if (data.success) {
                // Step 3: Hold at 90% and wait for account creation
                setOtpProgress(90);
                setOtpStatus('verified');
                
                // Trigger backend signup creation while holding at 90%
                handleSignup();
            } else {
                setOtpStatus('idle');
                setOtpProgress(0);
                showError(data.message || "Incorrect OTP! Try again.");
            }
        }
        catch (error) {
            console.error("Error verifying OTP:", error);
            setOtpStatus('idle');
            setOtpProgress(0);
            showError("Failed to verify OTP. Please try again.");
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

                {/* Signup Button */}
                <button
                    type="submit"
                    disabled={cooldown > 0}
                    className={`relative isolate overflow-hidden mt-[30px] border-none rounded-[10px] p-[15px] text-base font-semibold transition duration-300
                        ${cooldown > 0
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-[#0b6e46] text-white cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(20,195,142,0.28)]"
                        }`}
                >
                    <span
                        className="absolute top-0 left-0 h-full bg-[#1fd694] transition-[width] duration-[400ms] ease-in-out -z-10"
                        style={{ width: `${fillPercent}%` }}
                    />

                    <span className="relative z-10">
                        {cooldown > 0 ? `Wait ${cooldown}s` : "Sign Up"}
                    </span>
                </button>

                <a
                    href="/login"
                    className="mt-7 pt-[18px] border-t border-[#ececec] text-center no-underline text-[#666] text-[0.92rem] transition duration-300 hover:text-[#14c38e]"
                >
                    Already have an account? Login
                </a>

            </form>

            {/* OTP Verification Window */}
            {isOtpPopupOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black/60 flex justify-center items-center z-[999]">
                    <div className="w-full max-w-[430px] m-0 bg-white p-10 rounded-[18px] shadow-[0_15px_40px_rgba(0,0,0,0.15)] flex flex-col font-sans max-[480px]:p-7 max-[480px]:rounded-2xl max-[480px]:mx-5">
                        <p className="text-[1.6rem] font-bold text-[#222] mb-1">
                            OTP Verification
                        </p>

                        <p className="text-[0.88rem] text-[#666] font-normal mt-0 mb-5 leading-normal">
                            OTP send to this email: <span className="font-semibold text-[#222]">{email}</span>
                        </p>

                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp1}
                            disabled={otpStatus === 'verified' || otpStatus === 'verifying'}
                            onChange={(e) => setOtp1(e.target.value)}
                            className="w-full px-4 py-3.5 rounded-[10px] border border-[#d9d9d9] bg-[#fafafa] text-[15px] tracking-[2px] mb-[15px] transition duration-300 placeholder:tracking-normal placeholder:text-[#9a9a9a] focus:outline-none focus:border-[#16c784] focus:bg-white focus:shadow-[0_0_0_4px_rgba(22,199,132,0.12)] disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />

                        {/* Game Loading Style Fill Button */}
                        <button
                            onClick={handleOtpVerification}
                            disabled={otpStatus === 'verifying' || otpStatus === 'verified'}
                            className="relative isolate overflow-hidden mt-[5px] bg-[#0b6e46] text-white border-none rounded-[10px] p-[15px] text-base font-semibold transition duration-300 cursor-pointer disabled:cursor-wait"
                        >
                            {/* Animated Game Progress Bar Fill */}
                            <span
                                className="absolute top-0 left-0 h-full bg-[#16c784] transition-[width] duration-500 ease-out -z-10"
                                style={{ width: `${otpProgress}%` }}
                            />

                            {/* Dynamic Text Labels */}
                            <span className="relative z-10 drop-shadow-sm">
                                {otpStatus === 'verifying' && `Verifying... ${otpProgress}%`}
                                {otpStatus === 'verified' && `Wait (otp verified) ${otpProgress}%`}
                                {otpStatus === 'idle' && "Verify OTP"}
                            </span>
                        </button>

                        <button
                            onClick={() => {
                                setIsOtpPopupOpen(false);
                                setOtpProgress(0);
                                setOtpStatus('idle');
                            }}
                            disabled={otpStatus === 'verifying' || otpStatus === 'verified'}
                            className="mt-[12px] bg-[#f4f4f4] text-[#555] border border-[#e0e0e0] rounded-[10px] p-3 text-[15px] font-semibold cursor-pointer transition duration-300 hover:bg-[#e8e8e8] hover:text-[#222] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Final Success Card Modal */}
            <SuccessModal
                isOpen={isSuccessModalOpen}
                message={modalMessage}
                onClose={() => {
                    setIsSuccessModalOpen(false);
                    onSuccessCloseAction();
                }}
            />

            {/* Unsuccessful / Error Card Modal */}
            <ErrorModal
                isOpen={isErrorModalOpen}
                message={modalMessage}
                onClose={() => setIsErrorModalOpen(false)}
            />
        </div>
    );
}

export default Signup;