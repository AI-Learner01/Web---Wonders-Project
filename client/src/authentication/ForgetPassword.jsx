import React, { useState, useEffect } from 'react';

// 📥 Tumhare Reusable Cards Import
import ErrorModal from '../ReusableCards/ErrorModal';
import SuccessModal from '../ReusableCards/SuccessModal';

// ==========================================
// ⚙️ EASY CONFIGURATION
// ==========================================
const OTP_COOLDOWN_TIME = 10;
const POPUP_COOLDOWN_TIME = 5;

const loginBg = "https://res.cloudinary.com/xzjjff1k/image/upload/f_auto,q_auto,w_1920/v1784311631/login-bg_our3np.jpg";

function ForgotPassword() {
    const inputClass = "w-full px-4 py-3.5 rounded-[10px] border border-[#d9d9d9] bg-[#fafafa] text-[15px] transition duration-300 placeholder:text-[#9a9a9a] focus:outline-none focus:border-[#16c784] focus:bg-white focus:shadow-[0_0_0_4px_rgba(22,199,132,0.12)]";

    const [email, setEmail] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [showPass, setShowPass] = useState(false);

    // 🔴 🟢 Modals State
    const [errorMsg, setErrorMsg] = useState('');
    const [isErrorOpen, setIsErrorOpen] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);

    // Timers & Progress States
    const [cooldown, setCooldown] = useState(0);
    const [popupCooldown, setPopupCooldown] = useState(0);

    const fillPercent = cooldown > 0 ? ((OTP_COOLDOWN_TIME - cooldown) / OTP_COOLDOWN_TIME) * 100 : 0;
    const popupFillPercent = popupCooldown > 0 ? ((POPUP_COOLDOWN_TIME - popupCooldown) / POPUP_COOLDOWN_TIME) * 100 : 0;

    const triggerError = (msg) => {
        setErrorMsg(msg);
        setIsErrorOpen(true);
    };

    // Timer 1: Main Page Send OTP Button
    useEffect(() => {
        if (cooldown <= 0) return;
        const timer = setInterval(() => {
            setCooldown((prev) => (prev <= 1 ? (clearInterval(timer), 0) : prev - 1));
        }, 1000);
        return () => clearInterval(timer);
    }, [cooldown]);

    // Timer 2: Popup Window Reset Password Button
    useEffect(() => {
        if (popupCooldown <= 0) return;
        const timer = setInterval(() => {
            setPopupCooldown((prev) => (prev <= 1 ? (clearInterval(timer), 0) : prev - 1));
        }, 1000);
        return () => clearInterval(timer);
    }, [popupCooldown]);

    const handleRequestOtp = async (e) => {
        e.preventDefault();
        if (cooldown > 0) return;

        if (!email.trim()) {
            triggerError("Please enter your registered email address.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            triggerError("Please enter a valid email address.");
            return;
        }

        setCooldown(OTP_COOLDOWN_TIME);

        try {
            const response = await fetch("http://localhost:5000/auth/send-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });
            const data = await response.json();

            if (data.success) {
                setOtp('');
                setNewPassword('');
                setConfirmNewPassword('');
                setIsPopupOpen(true);
            } else {
                triggerError(data.message || "Account identity credentials not found.");
                setCooldown(0);
            }
        } catch (error) {
            console.error("Error:", error);
            triggerError("Something went wrong!");
            setCooldown(0);
        }
    };

    const handleResetPasswordSubmit = async (e) => {
        e.preventDefault();
        if (popupCooldown > 0) return;

        if (!otp.trim()) {
            triggerError("Please enter the verification code.");
            return;
        }

        if (newPassword.length < 8) {
            triggerError("Password must be at least 8 characters long.");
            return;
        }

        if (newPassword !== confirmNewPassword) {
            triggerError("Passwords do not match.");
            return;
        }

        setPopupCooldown(POPUP_COOLDOWN_TIME);

        try {
            const response = await fetch("http://localhost:5000/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp, newPassword })
            });
            const data = await response.json();

            if (data.success) {
                setIsPopupOpen(false);
                setSuccessMsg("Password updated successfully! Redirecting to login.");
                setIsSuccessOpen(true);
            } else {
                triggerError(data.message || "Verification failed or token expired.");
                setPopupCooldown(0);
            }
        } catch (error) {
            console.error("Error:", error);
            triggerError("Something went wrong!");
            setPopupCooldown(0);
        }
    };

    const handleSuccessClose = () => {
        setIsSuccessOpen(false);
        window.location.href = "/login";
    };

    return (
        <div
            className="min-h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat p-6 font-sans"
            style={{ backgroundImage: `url(${loginBg})` }}
        >
            {/* Main Form */}
            <form
                onSubmit={handleRequestOtp}
                className="w-full max-w-[430px] bg-white p-10 rounded-[18px] shadow-[0_15px_40px_rgba(0,0,0,0.08)] flex flex-col max-[480px]:p-7"
            >
                <div className="flex justify-between items-center mb-7">
                    <p className="text-[1.8rem] font-bold text-[#222]">Recover Account</p>
                    <a
                        href="/login"
                        className="no-underline text-[#2f6b1f] bg-[#eef8eb] border border-[#d8ead2] rounded-full px-[18px] py-2 text-[0.9rem] font-semibold transition duration-300 hover:bg-[#14c38e] hover:text-white hover:border-[#14c38e] hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(20,195,142,0.25)]"
                    >
                        Login
                    </a>
                </div>

                <p className="text-[0.9rem] font-semibold text-[#444] mt-[18px] mb-2">Email Address</p>
                <input
                    type="email"
                    placeholder="Enter your registered email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                />

                <button
                    type="submit"
                    disabled={cooldown > 0}
                    className={`mt-6 w-full rounded-lg p-3 font-semibold transition-all duration-300 relative overflow-hidden isolate shadow-[0_4px_14px_rgba(22,199,132,0.25)] hover:shadow-[0_6px_20px_rgba(22,199,132,0.4)]
                        ${cooldown > 0
                            ? "bg-gray-300 text-gray-600 cursor-not-allowed shadow-none"
                            : "bg-[#16c784] text-white hover:bg-[#12b375] hover:-translate-y-0.5 active:translate-y-0"
                        }`}
                >
                    {cooldown > 0 && (
                        <span
                            className="absolute left-0 top-0 h-full bg-[#16c784]/30 transition-all duration-1000 ease-linear -z-10"
                            style={{ width: `${fillPercent}%` }}
                        />
                    )}
                    {cooldown > 0 ? `Resend OTP in ${cooldown}s` : "Send Verification OTP"}
                </button>
            </form>

            {/* OTP & Password Reset Modal */}
            {isPopupOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4 z-[999]">
                    <form
                        onSubmit={handleResetPasswordSubmit}
                        className="w-full max-w-[430px] bg-white p-10 rounded-[18px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col max-[480px]:p-7"
                    >
                        <p className="text-[1.6rem] font-bold text-[#222] mb-1">Verify Security Identity</p>
                        <p className="text-[0.85rem] text-[#666] mb-5">
                            Provide the secure verification code sent to your email and set your new password.
                        </p>

                        <p className="text-[0.9rem] font-semibold text-[#444] mb-2">Enter OTP Code</p>
                        <input
                            type="text"
                            placeholder="6-Digit Code"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className={inputClass}
                        />

                        <div className="flex items-center justify-end mt-4 mb-2">
                            <p className="mr-[10px] text-[#666] text-[0.85rem]">View Passwords</p>
                            <input
                                type="checkbox"
                                checked={showPass}
                                onChange={() => setShowPass(!showPass)}
                                className="w-[17px] h-[17px] accent-[#16c784] cursor-pointer"
                            />
                        </div>

                        <p className="text-[0.9rem] font-semibold text-[#444] mb-2">New Security Password</p>
                        <input
                            type={showPass ? "text" : "password"}
                            placeholder="At least 8 characters"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className={inputClass}
                        />

                        <p className="text-[0.9rem] font-semibold text-[#444] mt-4 mb-2">Confirm New Password</p>
                        <input
                            type={showPass ? "text" : "password"}
                            placeholder="Re-type your password completely"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            className={inputClass}
                        />

                        <button
                            type="submit"
                            disabled={popupCooldown > 0}
                            className={`mt-6 w-full rounded-lg p-3 font-semibold transition-all duration-300 relative overflow-hidden isolate shadow-[0_4px_14px_rgba(22,199,132,0.25)] hover:shadow-[0_6px_20px_rgba(22,199,132,0.4)]
                                ${popupCooldown > 0
                                    ? "bg-gray-300 text-gray-600 cursor-not-allowed shadow-none"
                                    : "bg-[#16c784] text-white hover:bg-[#12b375] hover:-translate-y-0.5 active:translate-y-0"
                                }`}
                        >
                            {popupCooldown > 0 && (
                                <span
                                    className="absolute left-0 top-0 h-full bg-[#16c784]/30 transition-all duration-1000 ease-linear -z-10"
                                    style={{ width: `${popupFillPercent}%` }}
                                />
                            )}
                            {popupCooldown > 0 ? `Processing... (${popupCooldown}s)` : "Reset Password"}
                        </button>

                        <button
                            type="button"
                            onClick={() => setIsPopupOpen(false)}
                            className="mt-3 w-full rounded-lg p-3 font-semibold bg-[#fafafa] text-[#666] border border-[#d9d9d9] hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            )}

            {/* 🔴 ERROR MODAL */}
            <ErrorModal
                isOpen={isErrorOpen}
                message={errorMsg}
                onClose={() => setIsErrorOpen(false)}
            />

            {/* 🟢 SUCCESS MODAL */}
            <SuccessModal
                isOpen={isSuccessOpen}
                message={successMsg}
                onClose={handleSuccessClose}
            />
        </div>
    );
}

export default ForgotPassword;