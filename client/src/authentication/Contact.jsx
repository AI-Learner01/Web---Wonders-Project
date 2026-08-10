import React, { useState } from 'react';

/**
 * 
 * this component provides a contact form for users to send messages or queries to the support team. It includes fields for topic selection, email or phone input, and a message textarea. Upon submission, it sends the data to the backend and displays a success popup with a receipt number or an error modal if any issues occur.
 * @returns JSX Element representing the contact form and its functionalities
 */

// 📥 Reusable Error Modal Import
import ErrorModal from '../ReusableCards/ErrorModal';

const loginBg = "https://res.cloudinary.com/xzjjff1k/image/upload/f_auto,q_auto,w_1920/v1784311631/login-bg_our3np.jpg";
const helperIcon = "https://res.cloudinary.com/xzjjff1k/image/upload/v1784309997/helper-icon_znhxx3.jpg";

function Contact() {
    // 1. Controlled State Management
    const [formData, setFormData] = useState({
        topic: '',
        emailOrPhone: '',
        message: ''
    });

    const [loading, setLoading] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);
    const [receiptNo, setReceiptNo] = useState("");

    // 🔴 Error Modal State
    const [errorMsg, setErrorMsg] = useState('');
    const [isErrorOpen, setIsErrorOpen] = useState(false);

    // 📋 Copy Button State
    const [copied, setCopied] = useState(false);

    const inputClass =
        "w-full px-4 py-3.5 rounded-[10px] border border-[#d9d9d9] bg-[#fafafa] text-[15px] transition duration-300 focus:outline-none focus:border-[#16c784] focus:bg-white focus:shadow-[0_0_0_4px_rgba(22,199,132,0.12)]";

    const triggerError = (msg) => {
        setErrorMsg(msg);
        setIsErrorOpen(true);
    };

    // Handle Input Changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Form Reset Helper
    const clearForm = () => {
        setFormData({
            topic: '',
            emailOrPhone: '',
            message: ''
        });
    };

    // Copy Handler Function
    const handleCopyEmail = () => {
        const email = "auraavenue.travel@gmail.com";
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(email);
        } else {
            // Fallback for non-HTTPS / unsupported environments
            const textArea = document.createElement("textarea");
            textArea.value = email;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // 2. Submit Handler
    const handleSendMessage = async (e) => {
        e.preventDefault();
        const { topic, emailOrPhone, message } = formData;

        // Basic Client Validations
        if (!topic || !emailOrPhone || !message) {
            triggerError('Please fill in all fields before sending the message.');
            return;
        }

        const isEmail = emailOrPhone.includes('@');
        if (isEmail) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailOrPhone)) {
                triggerError('Please enter a valid email address.');
                return;
            }
        } else {
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(emailOrPhone)) {
                triggerError('Please enter a valid 10-digit phone number.');
                return;
            }
        }

        // 3. API Call to Backend
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/contact-us`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ 
                    topic, 
                    emailOrPhone, 
                    message,
                    status: "pending" 
                })
            });

            const data = await response.json();

            if (data.success) {
                setReceiptNo(data.receiptNo || "N/A");
                setPopupOpen(true);
                clearForm();
            } else {
                // 📩 Server jo message bheje, wahi directly Card me dikhayenge
                triggerError(data.message || 'Failed to submit query.');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            triggerError('Failed to send message. Please check server connection.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            id="contactContainer"
            className="min-h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat font-sans p-5"
            style={{ backgroundImage: `url(${loginBg})` }}
        >
            <form
                id="contactForm"
                onSubmit={handleSendMessage}
                className="w-full max-w-[430px] bg-white p-10 rounded-[18px] shadow-[0_15px_40px_rgba(0,0,0,0.08)] flex flex-col max-[480px]:p-7 max-[480px]:rounded-2xl"
            >
                {/* Header Row */}
                <div className="flex justify-between items-center mb-7">
                    <p className="text-[2rem] font-bold text-[#222] max-[480px]:text-[1.7rem]">
                        Contact Us
                    </p>

                    <a
                        href="/about"
                        className="no-underline text-[#2f6b1f] bg-[#eef8eb] border border-[#d8ead2] rounded-full px-[18px] py-2 text-[0.9rem] font-semibold transition duration-300 hover:bg-[#14c38e] hover:text-white hover:border-[#14c38e] hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(20,195,142,0.25)] max-[480px]:px-[15px] max-[480px]:py-[7px] max-[480px]:text-[0.82rem]"
                    >
                        About Us ?
                    </a>
                </div>

                {/* Direct Email Card */}
                <div className="flex items-center gap-[15px] bg-[#f8f8f8] p-[15px] rounded-xl mb-[10px] max-[480px]:flex-col max-[480px]:text-center max-[480px]:gap-3 max-[480px]:p-[18px]">
                    <img
                        src={helperIcon}
                        alt="Helper"
                        className="w-[60px] h-[60px] rounded-full object-cover border-2 border-[#14c38e] max-[480px]:w-20 max-[480px]:h-20"
                    />

                    <div className="flex flex-col max-[480px]:w-full max-[480px]:items-center">
                        <p className="text-[15px] font-semibold text-[#333] mb-1">
                            Contact Email :
                        </p>

                        <div className="flex items-center gap-[10px] flex-wrap max-[480px]:flex-col max-[480px]:w-full">
                            <a
                                href="mailto:auraavenue.travel@gmail.com"
                                className="text-[#007bff] no-underline font-medium break-words hover:underline max-[480px]:text-sm max-[480px]:text-center"
                            >
                                auraavenue.travel@gmail.com
                            </a>

                            <button
                                type="button"
                                onClick={handleCopyEmail}
                                className={`border rounded-lg px-[14px] py-[7px] cursor-pointer text-sm font-semibold transition duration-[250ms] max-[480px]:w-full max-[480px]:max-w-[180px] ${
                                    copied
                                        ? "bg-[#eef8eb] text-[#14c38e] border-[#14c38e]"
                                        : "bg-[#f3f4f6] text-[#333] border-[#d1d5db] hover:bg-[#e5e7eb] hover:border-[#14c38e] hover:text-[#14c38e]"
                                }`}
                            >
                                {copied ? "Copied! ✓" : "Copy"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Separator */}
                <div className="flex items-center text-center my-[15px]">
                    <div className="flex-1 border-b border-[#ccc]" />
                    <span className="px-[10px] text-[#888] text-sm">OR</span>
                    <div className="flex-1 border-b border-[#ccc]" />
                </div>

                {/* Input 1: Topic Dropdown */}
                <select
                    name="topic"
                    value={formData.topic}
                    onChange={handleChange}
                    className={`${inputClass} cursor-pointer text-[#444]`}
                >
                    <option value="" disabled>Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="help">Need Help</option>
                    <option value="suggestions">Give Suggestions</option>
                </select>

                <p className="text-[0.9rem] font-semibold text-[#444] mt-[18px] mb-2 max-[480px]:text-[0.82rem]">
                    Email or Phone
                </p>

                {/* Input 2: Email or Phone */}
                <input
                    name="emailOrPhone"
                    type="text"
                    placeholder="Enter your email or phone"
                    value={formData.emailOrPhone}
                    onChange={handleChange}
                    className={inputClass}
                />

                {/* Input 3: Message Textarea */}
                <textarea
                    name="message"
                    placeholder="Write your message here"
                    value={formData.message}
                    onChange={handleChange}
                    className={`${inputClass} h-[120px] resize-none mt-[5px]`}
                ></textarea>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="mt-7 bg-[#14c38e] text-white border-none rounded-[10px] p-[15px] text-base font-semibold cursor-pointer transition duration-300 hover:bg-[#0ea875] hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(20,195,142,0.28)] disabled:opacity-50"
                >
                    {loading ? "Sending..." : "Send Message"}
                </button>
            </form>

            {/* Success Popup with Receipt Info */}
            {popupOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="w-full max-w-[380px] bg-white px-7 py-8 rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] text-center">
                        <div className="w-12 h-12 bg-[#eef8eb] text-[#14c38e] rounded-full flex items-center justify-center mx-auto mb-3 text-2xl font-bold">
                            ✓
                        </div>

                        <h3 className="text-xl font-bold text-[#222] mb-1">
                            Query Pushed!
                        </h3>

                        <div className="bg-[#f8fafc] border border-dashed border-[#cbd5e1] p-3 rounded-lg my-4">
                            <p className="text-xs text-gray-500 font-semibold mb-1">RECEIPT / REF NO.</p>
                            <p className="text-sm font-mono font-bold text-[#14c38e] break-all select-all">
                                {receiptNo}
                            </p>
                        </div>

                        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                            A confirmation receipt email has been sent. Our team will contact you soon!
                        </p>

                        <button
                            onClick={() => setPopupOpen(false)}
                            className="bg-[#222] text-white rounded-[10px] w-full py-3 text-[15px] font-semibold transition duration-300 hover:bg-[#14c38e] hover:-translate-y-0.5"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* 🔴 ERROR MODAL CARD */}
            <ErrorModal
                isOpen={isErrorOpen}
                message={errorMsg}
                onClose={() => setIsErrorOpen(false)}
            />
        </div>
    );
}

export default Contact;