import React, { useState } from 'react'
// import helperIcon from "../assets/helper-icon.jpg";
// import loginBg from "../assets/login-bg.jpg";
const loginBg = "https://res.cloudinary.com/xzjjff1k/image/upload/f_auto,q_auto,w_1920/v1784311631/login-bg_our3np.jpg";
const helperIcon = "https://res.cloudinary.com/xzjjff1k/image/upload/v1784309997/helper-icon_znhxx3.jpg";

/**
 * Developer Guide:
 * 
 *     has Two type of contact options, one is direct email and other is form to send message
 * 
 * flow => fill details ->check data -> than send msg to the server and show a popup that we will contact you soon
 * 
 * @returns Contect Us Page
 */


/* do not delete this

    later improvement :convert and make functions

*/



function Contact() {
    
    //used for OTP popUp
    const [popupOpen, setPopupOpen] = useState(false);//used to open the popup when the message is sent successfully

    //clear the form after sending the message
    function clearForm() {
        document.getElementById('contactDropdown').value = '';
        document.getElementById('contactEmail').value = '';
        document.getElementById('contactMessage').value = '';
    }

    const inputClass =
        "w-full px-4 py-3.5 rounded-[10px] border border-[#d9d9d9] bg-[#fafafa] text-[15px] transition duration-300 focus:outline-none focus:border-[#16c784] focus:bg-white focus:shadow-[0_0_0_4px_rgba(22,199,132,0.12)]";

    return (
        <div
            id="contactContainer"
            className="min-h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat font-sans p-5"
            style={{ backgroundImage: `url(${loginBg})` }}
        >
            <form
                id="contactForm"
                onSubmit={(e) => e.preventDefault()}
                className="w-full max-w-[430px] bg-white p-10 rounded-[18px] shadow-[0_15px_40px_rgba(0,0,0,0.08)] flex flex-col max-[480px]:p-7 max-[480px]:rounded-2xl"
            >
                {/* Top Row */}
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

                {/* OPTION 1: Direct email */}
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
                                href="mailto:travelmate.supports@gmail.com"
                                className="text-[#007bff] no-underline font-medium break-words hover:underline max-[480px]:text-sm max-[480px]:text-center"
                            >
                                travelmate.supports@gmail.com
                            </a>

                            <button
                                type="button"
                                onClick={() => {
                                    navigator.clipboard.writeText("travelmate.supports@gmail.com");
                                    alert("Email copied!");
                                }}
                                className="bg-[#f3f4f6] text-[#333] border border-[#d1d5db] rounded-lg px-[14px] py-[7px] cursor-pointer text-sm font-semibold transition duration-[250ms] hover:bg-[#e5e7eb] hover:border-[#14c38e] hover:text-[#14c38e] max-[480px]:w-full max-[480px]:max-w-[180px]"
                            >
                                Copy
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

                {/* OPTION 2: Send message via form */}
                <select
                    id="contactDropdown"
                    defaultValue=""
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
                <input
                    id="contactEmail"
                    type="text"
                    placeholder="Enter your email or phone"
                    className={inputClass}
                />

                <textarea
                    id="contactMessage"
                    placeholder="Write your message here"
                    className={`${inputClass} h-[120px] resize-none mt-[5px]`}
                ></textarea>

                <button
                    className="mt-7 bg-[#14c38e] text-white border-none rounded-[10px] p-[15px] text-base font-semibold cursor-pointer transition duration-300 hover:bg-[#0ea875] hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(20,195,142,0.28)]"
                    onClick={() => {
                        if (
                            document.getElementById('contactDropdown').value !== '' &&
                            document.getElementById('contactEmail').value !== '' &&
                            document.getElementById('contactMessage').value !== ''
                        ) {
                            setPopupOpen(true);
                            clearForm();
                        } else {
                            alert('Please fill in all fields before sending the message.');
                        }
                    }}
                >
                    Send
                </button>
            </form>

            {popupOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="w-[90%] max-w-[360px] bg-white px-10 py-9 rounded-[18px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] text-center">

                        <p className="text-[1.15rem] font-semibold text-[#14c38e] mb-[22px]">
                            We will contact you soon!
                        </p>

                        <button
                            onClick={() => setPopupOpen(false)}
                            className="bg-[#222] text-white rounded-[10px] px-[30px] py-3 text-[15px] font-semibold transition duration-300 hover:bg-[#0ea875] hover:-translate-y-0.5"
                        >
                            Close
                        </button>

                    </div>
                </div>
            )}
        </div>
    );
}

export default Contact;