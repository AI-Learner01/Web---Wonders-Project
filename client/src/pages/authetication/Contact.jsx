import React from 'react'
import './Contact.css'

function Contact() {
    function Popup() {
        return (
            <div id="popup">
                <p id="popupMessage">We will contact you soon!</p>
                <button id="popupCloseButton" onClick={hidePopup}>Close</button>
            </div>
        );
    }

    function hidePopup() {
        const popup = document.getElementById('popup');
        popup.style.display = 'none';
    }

    function showPopup() {
        const popup = document.getElementById('popup');
        popup.style.display = 'block';
    }

    function clearForm() {
        document.getElementById('contactDropdown').value = '';
        document.getElementById('contactEmail').value = '';
        document.getElementById('contactMessage').value = '';
    }


    return (
        <div id="contactContainer">
            <div id="titleContainer">
                <p id="contactTitle">Contact Us</p>
                <a id="aboutLink" href="/about">About Us ?</a>
            </div>
            <select id="contactDropdown">
                <option value="" disabled selected>Select a topic</option>
                <option value="general">General Inquiry</option>
                <option value="help">Need Help</option>
                <option value="suggestions">Give Suggestions</option>
            </select>
            <p id="contactEmailLabel">Email or Phone</p>
            <input id="contactEmail" type="text" placeholder='Enter your email or phone' />
            <textarea id="contactMessage" placeholder='Write your message here'></textarea>
            <button id="sendButton" onClick={() => {
                if(document.getElementById('contactDropdown').value !== '' &&
                   document.getElementById('contactEmail').value !== '' &&
                   document.getElementById('contactMessage').value !== '') {
                    showPopup();
                    clearForm();
                }
                else
                {
                    alert('Please fill in all fields before sending the message.');
                }
            }}>Send</button>
            <Popup />
        </div>
    );

}



export default Contact;