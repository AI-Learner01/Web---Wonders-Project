import React from 'react';

/**
 * Reusable Error Notification Modal
 * 
 * @param {boolean} isOpen - Control visibility of the modal
 * @param {string} message - Custom error message to display
 * @param {function} onClose - Action triggered on button click
 */
const ErrorModal = ({ isOpen, message, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black/60 flex justify-center items-center z-[1000] p-4">
            <div className="w-full max-w-[380px] bg-white p-7 rounded-[18px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col items-center text-center animate-in fade-in zoom-in duration-200">
                {/* Error Icon */}
                <div className="w-16 h-16 bg-[#fde8e8] border border-[#f8b4b4] text-[#e53e3e] rounded-full flex justify-center items-center mb-4 shadow-[0_4px_12px_rgba(229,62,62,0.15)]">
                    <svg 
                        className="w-8 h-8" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2.5" 
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </div>

                <h3 className="text-xl font-bold text-[#222] mb-2">Failed!</h3>
                <p className="text-[0.92rem] text-[#555] mb-6 leading-relaxed">
                    {message || "Something went wrong. Please try again."}
                </p>

                <button
                    onClick={onClose}
                    className="w-full bg-[#e53e3e] text-white border-none rounded-[10px] py-3 px-6 text-[15px] font-semibold cursor-pointer transition duration-300 hover:bg-[#c53030] hover:shadow-[0_8px_18px_rgba(229,62,62,0.25)]"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
};

export default ErrorModal;