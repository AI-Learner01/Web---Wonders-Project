import React, { useState } from 'react';

function SetPassword({ googleUserData, onPasswordSubmit, onCancel }) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const inputClass =
        "w-full px-4 py-3.5 rounded-[10px] border border-[#d9d9d9] bg-[#fafafa] text-[15px] transition duration-300 placeholder:text-[#9a9a9a] focus:outline-none focus:border-[#16c784] focus:bg-white focus:shadow-[0_0_0_4px_rgba(22,199,132,0.12)]";

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!password || !confirmPassword) {
            setError("Please fill in both password fields.");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        onPasswordSubmit({
            fullName: googleUserData.fullName,
            email: googleUserData.email,
            googleId: googleUserData.googleId,
            password: password
        });
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black/60 flex justify-center items-center z-[999] p-4">
            <form 
                onSubmit={handleSubmit}
                className="w-full max-w-[430px] bg-white p-8 rounded-[18px] shadow-[0_15px_40px_rgba(0,0,0,0.15)] flex flex-col font-sans"
            >
                <h2 className="text-[1.6rem] font-bold text-[#222] mb-1">
                    Set Your Password
                </h2>
                <p className="text-[0.88rem] text-[#666] mb-5">
                    Create a password for <span className="font-semibold text-[#222]">{googleUserData.email}</span>
                </p>

                {error && (
                    <div className="bg-red-50 text-red-600 border border-red-200 p-3 rounded-[8px] text-[0.85rem] mb-4">
                        {error}
                    </div>
                )}

                <div className="flex items-center mb-2">
                    <p className="text-[0.9rem] font-semibold text-[#444] m-0">
                        Create Password
                    </p>
                    <p className="ml-auto mr-[10px] text-[#666] text-[0.85rem]">
                        View Password
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
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputClass}
                />

                <p className="text-[0.9rem] font-semibold text-[#444] mt-4 mb-2">
                    Confirm Password
                </p>
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={inputClass}
                />

                <button
                    type="submit"
                    className="mt-6 bg-[#0b6e46] text-white border-none rounded-[10px] p-[14px] text-base font-semibold cursor-pointer transition duration-300 hover:bg-[#14c38e]"
                >
                    Create Account
                </button>

                <button
                    type="button"
                    onClick={onCancel}
                    className="mt-3 bg-[#f4f4f4] text-[#555] border border-[#e0e0e0] rounded-[10px] p-3 text-[15px] font-semibold cursor-pointer transition duration-300 hover:bg-[#e8e8e8]"
                >
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default SetPassword;