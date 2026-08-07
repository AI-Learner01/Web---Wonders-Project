import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';

// Reusable Cards
import SuccessModal from '../ReusableCards/SuccessModal';
import ErrorModal from '../ReusableCards/ErrorModal';

// Same folder import
import SetPassword from './SetPassword';

const loginBg = "https://res.cloudinary.com/xzjjff1k/image/upload/f_auto,q_auto,w_1920/v1784311631/login-bg_our3np.jpg";

function SignUp() {
    const inputClass =
        "w-full px-4 py-3.5 rounded-[10px] border border-[#d9d9d9] bg-[#fafafa] text-[15px] transition duration-300 placeholder:text-[#9a9a9a] focus:outline-none focus:border-[#16c784] focus:bg-white focus:shadow-[0_0_0_4px_rgba(22,199,132,0.12)]";

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [otp1, setOtp1] = useState('');
    const [isOtpPopupOpen, setIsOtpPopupOpen] = useState(false);
    const [otpStatus, setOtpStatus] = useState('idle');

    const [googleUserData, setGoogleUserData] = useState(null);
    const [isSetPasswordOpen, setIsSetPasswordOpen] = useState(false);

    const totalFields = 5;
    const filledFields = [fullName, email, phone, password, confirmPassword].filter((val) => val.trim() !== "").length;
    const fillPercent = (filledFields / totalFields) * 100;
    const [cooldown, setCooldown] = useState(0);

    const [otpProgress, setOtpProgress] = useState(0);

    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    
    // Actions on modal close
    const [onSuccessCloseAction, setOnSuccessCloseAction] = useState(() => () => {});
    const [onErrorCloseAction, setOnErrorCloseAction] = useState(() => () => {});

    const showSuccess = (msg, callback) => {
        setModalMessage(msg);
        setOnSuccessCloseAction(() => callback || (() => {}));
        setIsSuccessModalOpen(true);
    };

    const showError = (msg, callback) => {
        setModalMessage(msg);
        setOnErrorCloseAction(() => callback || (() => {}));
        setIsErrorModalOpen(true);
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const response = await fetch("http://localhost:5000/auth/verify-google-token", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: credentialResponse.credential })
            });

            const data = await response.json();

            if (data.success) {
                if (data.isExistingUser) {
                    // Existing User error flow & Redirect to /login
                    showError("You already have an account, please try to login.", () => {
                        window.location.href = "/login";
                    });
                } else {
                    setGoogleUserData({
                        fullName: data.name,
                        email: data.email,
                        googleId: data.googleId
                    });
                    setIsSetPasswordOpen(true);
                }
            } else {
                showError(data.message || "Google Authentication failed");
            }
        } catch (error) {
            console.error("Google Auth Error:", error);
            showError("Google Sign-In failed. Please try again.");
        }
    };

    const handleFinalGoogleSignup = async (fullUserData) => {
        try {
            const response = await fetch("http://localhost:5000/auth/googleSignup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(fullUserData)
            });

            const data = await response.json();

            if (data.success) {
                setIsSetPasswordOpen(false);
                showSuccess("Account created successfully!", () => {
                    window.location.href = "/";
                });
            } else {
                showError(data.message || "Failed to create account.");
            }
        } catch (error) {
            console.error("Google Signup Error:", error);
            showError("Server error during account creation.");
        }
    };

    const handleSignup = async () => {
        const userData = { fullName, email, phone, password };
        try {
            const response = await fetch("http://localhost:5000/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (data.success) {
                setOtpProgress(100);

                setTimeout(() => {
                    setIsOtpPopupOpen(false);
                    setOtpProgress(0);
                    showSuccess(data.message || "Account created successfully!", () => {
                        window.location.href = "/";
                    });
                }, 400);
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

    const openOtpWindow = async (e) => {
        if (e) e.preventDefault();

        if (cooldown > 0) return;

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

        setCooldown(10);
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

            const response = await fetch("http://localhost:5000/auth/send-otp", {
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

    const handleOtpVerification = async (e) => {
        if (e) e.preventDefault();

        if (!otp1) {
            showError("Please enter the OTP");
            return;
        }

        setOtpStatus('verifying');
        setOtpProgress(30);

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
                setOtpProgress(90);
                setOtpStatus('verified');
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
                    Full Name
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
                    type="email"
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

                <button
                    type="submit"
                    disabled={cooldown > 0}
                    className={`relative isolate overflow-hidden mt-[30px] border-none rounded-[10px] p-[15px] text-base font-semibold transition duration-300 ${
                        cooldown > 0
                            ? "bg-gray-400 cursor-not-allowed text-white"
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

                <div className="flex flex-col items-center mt-4">
                    <div className="w-full flex items-center my-3">
                        <div className="flex-1 border-t border-[#e0e0e0]"></div>
                        <span className="px-3 text-[0.85rem] text-[#888]">OR</span>
                        <div className="flex-1 border-t border-[#e0e0e0]"></div>
                    </div>
                    
                    <div className="w-full flex justify-center">
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={() => showError("Google authentication failed")}
                            shape="rectangular"
                            width="100%"
                        />
                    </div>
                </div>

                <a
                    href="/login"
                    className="mt-5 pt-[15px] border-t border-[#ececec] text-center no-underline text-[#666] text-[0.92rem] transition duration-300 hover:text-[#14c38e]"
                >
                    Already have an account? Login
                </a>
            </form>

            {/* OTP Modal */}
            {isOtpPopupOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black/60 flex justify-center items-center z-[999]">
                    <div className="w-full max-w-[430px] m-0 bg-white p-10 rounded-[18px] shadow-[0_15px_40px_rgba(0,0,0,0.15)] flex flex-col font-sans max-[480px]:p-7 max-[480px]:rounded-2xl max-[480px]:mx-5">
                        <p className="text-[1.6rem] font-bold text-[#222] mb-1">
                            OTP Verification
                        </p>

                        <p className="text-[0.88rem] text-[#666] font-normal mt-0 mb-5 leading-normal">
                            OTP sent to this email: <span className="font-semibold text-[#222]">{email}</span>
                        </p>

                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp1}
                            disabled={otpStatus === 'verified' || otpStatus === 'verifying'}
                            onChange={(e) => setOtp1(e.target.value)}
                            className="w-full px-4 py-3.5 rounded-[10px] border border-[#d9d9d9] bg-[#fafafa] text-[15px] tracking-[2px] mb-[15px] transition duration-300 placeholder:tracking-normal placeholder:text-[#9a9a9a] focus:outline-none focus:border-[#16c784] focus:bg-white focus:shadow-[0_0_0_4px_rgba(22,199,132,0.12)] disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />

                        <button
                            type="button"
                            onClick={handleOtpVerification}
                            disabled={otpStatus === 'verifying' || otpStatus === 'verified'}
                            className="relative isolate overflow-hidden mt-[5px] bg-[#0b6e46] text-white border-none rounded-[10px] p-[15px] text-base font-semibold transition duration-300 cursor-pointer disabled:cursor-wait"
                        >
                            <span
                                className="absolute top-0 left-0 h-full bg-[#16c784] transition-[width] duration-500 ease-out -z-10"
                                style={{ width: `${otpProgress}%` }}
                            />

                            <span className="relative z-10 drop-shadow-sm">
                                {otpStatus === 'verifying' && `Verifying... ${otpProgress}%`}
                                {otpStatus === 'verified' && `Wait (otp verified) ${otpProgress}%`}
                                {otpStatus === 'idle' && "Verify OTP"}
                            </span>
                        </button>

                        <button
                            type="button"
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

            {/* Set Password Modal for Google Multi-step Signup */}
            {isSetPasswordOpen && googleUserData && (
                <SetPassword
                    googleUserData={googleUserData}
                    onPasswordSubmit={handleFinalGoogleSignup}
                    onCancel={() => setIsSetPasswordOpen(false)}
                />
            )}

            {/* Success Card Modal */}
            <SuccessModal
                isOpen={isSuccessModalOpen}
                message={modalMessage}
                onClose={() => {
                    setIsSuccessModalOpen(false);
                    onSuccessCloseAction();
                }}
            />

            {/* Error Card Modal */}
            <ErrorModal
                isOpen={isErrorModalOpen}
                message={modalMessage}
                onClose={() => {
                    setIsErrorModalOpen(false);
                    onErrorCloseAction();
                }}
            />
        </div>
    );
}

export default SignUp;