import React from 'react';

/**
 * Reusable Success Notification Modal
 * 
 * @param {boolean} isOpen - Control visibility of the modal
 * @param {string} message - Custom message to display
 * @param {function} onClose - Action triggered on button click
 */
const SuccessModal = ({ isOpen, message, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black/60 flex justify-center items-center z-[1000] p-4">
            <div className="w-full max-w-[380px] bg-white p-7 rounded-[18px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col items-center text-center animate-in fade-in zoom-in duration-200">
                {/* Success Icon */}
                <div className="w-16 h-16 bg-[#eef8eb] border border-[#d8ead2] text-[#16c784] rounded-full flex justify-center items-center mb-4 shadow-[0_4px_12px_rgba(22,199,132,0.15)]">
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
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>

                <h3 className="text-xl font-bold text-[#222] mb-2">Success!</h3>
                <p className="text-[0.92rem] text-[#555] mb-6 leading-relaxed">
                    {message || "Action completed successfully."}
                </p>

                <button
                    onClick={onClose}
                    className="w-full bg-[#0b6e46] text-white border-none rounded-[10px] py-3 px-6 text-[15px] font-semibold cursor-pointer transition duration-300 hover:bg-[#14c38e] hover:shadow-[0_8px_18px_rgba(20,195,142,0.25)]"
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

export default SuccessModal;